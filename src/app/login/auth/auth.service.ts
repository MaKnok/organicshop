import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${API}/users`);
  }

  getByUserName(userName: string) {
    return this.http.get(`${API}/users` + '?userName=' + userName);
  }

  registerUser(newUserData: any) {
    return this.http.post(`${API}/users`, newUserData);
  }

  updateUser(id: string, newUserData: any) {
    return this.http.put(`${API}/users` + '/' + id, newUserData);
  }
}
