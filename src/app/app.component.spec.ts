import { Http, ConnectionBackend, BaseRequestOptions, ResponseOptions, Response } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { TestBed, tick, fakeAsync, inject } from "@angular/core/testing";

import { AppService } from "./app.service";
import { Constant } from './constant';
import { AppComponent } from "./app.component";
import { ConfigService } from "./config.service";
import { ConfigObject } from "./configObject";

let mockConfigService = {
  "daemon_addr": "http://localhost:10000",
  "registry_proto": "https",
  "registry_host": "dorryServer:5000",
  "build_version": "v0.1.7-alpha"
}


describe('App: DorryWeb', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        AppService,
        MockBackend,
        BaseRequestOptions,
        ConfigService
      ]
    });

  });

  //app service
  it("AppService: call the get version url",
    inject([AppService, MockBackend], fakeAsync((appService: AppService, mockBackend: MockBackend) => {
      spyOn(appService, 'getVersion').and.callThrough();
      let version = appService.getVersion();
      //let version = appService.getVersion();
      console.log(version);
      expect(version).toBeTruthy();
    })
    ));

  it("AppService: extract data successfully",
    inject([AppService, MockBackend], fakeAsync((appService: AppService, mockBackend: MockBackend) => {
      let mockConnection: MockConnection;
      let res;
      res = new Response(new ResponseOptions({
        body: {},
        status: 404
      }));
      appService.extractData(res);
      expect(appService.handleError).toThrow();
    })));

  //app component
  // it("AppComponent: init app component successfully",
  //   inject([ConfigService], (loginDataService: LoginDataService, configService: ConfigService, toastr: ToastsManager, vRef: ViewContainerRef, router: Router) => {
  //     let appComponent: AppComponent;
  //     appComponent = new AppComponent(loginDataService, configService, toastr, vRef, router);
  //     let init = appComponent.ngOnInit();
  //     expect(appComponent.ngOnInit).toBeTruthy();
  //   })
  // );

  //config service
  it("ConfigService: config service load config file successfully", inject([ConfigService], (configService: ConfigService) => {
    configService.load().then((res) => {
      console.log(res);
    });
  }));

  it("Constant: init config successfully", () => {
    let configObject: ConfigObject;
    configObject = new ConfigObject("0.0.1", "https://deamonaddr", "registryhost", "http", "http://localhost:12000");
    Constant.initConfig(configObject);
    expect(Constant.DAEMONADDR).toBe("https://deamonaddr");
    expect(Constant.REGISTRYADDR).toBe("http://registryhost");
    expect(Constant.BUILDVERSION).toBe("0.0.1");
    expect(Constant.REGISTRYHOST).toBe("registryhost");
  });

});
;
