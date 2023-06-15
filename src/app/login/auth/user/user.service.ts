import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import { AuthUser } from './auth-user';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //observable which stores the last state
  private userSubject = new BehaviorSubject<AuthUser>({});

  constructor(private tokenService: TokenService) {
    if (this.tokenService.hasToken()) {
      this.decodeJWT();
    }
  }

  private decodeJWT() {
    const token = this.tokenService.returnsToken();
    const user = jwt_decode(token) as AuthUser;
    this.userSubject.next(user);
  }

  returnsUser() {
    return this.userSubject.asObservable();
  }

  saveToken(token: string) {
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }

  logout() {
    this.tokenService.deleteToken();
    this.userSubject.next({});
  }

  isLoggedIn() {
    return this.tokenService.hasToken();
  }
}
