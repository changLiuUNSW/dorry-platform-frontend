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
  defaultConf: Object;
  profileConf: Object;

  // Config form
  form: FormGroup;
  Name = new FormControl('');
  Cmd = new FormControl('');
  Entrypoint = new FormControl('');
  Binds = new FormControl('');
  ExposedPorts = new FormControl();
  PortBindings = new FormControl();
  Tty = new FormControl('true');
  NetworkMode = new FormControl('bridge');
  Privileged = new FormControl('false');

  constructor(private route: ActivatedRoute, private imagesService: ImagesService, private fb: FormBuilder) {
    this.form = fb.group({
      'Name': this.Name,
      'Cmd': this.Cmd,
      'Entrypoint': this.Entrypoint,
      'Binds': this.Binds,
      'ExposedPorts': this.ExposedPorts,
      'PortBindings': this.PortBindings,
      'Tty': this.Tty,
      'NetworkMode': this.NetworkMode,
      'Privileged': this.Privileged
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
    return {
      "name": this.form._value.Name,
      "Image": this.image.RepoTags[0],
      "Tty": this.form._value.Tty == "true",
      "Cmd": this.form._value.Cmd.split(","),
      "ExposedPorts": JSON.parse(this.form._value.ExposedPorts),
      "HostConfig": {
        "Binds": (this.form._value.Binds).split(","),
        "PortBindings": JSON.parse(this.form._value.PortBindings),
        "Privileged": this.form._value.Privileged == "true",
        "NetworkMode": this.form._value.NetworkMode,
      }
    }
  }

}
