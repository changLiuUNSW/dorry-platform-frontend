import { Component, OnInit } from '@angular/core';
import { Container } from '../containers/container';
import { ContainerService } from '../containers/container.service';

@Component({
  selector: 'app-containers-running',
  templateUrl: './containers-running.component.html',
  styleUrls: [
    './containers-running.component.css',
    '../containers/containers.component.css'
  ]
})
export class ContainersRunningComponent implements OnInit {
  containers: Container[];

  notification: string;
  notState: boolean;

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
      .then(data => this.containers = data);
  }

  stopContainer(id: string) {
    this.containerService.stopContainer(id)
      .then(data => this.getRunningContainers())
      .then(() => this.showNot());
  }

}
