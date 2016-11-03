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
  container: Container;
  hasErrorService: boolean;

  showAlert: boolean;
  showAlertAll: boolean;
  containerId: string;

  notification: string;
  notState: boolean;
  isError: boolean;

  @Output() reloadEvent = new EventEmitter<boolean>();

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {
    this.getErrorContainers();
    this.showAlert = false;
    this.showAlertAll = false;
  }

  showNot(msg: string) {
    this.notState = true;
    this.notification = msg;
    setTimeout(function() {
      this.notState = false;
      this.isError = false;
    }.bind(this), 3000);
  }

  getErrorContainers() {
    this.containerService.getErrorContainers()
      .then(data => this.containers = data)
      .then(data => {
        this.hasErrorService = (this.containers.length !== 0);
        // console.log("Error containers");
      });
  }

  removeContainer(id: string) {
    this.containerService.removeContainer(id)
      .then(data => this.getErrorContainers(),
      (err: any) => this.errMsg(err.status))
      .then(data => {
        if (!this.isError) {
          this.showNot(" removed");
        }
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 300);
      });
  }

  //status code
  //204: success
  //400: bad parameter
  //409: conflict
  //500: server error
  private errMsg(statusCode: Number) {
    this.isError = true;
    if (statusCode == 400) {
      this.showNot(" has Bad parameter");
    }
    else if (statusCode == 409) {
      this.showNot(" has Conflict");
    }
    else if (statusCode == 500) {
      this.showNot(" has Server error");
    }
  }

  removeAll() {
    this.containerService.getErrorContainers()
      .then(data => this.containers = data)
      .then(data => {
        for (let container of this.containers) {
          this.removeContainer(container["Id"]);
        }
      })
      .then(data => {
        this.showNot(" removed");
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 300);
      });
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

  getContainer(container: Container) {
    console.log(container);
    this.container = container;
  }

}
