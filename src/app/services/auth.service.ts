import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {
  }

  registerUser(user) {
    return this.http.post('http://localhost:3000/users/register', user);
  }

  authenticateUser(user) {
    return this.http.post('http://localhost:3000/users/authenticate', user);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }


  isTokenExpired(token?: string): boolean {
    this.loadToken();
    if (!token) {
      token = this.authToken;
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }


  isLoggedIn() {
    return this.isTokenExpired();
  }

  logOut() {
    this.authToken = null;
    this.user = null;

    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  // We loadToken for getProfile()
  getProfile() {
    this.loadToken();
    const header = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get('http://localhost:3000/users/profile', {headers: header});
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
