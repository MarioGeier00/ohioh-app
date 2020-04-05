import { Injectable } from '@angular/core';
import { User } from '../../data-structures/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public updateUserData(user: User) {
    console.log(user);
    
  }

}
