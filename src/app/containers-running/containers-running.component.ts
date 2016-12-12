import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Container } from '../containers/container';
import { ContainerService } from '../containers/container.service';

import { ToastsManager } from "ng2-toastr/ng2-toastr";

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
  hasRunning: boolean;
  showAlert: number;

  @Output() reloadEvent = new EventEmitter<boolean>();

  constructor(private containerService: ContainerService, public toastr: ToastsManager) { }

  ngOnInit(): void {
    this.getRunningContainers();
    this.showAlert = 0;
  }

  getRunningContainers() {
    this.containerService.getRunningContainers()
      .then(data => this.containers = data)
      .then(data => {
        console.log(this.containers);
        if (data[Object.keys(data)[0]] && data[Object.keys(data)[0]].Names[0] == '/DORRY-WEB')
          this.hasRunning = ((this.containers.length - 1) !== 0);
        else
          this.hasRunning = (this.containers.length !== 0);
        // console.log('hasRunning: ' + this.hasRunning + '\n'
        //   + 'Container: ' + this.containers[Object.keys(this.containers)[0]]);
      });
  }

  stopContainer(container: Container) {
    this.container = container;
    this.container.spinner = 1;
    let id = container.Id;
    this.containerService.stopContainer(id)
      .then(data => {
        if (data.json().statusCode)
          this.toastr.error('Failed to stop service ' + this.container.Names[0].split("/")[1], 'ERROR', { toastLife: 3000 });
        else
          this.toastr.success('Service ' + this.container.Names[0].split("/")[1] + ' stopped', 'SUCCESS', { toastLife: 3000 });
        this.getRunningContainers();
        this.container.spinner = 0;
      })
      .then(data => {
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 100);
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

}
