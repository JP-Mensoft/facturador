import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage;

  constructor() {
    this._storage = localStorage;
  }

  public set(key: string, value: any): void {
    this._storage.setItem(key, value);
  }

  public get(key: string): string {
    const value = this._storage.getItem(key);
    return value;
  }

  public remove(key: string): void {
    this._storage.removeItem(key);
  }

  public clear(): void {
    this._storage.clear();
  }

}
