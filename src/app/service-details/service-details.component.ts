import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: [
    './service-details.component.css',
    '../app.component.css'
  ]
})
export class ServiceDetailsComponent implements OnInit {
  name: string;
  main: Object;
  database: Object;

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService
  ) { }

  ngOnInit() {
    this.route.params
      .map(params => params['name'])
      .subscribe(data => this.name = data);
    this.getServiceDetail(this.name);
  }

  getServiceDetail(name: string) {
    this.servicesService.getServiceDetail(name)
      .subscribe(data => {
        console.log(data);
        this.main = data['main'];
        this.database = data['database'];
      })
  }

}
