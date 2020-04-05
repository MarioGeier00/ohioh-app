import { Injectable } from '@angular/core';
import { User } from '../../data-structures/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage: Storage) { }

  public updateUserData(user: User) {
    console.log(user);
    this.storage.set('user', JSON.stringify(user));
  }

  public getUser(): User {
    const jsonData = this.storage.getItem('user');
    if (!jsonData) {
      return undefined;
    }
    const user: User = JSON.parse(jsonData);
    return user;
  }

}
