import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  Username = new FormControl();
  Password = new FormControl();

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      'Username': this.Username,
      'Password': this.Password
    });
  }

  ngOnInit() {
  }

}
