import { Component, OnInit } from '@angular/core';
import { DEFAULTURL, IMAGELIST, ImageUrl } from './mock-images';
import { ImagesService } from './images.service';
import { Observable } from 'rxjs/Observable';
import { ImageInfo } from './imageInfo';
import { trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css', '../app.component.css'],
})
export class ImagesComponent implements OnInit {
  image: ImageInfo;
  imageList: ImageUrl[];
  imageInfoes: ImageInfo[];

  showAlert: boolean;

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {
    this.imageList = IMAGELIST;
    this.getImageInfoes();
    this.showAlert = false;
  }

  // Bindding the ImageInfo and image url
  initImages() {
    for (let imageInfo of this.imageInfoes) {
      for (let imageUrl of this.imageList) {
        if (imageInfo.RepoTags[0] == imageUrl.name)
          imageInfo.url = imageUrl.name;
        else
          imageInfo.url = DEFAULTURL;
      }
    }
  }

  // Get json object array from Docker Daemon
  getImageInfoes() {
    this.imagesService.getImageInfoes()
      .then(data => {
        this.imageInfoes = data;
        // console.log(this.imageInfoes);
      })
      .then(data => this.initImages());
  }

  // Remove image event when click remove button
  removeImage(id: string) {
    let message: string;
    this.imagesService.removeImage(id)
      .then(msg => this.showMessage(msg))
      .then(msg => this.getImageInfoes());
    // console.log("remove Image : " + id);
  }

  // Create a container
  createContainer(image: ImageInfo) {
    this.imagesService.inspectImage(image.Id)
      .then(data => {
        console.log(data[Object.keys(data)[0]]);
        this.imagesService.createContainer(data[Object.keys(data)[0]])
          .subscribe(data => {
            this.startContainer(data[Object.keys(data)[0]])
          });
      });
  }

  // Start a container
  startContainer(id: string) {
    this.imagesService.startContainer(id)
      .subscribe(data => data);
  }

  // show message after removing image
  // success: Remove the app successfully
  // error: Remove the app error
  private alertMessage: string; // alert dialog message after removing image
  private messageState: boolean; // whether need to show the message
  private isError: boolean; // is message correctly
  showMessage(msg: any) {
    let msgType = typeof msg;
    let message: string;
    if (msgType == "string") {
      message = msg;
      this.isError = false;
    }
    else {
      message = "Failure";
      this.isError = true;
    }

    this.messageState = true;
    this.alertMessage = message;
    setTimeout(function() {
      this.messageState = false;
    }.bind(this), 3000);
  }


  //click image icon show image info
  private showInfoWindow: boolean; //whether need to show imageinfo popup window
  private detailApp: ImageInfo; // the app need to show detail
  openDetailInfo(app: ImageInfo) {
    // console.log(app.Id);
    this.showInfoWindow = true;
    this.detailApp = app;
    this.imagesService.inspectImage(app.Id)
      .then(data => this.detailApp.createDate = this.formatCreatedTime(data.Created));
  }

  //format the create time of image
  //Input: 2016-09-23T16:29:57.276868291Z,etc
  //Output: string 2016-09-23 16:29:57
  formatCreatedTime(created: string) {
    let datetime: string;
    datetime = created.split(".")[0].replace("T", " ");
    return datetime;
  }

  closeDetailInfo() {
    this.showInfoWindow = false;
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
