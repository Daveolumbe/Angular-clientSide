import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

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
