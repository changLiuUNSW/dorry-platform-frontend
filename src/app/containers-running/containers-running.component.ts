import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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
  hasRunningService: boolean;

  notification: string;
  notState: boolean;

  @Output() reloadEvent = new EventEmitter<boolean>();

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {
    this.getRunningContainers();
  }

  showNot() {
    this.notState = true;
    this.notification = "Service stopped";
    setTimeout(function() {
      this.notState = false;
    }.bind(this), 3000);
  }

  getRunningContainers() {
    this.containerService.getRunningContainers()
      .then(data => this.containers = data)
      .then(data => {
        if (data[Object.keys(data)[0]].Names[0] == '/DORRY-WEB')
          this.hasRunningService = ((this.containers.length - 1) !== 0);
        else
          this.hasRunningService = (this.containers.length !== 0);
        // console.log('hasRunningService: ' + this.hasRunningService + '\n'
        //   + 'Container: ' + this.containers[Object.keys(this.containers)[0]].Names[0]);
      });
  }

  stopContainer(id: string) {
    this.containerService.stopContainer(id)
      .then(data => this.getRunningContainers())
      .then(() => {
        this.showNot();
        setTimeout(function() {
          this.reloadEvent.emit(true);
        }.bind(this), 600);
      });
  }

}
