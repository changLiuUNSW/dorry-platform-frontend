/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('Component: Navbar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent
      ],
    });
  });

  it('should create navbar', () => {
    let fixture = TestBed.createComponent(NavbarComponent);
    let navbar = fixture.componentInstance;
    expect(navbar).toBeTruthy();
  });
});
