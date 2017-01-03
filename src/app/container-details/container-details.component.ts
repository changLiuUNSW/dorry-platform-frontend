import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerService } from '../containers/container.service';

@Component({
  selector: 'app-container-details',
  templateUrl: './container-details.component.html',
  styleUrls: [
    './container-details.component.css',
    '../app.component.css'
  ]
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

  bridge: any;

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
            this.bridge = data.HostConfig.NetworkMode == 'default' ? 'bridge' : data.HostConfig.NetworkMode
            console.log(data);
            this.name = data.Name;
            this.id = data.Id;
            this.image = data.Config.Image;
            this.status = data.State.Status;
            this.ip = data.NetworkSettings.Networks[this.bridge].IPAddress == "" ? "None" : data.NetworkSettings.Networks[this.bridge].IPAddress;
            this.created = data.Created.split(".")[0].replace("T", " ");
            this.cmd = data.Config.Cmd == null ? "None" : data.Config.Cmd;
            this.entrypoint = data.Config.Entrypoint == null ? "None" : data.Config.Entrypoint;
            this.envs = data.Config.Env;
            this.binds = data.HostConfig.Binds;

            for (var port in data.NetworkSettings.Ports) {
              if (data.NetworkSettings.Ports[port] != null) {
                port = data.NetworkSettings.Ports[port][0].HostPort + '->' + port;
                this.ports.push(port);
              }
              else {
                this.ports.push(port);
              }
            }
          })
      })
  }

}
