import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  user: string;
  password: string;
  userData: User[];
  validationMessage: string;

  subscription: Subscription;

  ngOnInit(): void {}

  enterLogin() {
    this.subscription = this.loginService
      .authenticate(this.user, this.password)
      .subscribe({
        next: (res) => {
          this.userData = res;
          console.log(this.userData);
          console.log(this.user, this.password);
          if (this.userData.length == 0) {
            this.validationMessage = 'Usuário não existe. Cadastre o usuário!';
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
            this.subscription.unsubscribe();
            console.log('unsubscribe done!');
          } else {
            this.validationMessage = 'Senha invalida!';
            return;
          }
        },
        error: (error) => {
          this.validationMessage = 'Usuário e/ou senha inválidos';
          console.log(error);
          console.log(this.validationMessage);
          this.clearFields();
        },
        complete: () => console.info('Login completed!'),
      });
  }

  clearValidationMessage() {
    this.validationMessage = '';
  }

  clearFields() {
    this.user = '';
    this.password = '';
  }

  /*ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('unsubscribe done!');
  }*/
}
