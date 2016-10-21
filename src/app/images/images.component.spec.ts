/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ImagesComponent} from './images.component';
import { ImagesService } from './images.service';

let fixture: ComponentFixture<ImagesComponent>;
let comp: ImagesComponent;

describe('Component: Images', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesComponent],
      providers: [ImagesService]
    });

    fixture = TestBed.createComponent(ImagesComponent);
    comp = fixture.componentInstance;
  });

});
