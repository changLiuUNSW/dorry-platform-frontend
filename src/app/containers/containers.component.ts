import { Component, OnInit, DoCheck } from '@angular/core';
import { ContainerService } from '../containers/container.service';
import { ContainersErrorComponent } from '../containers-error/containers-error.component';
import { ContainersRunningComponent } from '../containers-running/containers-running.component';
import { ContainersStoppedComponent } from '../containers-stopped/containers-stopped.component';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css', '../app.component.css']
})
export class ContainersComponent implements OnInit, DoCheck {
  reload = true;

  constructor(private containerService: ContainerService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.reload) {
      console.log("I am checking Everything");
    }
  }
}
