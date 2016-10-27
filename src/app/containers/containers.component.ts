import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ContainerService } from '../containers/container.service';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css', '../app.component.css']
})
export class ContainersComponent implements OnInit {

  constructor(private containerService: ContainerService) { }

  ngOnInit() {
  }

}
