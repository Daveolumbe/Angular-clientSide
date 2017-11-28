import {Injectable} from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() {
  }

  validateRegister(user) {
    if (user.name == undefined
      || user.email == undefined
      || user.username == undefined
      || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const regrex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regrex.test(email);
  }
}
