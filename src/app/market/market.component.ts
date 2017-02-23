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

  constructor(
    private marketService: MarketService,
    public toast: ToastsManager
  ) { }

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
    this.application.state = 1;
    this.marketService.downloadApplication(id)
      .subscribe(res => {
        // console.log(res);
        this.application.state = 0;
        this.toast.success(res.text(), 'SUCCESS', { toastLife: 3000 });
        this.listApplication();
      }, err => {
        // console.log(error)
        this.application.state = 0;
        this.toast.error(err.text(), 'ERROR', { toastLife: 3000 });
        this.listApplication();
      });
  }

  private getApplication(application: any) {
    this.application = application;
  }

}
