import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: [
    './service-details.component.css',
    '../app.component.css'
  ]
})
export class ServiceDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .map(params => params['name'])
      .subscribe(name => name)
  }

}
