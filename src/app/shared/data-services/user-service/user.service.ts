import { Injectable } from '@angular/core';
import { User } from '../../data-structures/user';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly USER_STORE_KEY = 'user';
  private static readonly INFECTION_STATUS_KEY = 'infected';


  public DeveloperMode: boolean = true;

  private infectionStatus = false;


  constructor(
    private storage: Storage,
    private router: Router
  ) {
    this.storage.get(UserService.INFECTION_STATUS_KEY)
      .then(status => {
        if (status !== undefined) {
          this.setInfectionStatus(status);
        }
      });
  }


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


  public isInfected(): boolean {
    return this.infectionStatus;
  }

  public setInfectionStatus(value: boolean): void {
    this.infectionStatus = value;
    this.storage.set(UserService.INFECTION_STATUS_KEY, this.infectionStatus);

    if (this.infectionStatus) {
      this.openInfectionWarning();
    }
  }

  public openInfectionWarning() {
    this.router.navigate(['/infection-warning']);
  }

}
