import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Container } from '../containers/container';
import { ContainerService } from '../containers/container.service';

import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'app-containers-error',
  templateUrl: './containers-error.component.html',
  styleUrls: [
    './containers-error.component.css',
    '../containers/containers.component.css',
    '../app.component.css'
  ]
})
export class ContainersErrorComponent implements OnInit {
  containers: Container[];
  container: Container;
  hasError: boolean;
  showAlert: number;

  @Output() reloadEvent = new EventEmitter<boolean>();

  constructor(private containerService: ContainerService, public toastr: ToastsManager) { }

  ngOnInit(): void {
    this.getErrorContainers();
    this.showAlert = 0;
  }

  getErrorContainers() {
    this.containerService.getErrorContainers()
      .subscribe(data => {
        this.containers = data;
        for (let item of this.containers) {
          item.bridge = item['HostConfig']['NetworkMode'] == 'default' ? 'bridge' : item['HostConfig']['NetworkMode']
        }
        this.hasError = (this.containers.length !== 0);
      });
  }

  removeContainer(id: string) {
    this.container.spinner = 1;
    this.containerService.removeContainer(id)
      .subscribe(data => {
        if (data.json().statusCode)
          this.toastr.error('Failed to remove service ' + this.container.Names[0].split("/")[1], 'ERROR', { toastLife: 3000 });
        else
          this.toastr.success('Service ' + this.container.Names[0].split("/")[1] + ' removed', 'SUCCESS', { toastLife: 3000 });
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 100);
      });
  }

  removeErrorContainers() {
    // this.container.spinner = 2;
    this.containerService.removeErrorContainers()
      .subscribe(data => {
        // if (data.json().statusCode)
        //   this.toastr.error('Failed to remove all services', 'ERROR', { toastLife: 3000 });
        // else
        //   this.toastr.success('All services removed', 'SUCCESS', { toastLife: 3000 });
        // if (data.json().statusCode)
        //   this.toastr.error('Failed to remove all services', 'ERROR', { toastLife: 3000 });
        // else
        //   this.toastr.success('All services removed', 'SUCCESS', { toastLife: 3000 });
        // this.container.spinner = 0;
        console.log('Removing all error containers...')
        this.toastr.success('All error services removed', 'SUCCESS', { toastLife: 3000 });
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 100);
      });
  }

  displayRemoveAlert(id: string) {
    this.showAlert = 1;
  }

  displayRemoveErrorAlert() {
    this.showAlert = 2;
  }

  hideAlert(id: string) {
    this.showAlert = 0;
  }

  getContainer(container: Container) {
    this.container = container;
  }

}
