import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Response } from '@angular/http';
import { Container } from '../containers/container';
import { ContainerService } from '../containers/container.service';

@Component({
  selector: 'app-containers-running',
  templateUrl: './containers-running.component.html',
  styleUrls: [
    './containers-running.component.css',
    '../containers/containers.component.css',
    '../app.component.css'
  ]
})
export class ContainersRunningComponent implements OnInit {
  containers: Container[];
  container: Container;
  hasRunningService: boolean;

  showAlert: number;

  notification: string;
  notState: boolean;
  isError: boolean;
  res: Response;

  @Output() reloadEvent = new EventEmitter<boolean>();

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {
    this.getRunningContainers();
    this.showAlert = 0;
  }

  showNot(msg: string) {
    this.notState = true;
    this.notification = msg;
    setTimeout(function() {
      this.notState = false;
      this.isError = false;
    }.bind(this), 3000);
  }

  getRunningContainers() {
    this.containerService.getRunningContainers()
      .then(data => this.containers = data)
      .then(data => {
        if (data[Object.keys(data)[0]] && data[Object.keys(data)[0]].Names[0] == '/DORRY-WEB')
          this.hasRunningService = ((this.containers.length - 1) !== 0);
        else
          this.hasRunningService = (this.containers.length !== 0);
        // console.log('hasRunningService: ' + this.hasRunningService + '\n'
        //   + 'Container: ' + this.containers[Object.keys(this.containers)[0]]);
      });
  }

  stopContainer(container: Container) {
    this.container = container;
    this.container.spinner = true;
    let id = container.Id;
    this.containerService.stopContainer(id)
      .then(data => {
        this.getRunningContainers();
        this.container.spinner = false;
      },
      (err: any) => this.errMsg(err.status))
      .then(data => {
        if (!this.isError) {
          this.showNot(" has been stopped successfully");
        }
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 100);
      });
  }

  removeContainer(id: string) {
    this.container.spinner = true;
    this.containerService.removeContainer(id)
      .then(data => {
        this.getRunningContainers();
        this.container.spinner = false;
      },
      (err: any) => this.errMsg(err.status))
      .then(data => {
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 100);
      })
      .then(data => {
        if (!this.isError)
          this.showNot(" has been removed successfully");
      });
  }

  displayStopAlert(id: string) {
    this.showAlert = 1;
  }

  displayRemoveAlert(id: string) {
    this.showAlert = 2;
  }

  hideAlert(id: string) {
    this.showAlert = 0;
  }

  getContainer(container: Container) {
    this.container = container;
  }

  //status code
  //204: success
  //304: container already stopped
  //404: no such container
  //500: server error
  private errMsg(statusCode: Number) {
    this.isError = true;
    if (statusCode == 404) {
      this.showNot(" ,No such container");
    }
    else if (statusCode == 304) {
      this.showNot(" already stopped");
    }
    else if (statusCode == 500) {
      this.showNot(" has Server error");
    }
  }

}
