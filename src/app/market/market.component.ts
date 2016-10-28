import { Component, OnInit } from '@angular/core';
import { MarketService } from './market.service';
import { Item, Repo } from './market';

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

  constructor(private marketService: MarketService) { }

  ngOnInit() {
    this.listRepo();
  }

  private listRepo() {
    this.marketService.listRepo()
      .subscribe(data => {
        this.repo = data;
        console.log('...Function listReop() is called...' + '\n' + this.repo);
      });
  }

}
