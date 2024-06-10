import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/User';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private userURL = 'https://json-server-q4dz.onrender.com';
  private userURL = 'http://localhost:3000';
  private getuserURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<User[]>(this.getuserURL);
  }
  getUser(id: string) {
    return this.http.get<User>(`${this.getuserURL}/${id}`);
  }
  registerUser(userDetails: User) {
    return this.http.post(`${this.userURL}/register`, userDetails);
  }
  loginUser(userDetails: User) {
    return this.http.post(`${this.userURL}/login`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.userURL}/users?email=${email}`);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.getUserByEmail(email).pipe(map((users) => users.length > 0));
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.getuserURL}/${id}`);
  }
}
