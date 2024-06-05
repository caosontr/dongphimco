import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/User';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userURL = 'https://json-server-q4dz.onrender.com';

  constructor(private http: HttpClient) { }

  registerUser(userDetails: User) {
    return this.http.post(`${this.userURL}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.userURL}/users?email=${email}`);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.getUserByEmail(email).pipe(
      map(users => users.length > 0)
    );
  }
  
}
