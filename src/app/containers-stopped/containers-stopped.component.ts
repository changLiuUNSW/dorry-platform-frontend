import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Container } from '../containers/container';
import { ContainerService } from '../containers/container.service';

import { ToastsManager } from "ng2-toastr/ng2-toastr";

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
  hasStopped: boolean;
  showAlert: number;

  @Output() reloadEvent = new EventEmitter<boolean>();

  constructor(private containerService: ContainerService, public toastr: ToastsManager) { }

  ngOnInit(): void {
    this.getStoppedContainers();
    this.showAlert = 0;
  }

  getStoppedContainers() {
    this.containerService.getStoppedContainers()
      .then(data => this.containers = data)
      .then(data => {
        console.log(this.containers);
        this.hasStopped = (this.containers.length !== 0);
      });
  }

  restartContainer(container: Container) {
    this.container = container;
    this.container.spinner = true;
    let id = container.Id;
    this.containerService.restartContainer(id)
      .then(data => {
        if (data.statusCode)
          this.toastr.error('Failed to restart service', 'ERROR', { toastLife: 3000 });
        else
          this.toastr.success('Service restarted', 'SUCCESS', { toastLife: 3000 });
        this.getStoppedContainers();
        this.container.spinner = false;
      })
      .then(data => {
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 100);
      });
  }

  removeContainer(id: string) {
    this.container.spinner = true;
    this.containerService.removeContainer(id)
      .then(data => {
        if (data.json().statusCode)
          this.toastr.error('Failed to remove service', 'ERROR', { toastLife: 3000 });
        else
          this.toastr.success('Service removed', 'SUCCESS', { toastLife: 3000 });
        this.getStoppedContainers();
        this.container.spinner = false;
      })
      .then(data => {
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 100);
      });
  }

  displayRestartAlert(id: string) {
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
