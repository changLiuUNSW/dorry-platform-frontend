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
  item: any;
  items = [];

  constructor(private marketService: MarketService, public toastr: ToastsManager) { }

  ngOnInit() {
    this.listItems();
  }

  private listItems() {
    this.marketService.listItems()
      .subscribe(data => {
        console.log(data);
        this.items = data;
      });
  }

  private getTags(item: any) {
    this.marketService.getTags(item)
      .subscribe(data => console.log(data));
  }

  private installImage(item: any) {
    this.getItem(item);
    item.state = 2;
    this.marketService.getTags(item)
      .subscribe(data => {
        this.marketService.pullImage(data.name, data.tags[0], item)
          .subscribe(data => {
            if (data.statusCode) {
              this.toastr.error('Fail installing ' + item.name, 'ERROR', { toastLife: 3000 });
            }
            else {
              this.toastr.success(item.name + ' Installed', 'SUCCESS', { toastLife: 3000 });
            }
            item.state = 1;
          });
      })
  }

  private getItem(item: any) {
    this.item = item;
  }

}
