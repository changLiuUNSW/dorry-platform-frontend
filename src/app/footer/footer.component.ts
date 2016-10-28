import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { VersionInfo } from './versionInfo';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  private footer: string = "";
  private versionInfo;
  private dorrywebVersion: string = "UI Version: v0.1.2-alpha";

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getVersionInfo();
  }

  getVersionInfo() {
    this.appService.getVersion()
      .then(data => this.versionInfo = data)
      .then(() => this.footer = "Docker API Version: " + this.versionInfo.ApiVersion + " " + this.dorrywebVersion);
  }

}
