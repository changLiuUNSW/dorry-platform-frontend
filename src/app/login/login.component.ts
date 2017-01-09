import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ActivatedRoute } from '@angular/router';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  Username = new FormControl();
  Password = new FormControl();

  constructor(private loginService: LoginService, private fb: FormBuilder, private ar: ActivatedRoute,
    private router: Router, public toastr: ToastsManager) {

    this.form = fb.group({
      'Username': this.Username,
      'Password': this.Password
    });
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.form._value.Username, this.form._value.Password)
      .subscribe(data => {
        if (data.status == 200) {
          localStorage.setItem('currentUser', JSON.stringify({ name: this.form._value.Username }));
          this.ar.queryParams.subscribe(
            data => {
              var returnUrl = data['returnUrl'];
              console.log(returnUrl);
              this.router.navigate([returnUrl]);
            }
          );
        }
      },
      err => this.toastr.error("Incorrect username or password.", 'ERROR', { toastLife: 3000 }));
  }

  checkSession() {
    this.loginService.checkSession()
      .subscribe(data => {
        console.log(data);
      })
  }

}
