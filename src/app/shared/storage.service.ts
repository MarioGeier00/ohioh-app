import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private storageFactory: Storage) {
    void this.init();
  }

  async init() {
    if (!this.storage) {
      this.storage = await this.storageFactory.create();
    }
  }

  async set(key: string, value: any) {
    await this.init();
    return await this.storage?.set(key, value);
  }

  async get(key: string) {
    await this.init();
    return await this.storage?.get(key);
  }

  async remove(key: string) {
    await this.init();
    return await this.storage.remove(key);
  }
}
