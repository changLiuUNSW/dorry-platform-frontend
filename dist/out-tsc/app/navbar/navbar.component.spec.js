import { TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
describe('Component: Navbar', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            declarations: [
                NavbarComponent
            ],
        });
    });
    it('should create navbar', function () {
        var fixture = TestBed.createComponent(NavbarComponent);
        var navbar = fixture.componentInstance;
        expect(navbar).toBeTruthy();
    });
});
//# sourceMappingURL=../../../../src/app/navbar/navbar.component.spec.js.map