import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from './new-user';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class NewUserService {
  constructor(private http: HttpClient) {}

  registerNewUser(newUser: NewUser) {
    return this.http.post(`${API}/users`, newUser);
  }

  verifyExistingUser(userName: string) {
    return this.http.get(`${API}/users` + '?userName=' + userName);
  }
}
