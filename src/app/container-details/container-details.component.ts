import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerService } from '../containers/container.service';

@Component({
  selector: 'app-container-details',
  templateUrl: './container-details.component.html',
  styleUrls: ['./container-details.component.css']
})
export class ContainerDetailsComponent implements OnInit {
  name: string;
  id: string;
  image: string;
  status: string;
  ports: string;
  created: string;
  cmd: string;
  entrypoint: string;
  binds: string;
  env: string;

  constructor(
    private route: ActivatedRoute,
    private containerService: ContainerService
  ) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.containerService.inspectContainer(id)
          .subscribe(data => {
            console.log(data);
            this.name = data.Name;
            this.id = data.Id;
            this.image = data.Image;
            this.status = data.State.Status;
            this.created = data.Created;
            this.cmd = data.Config.Cmd;
            this.entrypoint = data.Config.Entrypoint;
            this.env = data.Config.Env;
            this.ports = data.NetworkSettings.Ports;
            this.binds = data.HostConfig.Binds;
          })
      })
  }

}
