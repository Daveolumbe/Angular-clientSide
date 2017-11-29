import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages/module/flash-messages.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  confirm: Boolean;
  errror: String;
  mydata: any;

  constructor(private validateService: ValidateService,
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private route: Router) {
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      confirm: this.confirm
    };

    // require fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert alert-danger', timeout: 3000});
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Invalid email please try again', {cssClass: 'alert alert-danger', timeout: 3000});
      return false;
    }

    // register user
    const mydata = this.authService.registerUser(user);

    if (mydata) {
      this.flashMessage.show('Our data is fine', {cssClass: 'alert alert-primary', timeout: 3000});
      this.route.navigate(['/login']);
    } else {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert alert-danger', timeout: 3000});
      this.route.navigate(['/login']);
    }

  }

}
