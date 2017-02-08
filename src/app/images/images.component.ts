import { Component, OnInit } from '@angular/core';
import { ImagesService } from './images.service';
import { Observable } from 'rxjs/Observable';
import { ImageInfo } from './imageInfo';
import { trigger, state, style, transition, animate } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PopoverModule } from "ng2-popover";
import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css', '../app.component.css'],
})

export class ImagesComponent implements OnInit {
  image: ImageInfo;
  imageInfoes: ImageInfo[];

  showAlert: boolean;
  showForm: boolean;
  hasApp: boolean;

  dorry = new RegExp(/dorry/, 'i');

  // Config form
  form: FormGroup;
  Name = new FormControl();
  Cmd = new FormControl();
  Entrypoint = new FormControl();
  Binds = new FormControl();
  PortBindings = new FormControl();
  Tty = new FormControl();

  constructor(private imagesService: ImagesService, public toastr: ToastsManager, private fb: FormBuilder) {
    this.form = fb.group({
      'Name': this.Name,
      'Cmd': this.Cmd,
      'Entrypoint': this.Entrypoint,
      'Binds': this.Binds,
      'PortBindings': this.PortBindings,
      'Tty': this.Tty
    });
  }

  ngOnInit() {
    this.getImageInfoes();
    this.showAlert = false;
    this.showForm = false;
  }

  // Get json object array from Docker Daemon
  getImageInfoes() {
    this.imagesService.getImageInfoes()
      .subscribe(data => {
        this.imageInfoes = data;
        console.log(this.imageInfoes);
        console.log(this.imageInfoes[0].pictureUrl);
        this.hasApp = (this.imageInfoes.length !== 0);
      })
  }

  // Remove image event when click remove button
  removeImage(image: ImageInfo) {
    image.state = 1;
    let name = image.name;
    let message: string;
    this.imagesService.removeImage(name)
      .subscribe(
      data => {
        console.log(data)
        if (data.returncode != '200')
          this.toastr.error(this.image.name + this.removeImageStatus(data.returncode), 'ERROR', { toastLife: 3000 });
        else
          this.toastr.success(this.image.name + ' removed ', 'SUCCESS', { toastLife: 3000 });
        image.state = 0;
        this.getImageInfoes()
      });
  }

  private removeImageStatus(status: string) {
    if (status == '500')
      return " has a service , please remove it first."
    else
      return " has error."
  }

  startImage(image: ImageInfo) {
    image.state = 2;
    this.imagesService.startImage(image.name)
      .subscribe(data => {
        console.log("start image : ");
        console.log(data);
        // if (data.statusCode)
        //   this.toastr.error(this.startImageMessage(data.json.message), 'ERROR', { toastLife: 3000 });
        // else
        this.toastr.success('Start ' + image.name + ' successfully', 'SUCCESS', { toastLife: 3000 });
        image.state = 0;
        this.getImageInfoes();
      });
  }

  // Start a container with config
  startWithConfig(image: ImageInfo) {
    this.imagesService.startWithConfig(this.configFactory())
      .subscribe(data => {
        // if (data.statusCode)
        //   this.toastr.error(this.startImageMessage(data.json.message), 'ERROR', { toastLife: 3000 });
        // else
        //   this.toastr.success('Service started', 'SUCCESS', { toastLife: 3000 });
        image.state = 0;
        this.getImageInfoes();
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

  //format the create time of image
  //Input: 2016-09-23T16:29:57.276868291Z,etc
  //Output: string 2016-09-23 16:29:57
  formatCreatedTime(created: string) {
    let datetime: string;
    datetime = created.split(".")[0].replace("T", " ");
    return datetime;
  }

  displayAlert(id: string) {
    this.showAlert = true;
  }

  hideAlert(id: string) {
    this.showAlert = false;
  }

  displayForm() {
    this.showForm = true;
  }

  hideForm(id: string) {
    this.showForm = false;
  }

  getImage(image: ImageInfo) {
    this.image = image;
  }

  configFactory() {
    return {
      "Image": this.image.name,
      "Tty": this.form['_value'].Tty == "true",
      "Cmd": [this.form['_value'].Cmd],
      "HostConfig": {
        "Binds": this.form['_value'].Binds,
        "PortBindings": this.form['_value'].PortBindings,
      }
    }
  }

}
