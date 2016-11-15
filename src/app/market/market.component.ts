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

  //intall image from private docker registry
  //getTags  +  pullImage
  private installImage(name: string) {
    // this.item.installing = true;
    console.log(this.item);

    this.marketService.getTags(name)
      .subscribe(data => {
        console.log(data.name);
        console.log(data.tags[0]);
        this.marketService.pullImage(data.name, data.tags[0])
          .subscribe(data => {
            // this.item.installing = false;
          });
      })
  }

  /***************************************************************************/

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

  private delManifest(name: string, ref: string) {
    this.marketService.delManifest(name, ref)
      .subscribe(data => console.log(data));
  }

  private delBlobs(name: string, ref: string) {
    this.marketService.pullManifest(name, ref)
      .subscribe(data => {
        for (var key in data['fsLayers']) {
          var digest;
          console.log(data['fsLayers'][key]['blobSum']);
          digest = data['fsLayers'][key]['blobSum'];
          this.marketService.delBlobs(name, digest)
            .subscribe(data => data);
        }
      });
  }

  /***************************************************************************/

  private getItem(item: Item) {
    this.item = item;
  }

  private toggleDetail() {
    this.showDetail = !this.showDetail;
  }

}
