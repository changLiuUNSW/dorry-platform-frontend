import { Component, OnInit } from '@angular/core';
import { MarketService } from './market.service';

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

  constructor(private marketService: MarketService) { }

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
    this.marketService.getTags(item)
      .subscribe(data => {
        this.marketService.pullImage(data.name, data.tags[0])
          .subscribe(data => data);
      })
  }

  private getItem(item: any) {
    this.item = item;
  }

}
