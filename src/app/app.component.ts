import { Component } from '@angular/core';
import { ConfigService } from './config.service';
import { ConfigObject } from './configObject';
import { Constant } from './constant';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private configService: ConfigService) { }

  ngOnInit() {
  }
}
