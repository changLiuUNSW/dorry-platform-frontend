import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerService } from '../containers/container.service';

@Component({
  selector: 'app-container-details',
  templateUrl: './container-details.component.html',
  styleUrls: ['./container-details.component.css']
})
export class ContainerDetailsComponent implements OnInit {
  name: any;
  id: any;
  image: any;
  status: any;
  ip: any;
  ports = [];
  created: any;
  cmd: any;
  entrypoint: any;
  binds: any;
  envs: any;

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
            this.image = data.Config.Image;
            this.status = data.State.Status;
            // this.ip = data.NetworkSettings.Networks[data.HostConfig.NetworkMode].IPAddress == "" ? "None" : data.NetworkSettings.Networks[data.HostConfig.NetworkMode].IPAddress;
            this.created = data.Created.split(".")[0].replace("T", " ");
            this.cmd = data.Config.Cmd == null ? "None" : data.Config.Cmd;
            this.entrypoint = data.Config.Entrypoint == null ? "None" : data.Config.Entrypoint;
            this.envs = data.Config.Env;
            this.binds = data.HostConfig.Binds == null ? "None" : data.HostConfig.Binds;

            for (var port in data.NetworkSettings.Ports) {
              if (data.NetworkSettings.Ports.hasOwnProperty(port)) {
                console.log(port);
                this.ports.push(port);
              }
            }
          })
      })
  }

}
