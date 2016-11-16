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
  showDetail: boolean;

  constructor(private marketService: MarketService) { }

  ngOnInit() {
    this.items = [];
    this.listItems();
    this.showDetail = false;
  }

  private listItems() {
    this.marketService.listItems()
      .subscribe(data => {
        var itemNames = data[Object.keys(data)[0]];
        for (var i = 0; i < itemNames.length; i++) {
          this.items.push(new Item(itemNames[i], false));
        }
        console.log(this.items);
      });
  }

  private getTags(item: Item) {
    this.marketService.getTags(item)
      .subscribe(data => console.log(data));
  }

  //intall image from private docker registry
  //getTags  +  pullImage
  private installImage(item: Item) {
    this.getItem(item);
    this.item.installing = true;
    this.marketService.getTags(item)
      .subscribe(data => {
        // console.log(data);
        this.marketService.pullImage(data.name, data.tags[0])
          .subscribe(data => {
            console.log('**************************');
            this.item.installing = false;
          });
      })
  }

  private getItem(item: Item) {
    this.item = item;
  }

  private toggleDetail() {
    this.showDetail = !this.showDetail;
  }

}
