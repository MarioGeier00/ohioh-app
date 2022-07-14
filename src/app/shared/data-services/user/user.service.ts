import {Injectable} from '@angular/core';
import {User} from '../../data-structures/user';
import {Router} from '@angular/router';
import {Observable, ReplaySubject} from 'rxjs';
import {StorageService} from '../../storage.service';

const USER_STORE_KEY = 'user';
const INFECTION_STATUS_KEY = 'infected';
const DEV_KEY = 'dev';
const DEBUG_KEY = 'debug';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  developerMode = true;
  debugMode = true;

  private hasAcceptedAGBs = false;

  private infectionStatus = false;
  private $isUserDataEmpty = new ReplaySubject<boolean>(1);

  private userData: User;

  constructor(
    private storage: StorageService,
    private router: Router,
  ) {
    this.storage.get(INFECTION_STATUS_KEY).then(status => {
        if (status !== undefined) {
          this.setInfectionStatus(status);
        }
      });
    this.loadUser()?.then(
      data => {
        this.updateUserData(data);
      }
    );
  }

  private static isEmpty(value: string): boolean {
    if (!value) {
      return true;
    }
    return value.length === 0;
  }

  private static containsInvalidChars(val: string) {
    if (!val) {
      return false;
    }
    return val.match('[!@#$%^&*(),.?":{}|<>]');
  }

  private static validateUser(user: User): boolean {
    if (!user) {
      return true;
    }
    if (UserService.containsInvalidChars(user.city)) {
      return false;
    }
    if (UserService.containsInvalidChars(user.firstName)) {
      return false;
    }
    if (UserService.containsInvalidChars(user.lastName)) {
      return false;
    }
    return true;
  }


  deleteUser() {
    void this.storage.remove(INFECTION_STATUS_KEY);
    void this.storage.remove(DEV_KEY);
    void this.storage.remove(USER_STORE_KEY);
    this.userData = undefined;
    this.$isUserDataEmpty.next(true);
  }

  isUserStored(): boolean {
    return !!this.userData;
  }


  isUserDataEmpty(): Observable<boolean> {
    return this.$isUserDataEmpty;
  }

  getUser(): User {
    return this.userData;
  }

  async setUser(user: User) {
    // TODO: Security and XSS Check
    return new Promise<void>(
      (resolve, reject) => {
        if (UserService.validateUser(user)) {
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


  setInfectionStatus(value: boolean): void {
    this.infectionStatus = value;
    this.storage.set(INFECTION_STATUS_KEY, this.infectionStatus);

    if (this.infectionStatus && !this.developerMode) {
      this.openInfectionWarning();
    }
  }

  openInfectionWarning() {
    this.router.navigate(['/infection-warning']);
  }

  isInfected(): boolean {
    return this.infectionStatus;
  }


  getHasAcceptedAGBs(): boolean {
    return this.hasAcceptedAGBs;
  }

  setHasAcceptedAGBs(value: boolean) {
    this.hasAcceptedAGBs = value;
  }

  loadDeveloperMode(): Promise<any> {
    return this.storage.get(DEV_KEY).then(val => {
      this.developerMode = val;
    });
  }

  loadDebugMode(): Promise<any> {
    return this.storage.get(DEBUG_KEY).then(val => {
      this.debugMode = val;
    });
  }

  saveDeveloperMode(): Promise<any> {
    return this.storage.set(DEV_KEY, this.developerMode);
  }

  saveDebugMode(): Promise<any> {
    return this.storage.set(DEBUG_KEY, this.debugMode);
  }


  private loadUser(): Promise<User> {
    return this.storage.get(USER_STORE_KEY);
  }

  private updateUserData(user: User): Promise<any> {
    this.userData = user;
    let isUserEmpty;
    if (this.isUserStored()) {
      isUserEmpty = UserService.isEmpty(user.firstName) &&
        UserService.isEmpty(user.lastName) &&
        UserService.isEmpty(user.phone) &&
        UserService.isEmpty(user.city);
    } else {
      isUserEmpty = true;
    }
    this.$isUserDataEmpty.next(isUserEmpty);
    return this.storage.set(USER_STORE_KEY, user);
  }

}
