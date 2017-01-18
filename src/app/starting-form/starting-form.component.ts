import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../images/images.service';
import { ImageInfo } from '../images/imageInfo';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PopoverModule } from "ng2-popover";
import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'app-starting-form',
  templateUrl: './starting-form.component.html',
  styleUrls: [
    './starting-form.component.css',
    '../app.component.css'
  ]
})
export class StartingFormComponent implements OnInit {

  image: Object;
  spinner: number;

  desc: string;
  pic_url: string;

  portBinds: Object;
  portBindsKeyArray: string[];
  exposedBinds: Object;
  defaultConf: Object;
  defaultPortKeyArray: string[];
  profileConf: Object;
  profilePortKeyArray: string[];

  // Config form
  form: FormGroup;
  Name = new FormControl();
  Cmd = new FormControl();
  Entrypoint = new FormControl();
  Binds = new FormControl();
  ExposedPorts = new FormControl();
  PortBindings = new FormControl();
  Tty = new FormControl('true');
  NetworkMode = new FormControl('bridge');
  Privileged = new FormControl('false');
  HostPort = new FormControl();
  ContainerPort = new FormControl();
  Environment = new FormControl();
  Links = new FormControl();

  constructor(private route: ActivatedRoute, private imagesService: ImagesService, private fb: FormBuilder, public toastr: ToastsManager) {
    this.portBinds = {};
    this.exposedBinds = {};
    this.form = fb.group({
      'Name': this.Name,
      'Cmd': this.Cmd,
      'Entrypoint': this.Entrypoint,
      'Binds': this.Binds,
      'ExposedPorts': this.ExposedPorts,
      'PortBindings': this.PortBindings,
      'Tty': this.Tty,
      'NetworkMode': this.NetworkMode,
      'Privileged': this.Privileged,
      'HostPort': this.HostPort,
      'ContainerPort': this.ContainerPort,
      'Environment': this.Environment,
      'Links': this.Links,
    });
  }

  ngOnInit() {
    this.spinner = 0;
    this.profilePortKeyArray = [];
    this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.imagesService.inspectImage(id)
          .subscribe(data => {
            this.image = data;
            this.getData();
            console.log(this.image);
          });
      });
  }

  addPortBinding() {
    if ((this.form['_value'].HostPort == null || this.form['_value'].HostPort == "") &&
      (this.form['_value'].ContainerPort == null || this.form['_value'].ContainerPort == ""))
      return;
    this.portBinds[this.form['_value'].ContainerPort + "/tcp"] = [{ "HostPort": this.form['_value'].HostPort }];
    this.exposedBinds[this.form['_value'].ContainerPort + "/tcp"] = {};
    this.portBindsKeyArray = Object.keys(this.portBinds);
    // console.log(JSON.stringify(this.portBinds));
    // console.log(JSON.stringify(this.exposedBinds));
  }

  removePortBinding(key: string) {
    if ((this.form['_value'].HostPort == null || this.form['_value'].HostPort == "") &&
      (this.form['_value'].ContainerPort == null || this.form['_value'].ContainerPort == ""))
      return;
    delete this.portBinds[key];
    delete this.exposedBinds[key];
    this.portBindsKeyArray = Object.keys(this.portBinds);
    // console.log(JSON.stringify(this.portBinds));
    // console.log(JSON.stringify(this.exposedBinds));
  }

  startImage(image: Object) {
    this.spinner = 1;
    this.imagesService.startImage(image['Id'])
      .subscribe(data => {
        this.spinner = 0;
        console.log(data);
      });
  }

  getData() {
    this.imagesService.getData(this.image['Id'])
      .subscribe(data => {
        console.log(data);
        this.desc = data.description;
        this.pic_url = data.pic_url;
        this.defaultConf = data.default_conf;
        // console.log(data.default_conf);
        this.profileConf = data.profile;
        // console.log(this.profileConf);
        if (this.defaultConf && this.defaultConf['HostConfig'] && this.defaultConf['HostConfig'].PortBindings)
          this.defaultPortKeyArray = Object.keys(this.defaultConf["HostConfig"]["PortBindings"]);
        if (this.profileConf && this.profileConf['HostConfig'] && this.profileConf['HostConfig'].PortBindings)
          this.profilePortKeyArray = Object.keys(this.profileConf["HostConfig"]["PortBindings"]);
        // console.log(this.profilePortKeyArray);
      });
  }

  // Start a container with config
  startWithConfig(config: Object, image: ImageInfo) {
    console.log(image);
    this.spinner = 1;
    this.imagesService.startWithConfig((config == null ? this.configFactory() : config))
      .subscribe(data => {
        this.spinner = 0;
        if (data.statusCode) {
          var message: string;
          message = data.json.message;
          if (!data.json.message) {
            message = data.json;
          }

          // Check if the error was raised by port
          var regExp1 = new RegExp('port is already allocated');
          if (regExp1.test(this.startImageMessage(message))) {
            this.toastr.error('Port is already allocated', 'ERROR', { toastLife: 5000 });
          }
          else {
            this.toastr.error(this.startImageMessage(message), 'ERROR', { toastLife: 5000 });
          }
        }
        else
          this.toastr.success('Start ' + image.RepoTags[0] + ' successfully', 'SUCCESS', { toastLife: 5000 });
      });
  }

  private startImageMessage(message) {
    try {
      let str;
      str = message.match(/(\(.*?\))/)[1];
      return message.replace(str, '');
    } catch (e) {
      return message;
    }
  }

  saveConfig() {
    this.imagesService.saveConfig(this.configFactory(), this.image['Id'])
      .subscribe(data => {
        console.log(data);
      })
  }

  configFactory() {
    console.log(this.form['_value']);
    return {
      "name": this.form['_value'].Name,
      "Image": this.image['RepoTags'][0],
      "Tty": this.form['_value'].Tty == "true",
      "Cmd": (this.form['_value'].Cmd == null || this.form['_value'].Cmd == "") ? null : this.form['_value'].Cmd.split(","),
      //"ExposedPorts": JSON.parse(this.form['_value'].ExposedPorts),
      "Env": (this.form['_value'].Environment == null || this.form['_value'].Environment == "") ? null : this.form['_value'].Environment.split(","),
      "ExposedPorts": this.exposedBinds,
      "HostConfig": {
        "Binds": (this.form['_value'].Binds == null || this.form['_value'].Binds == "") ? null : (this.form['_value'].Binds).split(","),
        //"PortBindings": JSON.parse(this.form['_value'].PortBindings),
        "PortBindings": this.portBinds,
        "Privileged": this.form['_value'].Privileged == "true",
        "NetworkMode": this.form['_value'].NetworkMode,
        "Links": (this.form['_value'].Links == null || this.form['_value'].Links == "") ? null : (this.form['_value'].Links).split(","),
      }
    }
  }

}
