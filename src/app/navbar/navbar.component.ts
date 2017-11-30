import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages/module/flash-messages.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) {
  }

  ngOnInit() {
  }

  logOutClick() {
    this.authService.logOut();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert alert-success',
      timeOut: 30000
    });
    this.router.navigate(['/login']);
    return false;
  }

}
