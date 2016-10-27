import { Component, OnInit } from '@angular/core';
import { NavbarBtn } from './navbtn';
import { MastheadComponent } from '../masthead/masthead.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  btnlist: NavbarBtn[];
  dorryBtn: NavbarBtn;

  constructor() { }

  ngOnInit() {
    this.btnlist = BTNLIST;
    this.btnlist[0].isClicked = true;
    for (let btn of this.btnlist) {
      btn.out = btn.isClicked ? btn.clickedImg : btn.img;
    }
  }

  onSelect(btn: NavbarBtn) {
    for (let btn of this.btnlist) {
      btn.out = btn.img;
      btn.isClicked = false;
    }
    btn.isClicked = !btn.isClicked ? true : false;
    btn.out = btn.isClicked ? btn.clickedImg : btn.img;
  }

}

const BTNLIST: NavbarBtn[] = [
  { name: "services", out: "", img: "assets/containers.svg", clickedImg: "assets/containers-1.svg", url: "/services", isClicked: false },
  { name: "apps", out: "", img: "assets/apps.svg", clickedImg: "assets/apps-1.svg", url: "/apps", isClicked: false },
];
