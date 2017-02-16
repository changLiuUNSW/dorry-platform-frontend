import { Component, OnInit } from '@angular/core';
import { MarketService } from './market.service';

import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: [
    './market.component.css',
    '../app.component.css'
  ]
})
export class MarketComponent implements OnInit {
  application: any;
  applications = [];

  constructor(private marketService: MarketService, public toastr: ToastsManager) { }

  ngOnInit() {
    this.listApplication();
  }

  private listApplication() {
    this.marketService.listApplication()
      .subscribe(data => {
        console.log(data);
        this.applications = data['res'];
      });
  }

  private downloadApplication(id: string) {
    this.marketService.downloadApplication(id)
      .subscribe(data => {
        console.log(data);
      });
  }

  private getApplication(application: any) {
    this.application = application;
  }

}
