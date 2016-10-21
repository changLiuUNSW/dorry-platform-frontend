import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('App: DorryWeb', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
        });
    });
    it('should create the app', async(function () {
        var fixture = TestBed.createComponent(AppComponent);
        var app = fixture.componentInstance;
        expect(app).toBeTruthy();
    }));
});
//# sourceMappingURL=../../../src/app/app.component.spec.js.map