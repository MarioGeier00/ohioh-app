import { Injectable } from '@angular/core';
import { User } from '../../data-structures/user';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public DeveloperMode: boolean;

  private static readonly USER_STORE_KEY = 'user';

  constructor(private storage: Storage) { }

  public updateUserData(user: User): Promise<any> {
    return this.storage.set(UserService.USER_STORE_KEY, user);
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

  private isEmpty(value: string): boolean {
    if (!value) return true;
    return value.length === 0;
  }

  public isUserDataEmpty(): Promise<boolean> {
    return this.getUser().then<boolean>(user => {
      return this.isEmpty(user.prename) && this.isEmpty(user.name) && this.isEmpty(user.phone) && this.isEmpty(user.residence);
    });
  }

}
