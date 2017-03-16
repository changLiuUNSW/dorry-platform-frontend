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

// ImageComponent
//
// List application on application page & dialog
// Including
// * remove application
// * start application
//
export class ImagesComponent implements OnInit {
  image: ImageInfo;
  imageInfoes: ImageInfo[];

  dorry = new RegExp(/dorry/, 'i');

  constructor(private imagesService: ImagesService, public toastr: ToastsManager) {
  }

  ngOnInit() {
    this.getImageInfoes();
  }

  // Get json object array from Docker Daemon
  getImageInfoes() {
    this.imagesService.getImageInfoes()
      .subscribe(data => {
        this.imageInfoes = data;
        console.log(this.imageInfoes);
      })
  }

  // Remove image event when click remove button
  removeImage(image: ImageInfo) {
    image.state = 1;
    let name = image.name;
    let message: string;
    this.imagesService.removeImage(name)
      .subscribe(res => {
        //If in stdout, show successful toast
        console.log(res)
        image.state = 0;
        this.toastr.success(res.text(), 'SUCCESS', { toastLife: 3000 });
        this.getImageInfoes();
      }, err => {
        //If in stderr, show error toast
        console.log(err)
        image.state = 0;
        this.toastr.error(err.text(), 'ERROR', { toastLife: 3000 });
        this.getImageInfoes();
      });
  }

  //Function: removeImageStatus
  //Return message by status code
  //
  //500: there is running service
  //!500: has other error
  private removeImageStatus(status: string) {
    if (status == '500')
      return " has a service , please remove it first."
    else
      return " has error."
  }

  // Function: startImage
  // Call images.service start image api
  startImage(image: ImageInfo) {
    image.state = 2;
    this.imagesService.startImage(image.name)
      .subscribe(data => {
        console.log("start image : ");
        console.log(data);
        this.toastr.success(data.text(), 'SUCCESS', { toastLife: 3000 });
        image.state = 0;
        this.getImageInfoes();
      });
  }

  //Function formatCreatedTime
  //format the create time of image
  //Input: 2016-09-23T16:29:57.276868291Z,etc
  //Output: string 2016-09-23 16:29:57
  formatCreatedTime(created: string) {
    let datetime: string;
    datetime = created.split(".")[0].replace("T", " ");
    return datetime;
  }

  //Get image instance from template
  getImage(image: ImageInfo) {
    this.image = image;
  }
}
