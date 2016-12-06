import { Component, OnInit } from '@angular/core';
import { DEFAULTURL, IMAGELIST, ImageUrl } from './mock-images';
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
  notiImage: ImageInfo;
  image: ImageInfo;
  imageList: ImageUrl[];//imageicon url
  imageInfoes: ImageInfo[];//all image list
  appName: string;//formated image name

  showAlert: boolean;//show alert tag
  hasApp: boolean;

  regExp = new RegExp(/DORRY-WEB/, 'i');

  constructor(private imagesService: ImagesService, public toastr: ToastsManager) {

  }

  ngOnInit() {
    this.imageList = IMAGELIST;
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
    image.removing = true;
    this.notiImage = image;
    let id = image.Id;
    let message: string;
    this.imagesService.removeImage(id)
      .then(
      data => {
        if (data.statusCode)
          this.toastr.error("Failed to remove image.", 'Oops!', { toastLife: 3000 });
        else
          this.toastr.success("Have removed image.", "Success!", { toastLife: 3000 });
      })
      .then(msg => {
        image.removing = false;
        this.getImageInfoes()
      });
  }

  startImage(image: ImageInfo) {
    this.imagesService.startImage(image.Id)
      .then(data => {
        console.log("start image : ");
        console.log(data);
        if (data.statusCode)
          this.toastr.error("Failed to start image.", 'Oops!', { toastLife: 3000 });
        else
          this.toastr.success("Have started image.", "Success!", { toastLife: 3000 });
      });
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
    this.image = null;
  }

  getImage(image: ImageInfo) {
    this.image = image;
  }

}
