import { HttpClient, HttpParams } from '@angular/common/http';
import { TokenService } from './../token.service';
import { environment } from 'src/environments/environment.prod';
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
  private userData: any[] = []; 

  constructor(private tokenService: TokenService, private http: HttpClient) {
    if (this.tokenService.hasToken()) {
      this.decodeJWT();
    }
  }

  private API: string = environment.apiURL;

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

  saveUserData(userData: any) {
    this.userData.push(userData);
  }

  returnUserData():any {
    return this.userData; 
  }

  logout(token: string) {
    this.tokenService.deleteToken();
    this.userSubject.next({});
    this.userData = [];
    return this.http.post(`${this.API}/users/logout`, { token });
  }

  isLoggedIn() {
    return this.tokenService.hasToken();
  }
}
