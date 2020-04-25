import { Injectable } from '@angular/core';
import { User } from '../../data-structures/user';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ReplaySubject, Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly USER_STORE_KEY = 'user';
  private static readonly INFECTION_STATUS_KEY = 'infected';
  private static readonly DEV_KEY = 'dev';

  public DeveloperMode: boolean = true;

  private hasAcceptedAGBs: boolean = false;

  private infectionStatus = false;
  private $isUserDataEmpty = new ReplaySubject<boolean>(1);

  private userData: User;

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
    this.loadUser().then(
      data => {
        this.updateUserData(data);
      }
    );
  }

  private loadUser(): Promise<User> {
    return this.storage.get(UserService.USER_STORE_KEY);
  }

  private updateUserData(user: User): Promise<any> {
    this.userData = user;
    let isUserEmpty;
    if (this.isUserStored()) {
      isUserEmpty = this.isEmpty(user.firstName) && this.isEmpty(user.name) && this.isEmpty(user.phone) && this.isEmpty(user.city);
    } else {
      isUserEmpty = true;
    }
    this.$isUserDataEmpty.next(isUserEmpty);
    return this.storage.set(UserService.USER_STORE_KEY, user);
  }

  public deleteUser(): void {
    this.storage.remove(UserService.INFECTION_STATUS_KEY);
    this.storage.remove(UserService.DEV_KEY);
    this.storage.remove(UserService.USER_STORE_KEY);
    this.userData = undefined;
    this.$isUserDataEmpty.next(true);
  }

  public isUserStored(): boolean {
    if (this.userData) {
      return true;
    } else {
      return false;
    }
  }

  private isEmpty(value: string): boolean {
    if (!value) return true;
    return value.length === 0;
  }

  public isUserDataEmpty(): Observable<boolean> {
    return this.$isUserDataEmpty;
  }


  public getUser(): User {
    return this.userData;
  }

  public async setUser(user: User): Promise<any> {
    // TODO: Security and XSS Check
    return new Promise(
      (resolve, reject) => {
        if (this.validateUser(user)) {
          this.updateUserData(user)
            .then(
              () => resolve(),
              (err) => reject(err)
            );
        } else {
          reject();
        }
      }
    );
  }

  private validateUser(user: User): boolean {
    if (!user) {
      return true;
    }
    if (this.containsInvalidChars(user.city)) {
      return false;
    }
    if (this.containsInvalidChars(user.firstName)) {
      return false;
    }
    if (this.containsInvalidChars(user.name)) {
      return false;
    }
    return true;
  }

  private containsInvalidChars(val: string) {
    if (!val) {
      return false;
    }
    return val.match('[!@#$%^&*(),.?":{}|<>]');
  }


  public setInfectionStatus(value: boolean): void {
    this.infectionStatus = value;
    this.storage.set(UserService.INFECTION_STATUS_KEY, this.infectionStatus);

    if (this.infectionStatus && !this.DeveloperMode) {
      this.openInfectionWarning();
    }
  }

  public openInfectionWarning() {
    this.router.navigate(['/infection-warning']);
  }

  public isInfected(): boolean {
    return this.infectionStatus;
  }


  public getHasAcceptedAGBs(): boolean {
    return this.hasAcceptedAGBs;
  }
  
  public setHasAcceptedAGBs(value: boolean)  {
    this.hasAcceptedAGBs = value;
  }

  public loadDeveloperMode(): Promise<any> {
    return this.storage.get(UserService.DEV_KEY).then<any>(val => {
      this.DeveloperMode = val;
    });
  }

  public saveDeveloperMode(): Promise<any> {
    return this.storage.set(UserService.DEV_KEY, this.DeveloperMode);
  }

}
