import { Component, OnInit } from '@angular/core';
import { ImagesService } from './images.service';
import { Observable } from 'rxjs/Observable';
import { ImageInfo } from './imageInfo';
import { trigger, state, style, transition, animate } from '@angular/core';

import { PopoverModule } from "ng2-popover";
import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css', '../app.component.css'],
})

export class ImagesComponent implements OnInit {
  image: ImageInfo;
  imageInfoes: ImageInfo[];//all image list

  showAlert: boolean;//show alert tag
  hasApp: boolean;

  regExp = new RegExp(/DORRY-WEB/, 'i');

  constructor(private imagesService: ImagesService, public toastr: ToastsManager) {

  }

  ngOnInit() {
    this.getImageInfoes();
    this.showAlert = false;
  }

  // Get json object array from Docker Daemon
  getImageInfoes() {
    this.imagesService.getImageInfoes()
      .then(data => {
        this.imageInfoes = data;
        console.log(this.imageInfoes);
        this.hasApp = (this.imageInfoes.length !== 0);
      })
  }

  // Remove image event when click remove button
  removeImage(image: ImageInfo) {
    image.spinner = 1;
    let id = image.Id;
    let message: string;
    this.imagesService.removeImage(id)
      .then(
      data => {
        if (data.statusCode)
          this.toastr.error(this.image.RepoTags[0] + this.removeImageStatus(data.statusCode), 'ERROR', { toastLife: 3000 });
        else
          this.toastr.success(this.image.RepoTags[0] + ' removed ', 'SUCCESS', { toastLife: 3000 });
      })
      .then(msg => {
        image.spinner = 0;
        this.getImageInfoes()
      });
  }

  private removeImageStatus(status: number) {
    if (status == 409)
      return " has a service , please remove it first."
    else if (status == 500)
      return " has server error."
    else
      return " has err."
  }

  startImage(image: ImageInfo) {
    image.spinner = 2;
    this.imagesService.startImage(image.Id)
      .then(data => {
        console.log("start image : ");
        console.log(data);
        if (data.statusCode)
          this.toastr.error(this.startImageMessage(data.json.message), 'ERROR', { toastLife: 3000 });
        else
          this.toastr.success('Service started', 'SUCCESS', { toastLife: 3000 });
      })
      .then(msg => {
        image.spinner = 0;
        this.getImageInfoes()
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
    //this.image = null;
  }

  getImage(image: ImageInfo) {
    this.image = image;
  }

}
