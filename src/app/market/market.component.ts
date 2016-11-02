import { Component, OnInit } from '@angular/core';
import { MarketService } from './market.service';
import { Item, Repo } from './market';

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
  repo: Repo;
  item: Item;
  items = MOCK_ITEMS;
  showDetail: boolean;

  constructor(private marketService: MarketService) { }

  ngOnInit() {
    this.listRepo();
    this.showDetail = false;
  }

  private listRepo() {
    this.marketService.listRepo()
      .subscribe(data => {
        this.repo = data;
        console.log('...Function listReop() is called...' + '\n' + this.repo);
      });
  }

  private getItem(item: Item) {
    this.item = item;
  }

  private toggleDetail() {
    this.showDetail = !this.showDetail;
  }

}
