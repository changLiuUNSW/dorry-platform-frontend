import { TestBed } from '@angular/core/testing';
import { ImagesComponent } from './images.component';
import { ImagesService } from './images.service';
var fixture;
var comp;
describe('Component: Images', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            declarations: [ImagesComponent],
            providers: [ImagesService]
        });
        fixture = TestBed.createComponent(ImagesComponent);
        comp = fixture.componentInstance;
    });
});
//# sourceMappingURL=../../../../src/app/images/images.component.spec.js.map