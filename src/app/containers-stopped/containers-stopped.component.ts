import { Component, OnInit, DoCheck, Input } from '@angular/core';
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
export class ContainersStoppedComponent implements OnInit, DoCheck {
  containers: Container[];
  hasStoppedService: boolean;

  notification: string;
  notState: boolean;

  @Input() reload: boolean;

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {
    this.getStoppedContainers();
  }

  // ngDoCheck() {
  //   if (this.reload) {
  //     this.getStoppedContainers();
  //     console.log("I am checking stop");
  //   }
  //   this.reload = false;
  // }

  showNot() {
    this.notState = true;
    this.notification = "Service restarted";
    setTimeout(function() {
      this.notState = false;
    }.bind(this), 3000);
  }

  getStoppedContainers() {
    this.containerService.getStoppedContainers()
      .subscribe(data => {
        this.containers = data;
        this.hasStoppedService = (this.containers.length !== 0);
      });
    this.reload = true;
  }

  restartContainer(id: string) {
    this.containerService.restartContainer(id)
      .then(data => this.getStoppedContainers())
      .then(() => this.showNot());
  }

}
