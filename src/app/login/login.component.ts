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
        console.log(this.user);
        console.log(this.password);
        if (this.userData.length == 0) {
          this.validationMessage = 'Usuário e/ou senha inválidos';
          console.log(this.validationMessage);
          this.clearFields();
          return;
        } else if (
          this.userData[0].userName === this.user &&
          this.userData[0].userPassword === this.password
        ) {
          this.router.navigate(['/home']);
          this.clearValidationMessage();
          this.clearFields();
        }
      },
      (error) => {
        this.validationMessage = 'Usuário e/ou senha inválidos';
        console.log(error);
        console.log(this.validationMessage);
        this.clearFields();
      }
    );
  }

  clearValidationMessage() {
    this.validationMessage = '';
  }

  clearFields() {
    this.user = '';
    this.password = '';
  }
}
