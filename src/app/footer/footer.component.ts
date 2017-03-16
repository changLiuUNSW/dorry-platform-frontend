import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Constant } from '../constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

// FooterComponent
// Show navbar footer
// Including:
// Frontend version
// Backend version
export class FooterComponent implements OnInit {
  private frontendVersion: string;
  private backendVersion: string;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.frontendVersion = Constant.FRONTEND_VERSION;
    this.backendVersion = Constant.BACKEND_VERSION;
  }

  //get dorry platform backend version
  getBackendVersion() {
    return this.backendVersion;
  }

  //get dorry platform frontend version
  getFrontendVersion() {
    return this.frontendVersion;
  }
}
