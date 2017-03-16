import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { LoginDataService } from './logindata.service';
import { ActivatedRoute } from '@angular/router';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// LoginComponent
//
// Show user login page
//
export class LoginComponent implements OnInit {

  form: FormGroup;
  //Username input form
  Username = new FormControl();
  //Password input form
  Password = new FormControl();

  constructor(private loginDataService: LoginDataService, private loginService: LoginService, private fb: FormBuilder, private ar: ActivatedRoute,
    private router: Router, public toastr: ToastsManager) {

    this.form = fb.group({
      'Username': this.Username,
      'Password': this.Password
    });
  }

  ngOnInit() {
  }

  // Function: login
  //
  // Send login body to login service
  login() {
    this.loginService.login(this.form['_value'].Username, this.form['_value'].Password)
      .subscribe(data => {
        // return success from api
        if (data.returncode == 200) {
          localStorage.setItem('currentUser', JSON.stringify({ name: this.form['_value'].Username }));
          this.loginDataService.callComponentMethod();
          this.ar.queryParams.subscribe(
            data => {
              // Get return url and redirect to the url
              var returnUrl = data['returnUrl'];
              console.log(returnUrl);
              this.router.navigate([returnUrl]);
            }
          );
        }
      },
      err => this.toastr.error("Incorrect username or password.", 'ERROR', { toastLife: 5000 }));
  }
}
