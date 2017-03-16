import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationsService } from '../applications/applications.service';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: [
    './application-details.component.css',
    '../app.component.css'
  ]
})
export class ApplicationDetailsComponent implements OnInit {
  id: string;
  application: Object;

  constructor(
    private route: ActivatedRoute,
    private applicationsService: ApplicationsService
  ) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe(data => this.id = data);
    this.getApplicationDetail(this.id);
  }

  // get application detail by applicatoin name
  getApplicationDetail(id: string) {
    this.applicationsService.getApplicationDetail(id)
      .subscribe(data => {
        console.log(data);
        this.application = data;
      })
  }

}
