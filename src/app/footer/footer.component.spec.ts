import { TestBed, ComponentFixture, tick, fakeAsync, inject } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { AppService } from '../app.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';


let fixture: ComponentFixture<FooterComponent>;
let comp: FooterComponent;

let testVersion: string;

describe('Component: Footer', () => {
  let apiVersion: "1.1.1"
  let appService: AppService;

  // beforeEach(() => {
  //   appService = {
  //     ApiVersion: jasmine.createSpy("getVersion").and.returnValue(Observable.of(apiVersion))
  //   }
  //   TestBed.configureTestingModule({
  //     declarations: [
  //       HomeComponent
  //     ],
  //     providers: [
  //       { provide: AppService, useValue: appService }
  //     ]
  //   });
  //   // TestBed.configureTestingModule({
  //   //   declarations: [FooterComponent],
  //   //   providers: [
  //   //     AppService,
  //   //     BaseRequestOptions,
  //   //     MockBackend,
  //   //     {
  //   //       provide: Http,
  //   //       useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
  //   //         return new Http(backend, defaultOptions);
  //   //       },
  //   //       deps: [MockBackend, BaseRequestOptions],
  //   //     },
  //   //   ],
  //   // });
  //
  // });

  // it('app service getVersion successfully', inject([AppService, MockBackend], fakeAsync((appService: AppService) => {
  //   mockBackend.connections.subscribe(c => {
  //     expect(c.request.url).toBe("/version");
  //     c.mockRespond(new Response(new ResponseOptions(mockResponseBody)));
  //   });
  //   appService.getVersion.subscribe(data => {
  //     response = data;
  //   });
  //   tick();
  //   expect(response).toBeTruthy();
  //   console.log(response);
  // })));

  // it("can initialize", async(() => {
  //   TestBed.compileComponents().then(() => {
  //     const fixture = TestBed.createComponent(FooterComponent);
  //     let element = fixture.nativeElement;
  //     let component = fixture.componentInstance;
  //
  //     fixture.detectChanges();
  //
  //     expect(element).not.toBeNull();
  //     expect(component).not.toBeNull();
  //
  //     expect(appService.getVersion()).toHaveBeenCalled();
  //   });
  // }));

  // it('should create an instance', () => {
  //   fixture = TestBed.createComponent(FooterComponent);
  //   comp = fixture.componentInstance;
  //   expect(comp).toBeTruthy();
  // });
  //
  // it('should init successfully', () => {
  //   fixture = TestBed.createComponent(FooterComponent);
  //   comp = fixture.componentInstance;
  //   console.log(comp);
  //   expect(comp.ngOnInit()).toBeTruthy();
  // });

  // it('should getVersion successfully', inject([AppService], (appService: AppService) => {
  //   footerComponent: FooterComponent = new FooterComponent(appService);
  //   // fixture = TestBed.createComponent(FooterComponent);
  //   // comp = fixture.componentInstance;
  //   // //expect(comp.getVersionInfo()).toBeTruthy();
  //   // comp.getVersionInfo();
  //   // let apiVersion = comp.getApiVersion();
  //   // let uiVersion = comp.getUiVersion();
  //   //
  //   // expect(apiVersion).toEqual("1.24");
  //   // expect(uiVersion).toEqual("v0.1.7-alpha");
  //   expect(footerComponent.getVersion).toBe(true, 'getVersion called');
  //
  // });

});
