/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApplicationsService } from './applications.service';

describe('ApplicationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationsService]
    });
  });

  it('should ...', inject([ApplicationsService], (service: ApplicationsService) => {
    expect(service).toBeTruthy();
  }));
});
