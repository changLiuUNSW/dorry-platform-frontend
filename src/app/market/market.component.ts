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
        this.applications = data['res'];
        console.log(this.applications);
      });
  }

  // private installImage(item: any) {
  //   this.getItem(item);
  //   item.state = 2;
  //   this.marketService.getTags(item)
  //     .subscribe(data => {
  //       this.marketService.pullImage(data.name, data.tags[0], item)
  //         .subscribe(data => {
  //           if (data.statusCode) {
  //             this.toastr.error('Fail installing ' + item.name, 'ERROR', { toastLife: 5000 });
  //           }
  //           else {
  //             this.toastr.success(item.name + ' Installed', 'SUCCESS', { toastLife: 5000 });
  //           }
  //           item.state = 1;
  //         });
  //     })
  // }

  private getApplication(application: any) {
    this.application = application;
  }

}
