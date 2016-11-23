/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { NavbarBtn } from './navbtn';

let navbar: NavbarComponent;

describe('Component: Navbar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent
      ],
    });

    navbar = new NavbarComponent();
  });

  it('should create navbar instance', () => {
    navbar = new NavbarComponent();
    expect(navbar).toBeTruthy();
  });

  it('should init navbar successfully', () => {
    let init: any;
    navbar.ngOnInit();
    expect(navbar.btnlist[0].isClicked).toBe(true);
  })

  it('shoud navbar on select successfully', () => {
    navbar = new NavbarComponent();
    navbar.ngOnInit();
    let navbtn: NavbarBtn;
    navbtn = new NavbarBtn("service", "", "asserts/containers.svg", "assets/containers-1.svg", "/services", false);
    navbar.onSelect(navbtn);
    expect(navbtn.isClicked).toBe(true);
  })
});
