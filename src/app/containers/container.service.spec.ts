/* tslint:disable:no-unused-variable */

import {Http, ConnectionBackend, BaseRequestOptions, ResponseOptions, Response} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {TestBed, tick, fakeAsync, inject} from "@angular/core/testing";

import {ContainerService} from "./container.service";

describe('Service: Container', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        ContainerService,
        MockBackend,
        BaseRequestOptions
      ]
    });

  });


  it('ContainerService: init container services successfully', inject([ContainerService], (containerService: ContainerService) => {
    expect(containerService).toBeTruthy();
  })
  );

  it('ContainerService: get running containers successfully', inject([ContainerService], (containerService: ContainerService) => {
    let runningContainers = containerService.getRunningContainers();
    expect(runningContainers).toBeTruthy();
  })
  );

  it('ContainerService: get stopped containers successfully', inject([ContainerService], (containerService: ContainerService) => {
    let stoppedContainers = containerService.getStoppedContainers();
    expect(stoppedContainers).toBeTruthy();
  })
  );

  it('ContainerService: get error containers successfully', inject([ContainerService], (containerService: ContainerService) => {
    let errorContainers = containerService.getErrorContainers();
    expect(errorContainers).toBeTruthy();
  })
  );

  it('ContainerService: get all containers successfully', inject([ContainerService], (containerService: ContainerService) => {
    let allContainers = containerService.getAllContainers();
    expect(allContainers).toBeTruthy();
  })
  );

  it('ContainerService: remove container successfully', inject([ContainerService], (containerService: ContainerService) => {
    let remove = containerService.removeContainer("test");
    expect(remove).toBeTruthy();
  })
  );

  it('ContainerService: stop container successfully', inject([ContainerService], (containerService: ContainerService) => {
    let stop = containerService.stopContainer("test");
    expect(stop).toBeTruthy();
  })
  );

  it('ContainerService: restart container successfully', inject([ContainerService], (containerService: ContainerService) => {
    let restart = containerService.restartContainer("test");
    expect(restart).toBeTruthy();
  })
  );

  it('ImagesService: get restart status successfully /if success',
    inject([ContainerService], (containerService: ContainerService) => {
      let res;
      res = new Response(new ResponseOptions({
        body: { "message": "test" }
      }));
      let spy = spyOn(containerService, "getRestartStatus").and.callThrough();
      containerService.getRestartStatus(res);
      expect(containerService.getRestartStatus).toHaveBeenCalled();
    }));

  it('ImagesService: get restart status successfully /if failed',
    inject([ContainerService], (containerService: ContainerService) => {
      let res;
      res = new Response(new ResponseOptions({
        body: { "message": "test" },
        status: 204
      }));
      let spy = spyOn(containerService, "getRestartStatus").and.callThrough();
      let tip = containerService.getRestartStatus(res);
      expect(containerService.getRestartStatus).toHaveBeenCalled();
      expect(tip).toBe("Restart Container successfully");
    }));

  it('ContainerService: extra data successfully',
    inject([ContainerService], (containerService: ContainerService) => {
      let res;
      res = new Response(new ResponseOptions({
        body: { "message": "test" },
        status: 200
      }));
      let spy = spyOn(containerService, "extractData").and.callThrough();
      containerService.extractData(res);
      expect(containerService.extractData).toHaveBeenCalled();
    }));
  // it('ContainerService: get container status successfully', inject([ContainerService], (containerService: ContainerService) => {
  //   let restartStatus = containerService.getRestartStatus(null);
  //   expect(restartStatus).toBeTruthy();
  // })
  // );
});
