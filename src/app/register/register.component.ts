import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages/module/flash-messages.service';

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

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) {
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

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Invalid email please try again', {cssClass: 'alert alert-danger', timeout: 3000});
      return false;
    }

    console.log(user);
  }

}
