import { Component, OnInit, DoCheck, Input } from '@angular/core';
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
export class ContainersRunningComponent implements OnInit, DoCheck {
  containers: Container[];
  hasRunningService: boolean;

  notification: string;
  notState: boolean;

  @Input() reload: boolean;

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {
    this.getRunningContainers();
  }

  // ngDoCheck() {
  //   if (this.reload) {
  //     this.getRunningContainers();
  //     console.log("I am checking running");
  //   }
  //   this.reload = false;
  // }

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
      });
    this.reload = true;
  }

  stopContainer(id: string) {
    this.containerService.stopContainer(id)
      .then(data => this.getRunningContainers())
      .then(() => this.showNot());
  }

}
