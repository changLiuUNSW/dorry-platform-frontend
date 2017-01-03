import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../images/images.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  portBinds: Object;
  portBindsKeyArray: string[];
  exposedBinds: Object;
  defaultConf: Object;
  profileConf: Object;

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

  constructor(private route: ActivatedRoute, private imagesService: ImagesService, private fb: FormBuilder) {
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
      'ContainerPort': this.ContainerPort
    });
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.imagesService.inspectImage(id)
          .subscribe(data => {
            this.image = data;
            this.getData();
            // console.log(this.image);
          });
      });
  }

  addPortBinding() {
    if ((this.form._value.HostPort == null || this.form._value.HostPort == "") &&
      (this.form._value.ContainerPort == null || this.form._value.ContainerPort == ""))
      return;
    this.portBinds[this.form._value.ContainerPort + "/tcp"] = [{ "HostPort": this.form._value.HostPort }];
    this.exposedBinds[this.form._value.ContainerPort + "/tcp"] = {};
    this.portBindsKeyArray = Object.keys(this.portBinds);
    console.log(JSON.stringify(this.portBinds));
    console.log(JSON.stringify(this.exposedBinds));
  }

  removePortBinding(key: string) {
    if ((this.form._value.HostPort == null || this.form._value.HostPort == "") &&
      (this.form._value.ContainerPort == null || this.form._value.ContainerPort == ""))
      return;
    delete this.portBinds[key];
    delete this.exposedBinds[key];
    this.portBindsKeyArray = Object.keys(this.portBinds);
    console.log(JSON.stringify(this.portBinds));
    console.log(JSON.stringify(this.exposedBinds));
  }

  startImage(image: Object) {
    this.imagesService.startImage(image.Id)
      .subscribe(data => {
        console.log(data);
      });
  }

  getData() {
    this.imagesService.getData(this.image.Id)
      .subscribe(data => {
        console.log(data);
        this.defaultConf = data.default_conf;
        this.profileConf = data.profile;
      });
  }

  // Start a container with config
  startWithConfig(config: Object) {
    this.imagesService.startWithConfig((config == null ? this.configFactory() : config))
      .subscribe(data => {
        console.log(data);
      });
  }

  saveConfig() {
    this.imagesService.saveConfig(this.configFactory(), this.image.Id)
      .subscribe(data => {
        console.log(data);
      })
  }

  configFactory() {
    console.log(this.form._value);
    console.log(this.image);
    return {
      "name": this.form._value.Name,
      "Image": this.image.RepoTags[0],
      "Tty": this.form._value.Tty == "true",
      "Cmd": (this.form._value.Cmd == null || this.form._value.Cmd == "") ? null : this.form._value.Cmd.split(","),
      //"ExposedPorts": JSON.parse(this.form._value.ExposedPorts),
      "ExposedPorts": this.exposedBinds,
      "HostConfig": {
        "Binds": (this.form._value.Binds == null || this.form._value.Binds == "") ? null : (this.form._value.Binds).split(","),
        //"PortBindings": JSON.parse(this.form._value.PortBindings),
        "PortBindings": this.portBinds,
        "Privileged": this.form._value.Privileged == "true",
        "NetworkMode": this.form._value.NetworkMode,
      }
    }
  }

}
