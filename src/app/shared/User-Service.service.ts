import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './User.Model';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url+'?page={page}').pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }
  fetchUser(userId: number) {
    return this.http.get<User>(this.url + '/' + userId).pipe(
      map((users) => {
        return users;
      }),
      catchError((error) => {
        console.error(
          'Error fetching user: ',
          error + ' with id : ' + userId
        );
        return throwError(() => {
          const newError = new Error(
            'Error fetching user:' + error + ' with id : ' + userId
          );
          return newError;
        });
      })
    );
  }
}
