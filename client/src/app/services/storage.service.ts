import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage;

  constructor() {
    this._storage = new Storage();
    this.init();
  }

  public async init() {
    this._storage = await this._storage.create();
  }

  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  public async get(key: string) {
    const value = await this._storage?.get(key);
    return value;
  }

  public async remove(key: string) {
    await this._storage.remove(key);
  }

  public async clear() {
    await this._storage.clear();
  }

}
