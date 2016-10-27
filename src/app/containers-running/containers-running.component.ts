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
        this.hasRunningService = (this.containers.length !== 0);
        this.reloadEvent.emit(true);
        console.log("Running containers");
      });
  }

  stopContainer(id: string) {
    this.containerService.stopContainer(id)
      .then(data => this.getRunningContainers())
      .then(() => this.showNot());
  }

}
