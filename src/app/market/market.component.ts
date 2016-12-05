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
        var repositories = data[Object.keys(data)[0]];
        for (var i = 0; i < repositories.length; i++) {
          this.items.push(new Item(repositories[i], false));
        }
        console.log(this.items);
      });
  }

  private getTags(item: Item) {
    this.marketService.getTags(item)
      .subscribe(data => console.log(data));
  }

  private installImage(item: Item) {
    this.getItem(item);
    this.marketService.getTags(item)
      .subscribe(data => {
        this.marketService.pullImage(data.name, data.tags[0])
          .subscribe();
      })
  }

  private getItem(item: Item) {
    this.item = item;
  }

}
