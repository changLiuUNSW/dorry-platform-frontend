import { Component, OnInit } from '@angular/core';
import { MarketService } from './market.service';
import { Item } from './market';

import { MOCK_ITEMS } from './mock-items';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: [
    './market.component.css',
    '../app.component.css'
  ]
})
export class MarketComponent implements OnInit {
  items: Item[];
  item: Item;
  mock_items = MOCK_ITEMS;
  showDetail: boolean;

  constructor(private marketService: MarketService) { }

  ngOnInit() {
    this.listItems();
    this.showDetail = false;
  }

  private listItems() {
    this.marketService.listItems()
      .subscribe(data => {
        for (var key in data) {
          // console.log(key);
          // console.log(data[key]);
          this.items = data[key];
        }
      });
  }

  private getItem(item: Item) {
    this.item = item;
  }

  private toggleDetail() {
    this.showDetail = !this.showDetail;
  }

}
