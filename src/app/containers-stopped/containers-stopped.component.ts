import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Container } from '../containers/container';
import { ContainerService } from '../containers/container.service';

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
  hasStoppedService: boolean;

  notification: string;
  notState: boolean;

  @Output() reloadEvent = new EventEmitter<boolean>();

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {
    this.getStoppedContainers();
  }

  showNot() {
    this.notState = true;
    this.notification = "Service restarted";
    setTimeout(function() {
      this.notState = false;
    }.bind(this), 3000);
  }

  getStoppedContainers() {
    this.containerService.getStoppedContainers()
      .then(data => this.containers = data)
      .then(data => {
        this.hasStoppedService = (this.containers.length !== 0);
        this.reloadEvent.emit(true);
        console.log("getStoppedContainers");
      });
  }

  restartContainer(id: string) {
    this.containerService.restartContainer(id)
      .then(data => this.getStoppedContainers())
      .then(() => this.showNot());
  }

}
