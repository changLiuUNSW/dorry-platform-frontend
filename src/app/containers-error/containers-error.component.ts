import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Container } from '../containers/container';
import { ContainerService } from '../containers/container.service';

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
  hasErrorService: boolean;

  showAlert: boolean;
  showAlertAll: boolean;
  containerId: string;

  notification: string;
  notState: boolean;

  @Output() reloadEvent = new EventEmitter<boolean>();

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {
    this.getErrorContainers();
    this.showAlert = false;
    this.showAlertAll = false;
  }

  showNot() {
    this.notState = true;
    this.notification = "Service removed";
    setTimeout(function() {
      this.notState = false;
    }.bind(this), 3000);
  }

  getErrorContainers() {
    this.containerService.getErrorContainers()
      .then(data => this.containers = data)
      .then(data => {
        this.hasErrorService = (this.containers.length !== 0);
        console.log("Error containers");
      });
  }

  removeContainer(id: string) {
    this.containerService.removeContainer(id)
      .then(data => this.getErrorContainers())
      .then(() => this.showNot())
      .then(() => this.reloadEvent.emit(true));
  }

  removeAll() {
    this.containerService.getErrorContainers()
      .then(data => this.containers = data)
      .then(data => {
        for (let container of this.containers) {
          this.removeContainer(container["Id"]);
        }
      })
      .then(() => this.showNot())
      .then(() => this.reloadEvent.emit(true));
  }

  displayAlert(id: string) {
    this.showAlert = true;
    this.showAlertAll = false;
  }

  hideAlert(id: string) {
    this.showAlert = false;
  }

  displayAlertAll() {
    this.showAlertAll = true;
    this.showAlert = false;
  }

  hideAlertAll() {
    this.showAlertAll = false;
  }

  getContainerId(id: string) {
    this.containerId = id;
  }
}
