import { Injectable } from '@angular/core';
import { User } from '../../data-structures/user';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storage: Storage) { }

  public updateUserData(user: User) {
    this.storage.set('user', user);
  }

  public getUser(): Promise<User> {
    return this.storage.get('user');
  }

}
