/* tslint:disable:no-unused-variable */
import {Http, ConnectionBackend, BaseRequestOptions, ResponseOptions, Response} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {TestBed, tick, fakeAsync, inject} from "@angular/core/testing";
import { ImagesComponent} from './images.component';
import { ImagesService } from './images.service';
import { ImageUrl } from './mock-images';


describe('Component: Images', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        ImagesService,
        MockBackend,
        BaseRequestOptions
      ]
    });

  });

  it('mock-images: hould mock-images construct successfully', () => {
    let imageUrl: ImageUrl;
    imageUrl = new ImageUrl("test", "/test/test");
    expect(imageUrl).toBeTruthy;
  })

  it('ImagesService: init images services successfully', inject([ImagesService], (imagesService: ImagesService) => {
    expect(imagesService).toBeTruthy();
  })
  );

  it('ImagesService: get images infoes successfully', inject([ImagesService], (imagesService: ImagesService) => {
    let info = imagesService.getImageInfoes();
    expect(info).toBeTruthy();
  })
  );

  it('ImagesService: remove image successfully', inject([ImagesService], (imagesService: ImagesService) => {
    let remove = imagesService.removeImage("test");
    expect(remove).toBeTruthy();
  })
  );

  it('ImagesService: inspect image successfully', inject([ImagesService], (imagesService: ImagesService) => {
    let inspect = imagesService.inspectImage("test");
    expect(inspect).toBeTruthy();
  })
  );

  it('ImagesService: create container successfully', inject([ImagesService], (imagesService: ImagesService) => {
    let create = imagesService.createContainer("test");
    expect(create).toBeTruthy();
  })
  );

  it('ImagesService: start container successfully', inject([ImagesService], (imagesService: ImagesService) => {
    let start = imagesService.startContainer("test");
    expect(start).toBeTruthy();
  })
  );

});
