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
          // console.log(data[key]);
          this.items = data[key];
        }
      });
  }

  private getTags(name: string) {
    this.marketService.getTags(name)
      .subscribe(data => console.log(data));
  }

  private pullManifest(name: string, ref: string) {
    this.marketService.pullManifest(name, ref)
      .subscribe(data => console.log(data));
  }

  private pullBlobs(name: string, ref: string) {
    this.marketService.pullManifest(name, ref)
      .subscribe(data => {
        for (var key in data['fsLayers']) {
          var digest;
          console.log(data['fsLayers'][key]['blobSum']);
          digest = data['fsLayers'][key]['blobSum'];
          this.marketService.pullBlobs(name, digest)
            .subscribe(data => data);
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
