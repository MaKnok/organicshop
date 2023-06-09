import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { Observable, tap } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  private API: string = environment.apiURL;

  getAll() {
    return this.http.get<User[]>(this.API + '/users');
  }

  getByUserName(userName: string): Observable<User[]> {
    //change to HttpResponse
    const params = new HttpParams().append('userName', userName);
    return this.http
      .get<User[]>(
        this.API + '/users',
        { params }
        //include {observe: 'response'}
      )
      .pipe(
        tap(() => {
          const authToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs';
          this.userService.saveToken(authToken);
          //(res)=>{const authToken = res.header.get('x-access-token') ?? ''}
        })
      );
  }

  registerUser(newUserData: User) {
    return this.http.post<User>(this.API + '/users', newUserData);
  }

  updateUser(id: string, newUserData: any) {
    return this.http.put<User>(this.API + '/users/' + id, newUserData);
  }
}
