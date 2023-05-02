import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  user: string;
  password: string;
  userData: any;
  validationMessage: string;

  ngOnInit(): void {}

  enterLogin() {
    this.loginService.authenticate(this.user, this.password).subscribe(
      (res) => {
        this.userData = res;
        console.log(this.userData);
        this.router.navigate(['/home']);
      },
      (error) => {
        alert('User or password is invalid');
        console.log(error);
      }
    );
    this.clearFields();
  }

  clearFields() {
    this.user = '';
    this.password = '';
  }
}
