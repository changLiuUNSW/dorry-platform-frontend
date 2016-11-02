import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Container } from '../containers/container';
import { ContainerService } from '../containers/container.service';

@Component({
  selector: 'app-containers-stopped',
  templateUrl: './containers-stopped.component.html',
  styleUrls: [
    './containers-stopped.component.css',
    '../containers/containers.component.css',
    '../app.component.css'
  ]
})
export class ContainersStoppedComponent implements OnInit {
  containers: Container[];
  container: Container;
  hasStoppedService: boolean;

  notification: string;
  notState: boolean;//whether need to show the message
  private isError: boolean;//is message correctly

  @Output() reloadEvent = new EventEmitter<boolean>();

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {
    this.getStoppedContainers();
  }

  showNot(msg: string) {
    this.notState = true;
    this.notification = msg;
    setTimeout(function() {
      this.notState = false;
      this.isError = false;
    }.bind(this), 3000);
  }

  getStoppedContainers() {
    this.containerService.getStoppedContainers()
      .then(data => this.containers = data)
      .then(data => {
        this.hasStoppedService = (this.containers.length !== 0);
        // console.log("Stopped containers");
      });
  }

  restartContainer(container: Container) {
    this.container = container;
    let id = container.Id;
    this.containerService.restartContainer(id)
      .then(data => this.getStoppedContainers(),
      (err: any) => this.errMsg(err.status))
      .then(data => {
        if (!this.isError) {
          this.showNot(" restarted");
        }
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 300);
      });
  }

  //status code
  //204: success
  //404: no such container
  //500: server error
  private errMsg(statusCode: Number) {
    this.isError = true;
    if (statusCode == 404) {
      this.showNot(" ,No such container");
    }
    else if (statusCode == 500) {
      this.showNot(" has Server error");
    }
  }

}
