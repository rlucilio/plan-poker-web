import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage = window.localStorage;
  constructor() { }

  setValue(key: string, value: any) {
    if (!value || !key) {
      throw new Error('Params invalid');
    }

    this.storage.setItem(key, value);
  }

  setObject(key: string, value: any) {
    if (!value || !key) {
      throw new Error('Params invalid');
    }

    this.storage.setItem(key, JSON.stringify(value));
  }

  getObject<T extends object>(key: string): T {
    if (!key) {
      throw new Error('key invalid');
    }

    return JSON.parse(this.storage.getItem(key));
  }

  getValue(key: string): string{
    if (!key) {
      throw new Error('key invalid');
    }

    return this.storage.getItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
