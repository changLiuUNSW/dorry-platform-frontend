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
  hasError: boolean;

  showAlert: number;
  showAlertAll: number;

  notification: string;
  notState: boolean;
  isError: boolean;
  notAll: boolean;

  spinnerAll: boolean;

  @Output() reloadEvent = new EventEmitter<boolean>();

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {
    this.getErrorContainers();
    this.showAlert = 0;
    this.showAlertAll = 0;
  }

  showNot(msg: string) {
    this.notState = true;
    this.notification = msg;
    setTimeout(function() {
      this.notState = false;
      this.isError = false;
    }.bind(this), 3000);
  }

  showNotAll(msg: string) {
    this.notAll = true;
    this.notification = msg;
    setTimeout(function() {
      this.notAll = false;
    }.bind(this), 3000);
  }

  getErrorContainers() {
    this.containerService.getErrorContainers()
      .then(data => this.containers = data)
      .then(data => {
        console.log(this.containers);
        this.hasError = (this.containers.length !== 0);
      });
  }

  inspectContainer(id: string) {
    this.containerService.inspectContainer(id)
      .then(data => {
        console.log(data['_body']);
      });
  }

  removeContainer(id: string) {
    this.container.spinner = true;
    this.containerService.removeContainer(id)
      .then(data => {
        this.getErrorContainers();
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
    this.spinnerAll = true;
    this.containerService.getErrorContainers()
      .then(data => this.containers = data)
      .then(data => {
        for (let container of this.containers) {
          this.containerService.removeContainer(container["Id"])
            .then(data => this.getErrorContainers(),
            (err: any) => this.errMsg(err.status));
          this.spinnerAll = false;
        }
      })
      .then(data => {
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 300);
      })
      .then(data =>
        this.showNotAll("All containers have been removed successfully")
      );
  }

  displayRemoveAlert(id: string) {
    this.showAlert = 1;
    this.showAlertAll = 1;
  }

  hideAlert(id: string) {
    this.showAlert = 0;
  }

  displayAlertAll() {
    this.showAlertAll = 1;
    this.showAlert = 0;
  }

  hideAlertAll() {
    this.showAlertAll = 0;
  }

  getContainer(container: Container) {
    this.container = container;
  }

}
