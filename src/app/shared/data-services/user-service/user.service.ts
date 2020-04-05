import { Injectable } from '@angular/core';
import { User } from '../../data-structures/user';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly USER_STORE_KEY = 'user';

  constructor(private storage: Storage) { }

  public updateUserData(user: User): void {
    this.storage.set(UserService.USER_STORE_KEY, user);
  }

  public getUser(): Promise<User> {
    return this.storage.get(UserService.USER_STORE_KEY);
  }

  public deleteUser(): void {
    this.storage.remove(UserService.USER_STORE_KEY);
  }

  public isUserStored(): Promise<boolean> {
    return this.getUser().then<boolean>(user => {
      if (user) return true;
      return false;
    });
  }

}
