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
      .then(data => this.containers = data)
      .then(data => {
        console.log(this.containers);
        this.hasError = (this.containers.length !== 0);
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
        this.getErrorContainers();
        this.container.spinner = false;
      })
      .then(data => {
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 100);
      });
  }

  displayRemoveAlert(id: string) {
    this.showAlert = 1;
  }

  hideAlert(id: string) {
    this.showAlert = 0;
  }

  getContainer(container: Container) {
    this.container = container;
  }

}
