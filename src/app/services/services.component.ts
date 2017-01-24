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

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.listServices();
  }

  listServices() {
    this.servicesService.listServices()
      .subscribe(data => {
        this.services = data["items"];
        // console.log(this.services);
      });
  }

}
