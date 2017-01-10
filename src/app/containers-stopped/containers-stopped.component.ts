import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Container } from '../containers/container';
import { ContainerService } from '../containers/container.service';
import { ImagesService } from '../images/images.service';

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

  constructor(private containerService: ContainerService, private imageService: ImagesService, public toastr: ToastsManager) { }

  ngOnInit(): void {
    this.getStoppedContainers();
    this.showAlert = 0;
  }

  getStoppedContainers() {
    this.containerService.getStoppedContainers()
      .subscribe(data => {
        this.containers = data;
        // console.log(this.containers);
        for (let item of this.containers) {
          item.bridge = item['HostConfig']['NetworkMode'] == 'default' ? 'bridge' : item['HostConfig']['NetworkMode']
        }
        this.hasStopped = (this.containers.length !== 0);

        // Get the picture url from database
        for (var i = 0; i < this.containers.length; i++) {
          this.imageService.getData(this.containers[i]['ImageID'])
            .subscribe(appData => {
              for (var j = 0; j < this.containers.length; j++) {
                if (appData.image_id == this.containers[j]['ImageID']) {
                  this.containers[j]['pic_url'] = appData.pic_url;
                }
              }
            });
        }
      });
  }

  restartContainer(container: Container) {
    this.container = container;
    this.container.spinner = 1;
    let id = container.Id;
    this.containerService.restartContainer(id)
      .subscribe(data => {
        if (data.statusCode)
          this.toastr.error('Failed to restart service ' + this.container.Names[0].split("/")[1], 'ERROR', { toastLife: 3000 });
        else
          this.toastr.success('Service ' + this.container.Names[0].split("/")[1] + ' restarted', 'SUCCESS', { toastLife: 3000 });
        this.getStoppedContainers();
        this.container.spinner = 0;
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 100);
      });
  }

  removeContainer(id: string) {
    this.container.spinner = 2;
    this.containerService.removeContainer(id)
      .subscribe(data => {
        if (data.json().statusCode)
          this.toastr.error('Failed to remove service ' + this.container.Names[0].split("/")[1], 'ERROR', { toastLife: 3000 });
        else
          this.toastr.success('Service ' + this.container.Names[0].split("/")[1] + ' removed', 'SUCCESS', { toastLife: 3000 });
        this.getStoppedContainers();
        this.container.spinner = 0;
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
