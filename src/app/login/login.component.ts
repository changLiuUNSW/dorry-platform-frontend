import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  Username = new FormControl();
  Password = new FormControl();

  constructor(private loginService: LoginService, private fb: FormBuilder) {
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
        console.log(data);
      })
  }

}
