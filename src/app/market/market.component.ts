import { Component, OnInit } from '@angular/core';
import { MarketService } from './market.service';
import { Item } from './market';

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

  constructor(private marketService: MarketService) { }

  ngOnInit() {
    this.items = [];
    this.listItems();
  }

  private listItems() {
    this.marketService.listItems()
      .subscribe(data => {
        for (var i = 0; i < data.length; i++) {
          this.items.push(data[Object.keys(data)[i]]);
          console.log(data[Object.keys(data)[i]]);
        }
      });
  }

  private installImage(item: Item) {
    this.getItem(item);
    item.installing = true;
    this.marketService.pullImage(item.name, item.tags[0])
      .subscribe(data => {
        item.installing = false;
      });
  }

  private getItem(item: Item) {
    this.item = item;
  }

}
