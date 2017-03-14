import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { VersionInfo } from './versionInfo';
import { Constant } from '../constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private versionInfo;
  private apiVersion = "";
  private uiVersion: string;
  private marketUrl;

  constructor(private appService: AppService) { }

  ngOnInit() {
    //this.getVersionInfo();
    this.uiVersion = Constant.BUILDVERSION;
    this.getMarketUrl();
  }

  getVersionInfo() {
    this.appService.getVersion()
      .then(data => this.versionInfo = data)
      .then(() => {
        this.apiVersion = this.versionInfo.ApiVersion
        this.uiVersion = Constant.BUILDVERSION;
      });
  }

  getApiVersion() {
    return this.apiVersion;
  }

  getUiVersion() {
    return this.uiVersion;
  }

  getMarketUrl() {
    this.appService.getMarketUrl().subscribe(data => this.marketUrl = data);
  }
}
