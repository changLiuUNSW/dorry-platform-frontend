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
  private uiVersion: string = Constant.BUILDVERSION;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getVersionInfo();
  }

  getVersionInfo() {
    this.appService.getVersion()
      .then(data => this.versionInfo = data)
      .then(() => this.apiVersion = this.versionInfo.ApiVersion);
  }
}
