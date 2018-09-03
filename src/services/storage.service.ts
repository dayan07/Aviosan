import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {
  EMPLOYEE_ID = 'employee_id';
  AUTH_TOKEN = 'auth_token';

  constructor(private storage: Storage) { }

  saveToken(token: string) {
    this.storage.set(this.AUTH_TOKEN, token);
  }

  getToken(): Promise<string> {
    return this.storage.get(this.AUTH_TOKEN);
  }

  removeToken() {
    this.storage.remove(this.AUTH_TOKEN);
  }

  setEmployeeId(data: number): Promise<string> {
    return this.storage.set(this.EMPLOYEE_ID, data);
  }

  getEmployeeId(): Promise<number> {
    return this.storage.get(this.EMPLOYEE_ID);
  }

  deleteEmployeeId(): Promise<any> {
    return this.storage.remove(this.EMPLOYEE_ID);
  }

  saveData(key: string, data: string) {
    return this.storage.set(key, data);
  }

  getData(key: string) {
    return this.storage.get(key,);
  }

  removeData(key: string) {
    return this.storage.remove(key);
  }
}
