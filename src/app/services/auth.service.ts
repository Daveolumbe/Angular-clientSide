import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post('http://localhost:3000/users/register', user).subscribe(data => {
      console.log(data);
    });
  }
}
