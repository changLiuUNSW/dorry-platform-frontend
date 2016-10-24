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
    this.dorryBtn = dorryBtn;
  }

  onSelect(btn: NavbarBtn) {
    this.resetBtn();
    if (!btn.isClicked) {
      btn.isClicked = true;
      this.changeBtn(btn);
    }
    else if (btn.isClicked) {
      btn.isClicked = false;
      this.changeBtn(btn);
    }
  }

  changeBtn(btn: NavbarBtn) {
    if (!btn.isClicked) {
      btn.out = btn.img;
    }
    else if (btn.isClicked) {
      btn.out = btn.clickedImg;
    }
  }

  resetBtn() {
    for (let btn of this.btnlist) {
      btn.out = btn.img;
      btn.isClicked = false;
    }
  }
}
const dorryBtn: NavbarBtn = { name: "dorry", out: "assets/logo.png", img: "assets/logo.png", clickedImg: "assets/logo.png", url: "/", isClicked: false };
const BTNLIST: NavbarBtn[] = [
  // { name: "dorry", out: "assets/logo.png", img: "assets/logo.png", clickedImg: "assets/logo.png", url: "/", isClicked: false },
  { name: "services", out: "assets/containers-1.png", img: "assets/containers.png", clickedImg: "assets/containers-1.png", url: "/services", isClicked: false },
  { name: "apps", out: "assets/apps.png", img: "assets/apps.png", clickedImg: "assets/apps-1.png", url: "/apps", isClicked: false },
];
