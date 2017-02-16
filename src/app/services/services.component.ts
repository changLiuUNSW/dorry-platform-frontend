import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: [
    './services.component.css',
    '../app.component.css'
  ]
})
export class ServicesComponent implements OnInit {
  services: Object[];
  service: Object;
  hasService: boolean;

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.listService();
  }

  listService() {
    this.servicesService.listService()
      .subscribe(data => {
        this.services = data["items"];
        this.hasService = (this.services.length !== 0)
        console.log(this.services);
      });
  }

  deleteService(service: Object) {
    service['state'] = 1;
    var body = {
      "name": "mediawiki",
      "deleteVolume": true
    }
    this.servicesService.deleteService(body)
      .subscribe(data => {
        console.log(data);
        service['state'] = 0;
        this.listService();
      });
  }

  getService(service: Object) {
    this.service = service;
  }

}
