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
  notiImage: ImageInfo;
  image: ImageInfo;
  imageList: ImageUrl[];//imageicon url
  imageInfoes: ImageInfo[];//all image list
  appName: string;//formated image name

  showAlert: boolean;//show alert tag
  hasApp: boolean;

  notification: string;
  notState: boolean;
  isError: boolean = false;
  regExp = new RegExp(/DORRY-WEB/, 'i');

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
        console.log(this.imageInfoes);
        this.hasApp = (this.imageInfoes.length !== 0);
      })
      .then(data => this.initImages());
  }

  // Remove image event when click remove button
  removeImage(image: ImageInfo) {
    image.removing = true;
    this.notiImage = image;
    let id = image.Id;
    let message: string;
    this.imagesService.removeImage(id)
      .then(data => {
        if (!this.isError) {
          this.showNot(" has been removed successfully");
        }
      },
      err => {
        this.errMsg(err.status);
      })
      .then(msg => {
        image.removing = false;
        this.getImageInfoes()
      });
  }

  // Create a container
  createContainer(image: ImageInfo) {
    image.starting = true;
    this.notState = false;
    this.notiImage = image;
    this.imagesService.inspectImage(image.Id)
      .then(data => {
        console.log(data[Object.keys(data)[0]]);
        this.imagesService.createContainer(data[Object.keys(data)[0]]).then(data => {
          this.startContainer(data[Object.keys(data)[0]])
        }, err => this.createConErrMsg(err.status))
      })
      .then(data => {
        image.starting = false;
        this.image = null;
      })
  }

  // Start a container
  startContainer(id: string) {
    this.imagesService.startContainer(id)
      .then(data => {
        if (!this.isError)
          this.showNot(" has started a new container");
      }
      , err => this.startConErrMsg(err.status));

  }

  //create container error message
  // 201 – no error
  // 400 – bad parameterwa3
  // 404 – no such container
  // 406 – impossible to attach (container not running)
  // 409 – conflict
  // 500 – server error
  private createConErrMsg(statusCode: Number) {
    console.log("create container errr message:" + statusCode);
    this.isError = true;
    // if (statusCode == 400) {
    //   this.showNot(" has bad parameter");
    // }
    // else if (statusCode == 404) {
    //   this.showNot(" start error,no such container");
    // }
    // else if (statusCode == 406) {
    //   this.showNot(" impossible to attach");
    // }
    // else if (statusCode == 409) {
    //   this.showNot(" start error,has conflict");
    // }
    // else if (statusCode == 500) {
    //   this.showNot(" has Server error");
    // }
    if (statusCode >= 400) {
      this.showNot(" failed to start a service");
    }
  }

  //start container error message
  // 204 – no error
  // 304 – container already started
  // 404 – no such container
  // 500 – server error
  private startConErrMsg(statusCode: Number) {
    console.log("start container errr message:" + statusCode);
    this.isError = true;
    if (statusCode == 304) {
      this.showNot(" started failed, a service had already been started");
    }
    else if (statusCode >= 400) {
      this.showNot(" failed to start a service");
    }
    // else if (statusCode == 404) {
    //   this.showNot(" start error,no such container");
    // }
    // else if (statusCode == 500) {
    //   this.showNot(" has Server error");
    // }
  }

  //status code
  //200: success
  //404: no such image
  //409: conflict
  //500: server error
  private errMsg(statusCode: Number) {
    this.isError = true;
    // if (statusCode == 404) {
    //   this.showNot(" ,No such Image");
    // }
    // else if (statusCode == 409) {
    //   this.showNot(" has conflict");
    // }
    // else if (statusCode == 500) {
    //   this.showNot(" has Server error");
    // }
    if (statusCode >= 400) {
      this.showNot(" was removed unsuccessfully");
    }
  }

  //show notification
  showNot(msg: string) {
    this.notState = true;
    this.notification = msg;
    setTimeout(function() {
      this.notState = false;
      this.isError = false;
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
