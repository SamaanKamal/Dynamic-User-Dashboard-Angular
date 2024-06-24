import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './User.Model';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'https://reqres.in/api/users';
  private userSubject = new BehaviorSubject<any>(null); // Use BehaviorSubject for initial empty value

  getUser() {
    this.userSubject.asObservable();
  }
  
  setUser(user: any) {
    this.userSubject.next(user);
  }

  constructor(private http: HttpClient) {}

  fetchUsers(pageNumber: number): Observable<any> {
    return this.http.get<any>(this.url + `?page=${pageNumber}`).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }
  fetchUser(userId: number): Observable<any> {
    return this.http.get<any>(this.url + '/' + userId).pipe(
      map((user) => {
        return user;
      }),
      catchError((error) => {
        console.error('Error fetching user: ', error + ' with id : ' + userId);
        return throwError(() => {
          const newError = new Error(
            'Error fetching user: it maybe there is no user' +
              ' with id : ' +
              userId
          );
          return newError;
        });
      })
    );
  }
}
