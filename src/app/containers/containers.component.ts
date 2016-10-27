import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ContainerService } from '../containers/container.service';
import { ContainersErrorComponent } from '../containers-error/containers-error.component';
import { ContainersRunningComponent } from '../containers-running/containers-running.component';
import { ContainersStoppedComponent } from '../containers-stopped/containers-stopped.component';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css', '../app.component.css']
})
export class ContainersComponent implements OnInit {

  constructor(private containerService: ContainerService) { }

  ngOnInit() {
  }

  reload() {
    console.log('Fucking event works');
  }
}
