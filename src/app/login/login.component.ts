import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages/module/flash-messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
  }

  onLoginSubmit() {

    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Welcome to visilinx dashboard', {cssClass: 'alert alert-primary', timeout: 3000});
//        this.router.navigate(['/home']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert alert-danger', timeout: 3000});
      }
    });
  }

}
