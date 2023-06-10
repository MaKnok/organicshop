import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private API: string = environment.apiURL;

  getAll() {
    return this.http.get<User[]>(this.API + '/users');
  }

  getByUserName(userName: string): Observable<User[]> {
    const params = new HttpParams().append('userName', userName);
    return this.http.get<User[]>(this.API + '/users', { params });
  }

  registerUser(newUserData: User) {
    return this.http.post<User>(this.API + '/users', newUserData);
  }

  updateUser(id: string, newUserData: any) {
    return this.http.put<User>(this.API + '/users/' + id, newUserData);
  }
}
