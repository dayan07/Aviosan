import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {CustomHttpService} from './custom-http.service';
import {Environment} from '../environments/environments';
import {Client} from "../entities/client";
import {BehaviorSubject} from "rxjs";


@Injectable()
export class AuthService {
  private token: string;
  private fetchingTokenFromDB: boolean = false;
  public authBehaviorSubject: BehaviorSubject<boolean>;


  constructor(private storageService: StorageService,
              private customHttpService: CustomHttpService) {
    this.getToken();
    this.authBehaviorSubject = new BehaviorSubject(undefined);


  }

  getToken(): Promise<string | null> {
    if (typeof this.token === 'undefined') {

      // Set timer for Promise which want to fetch "token" from DB
      if (this.fetchingTokenFromDB) {
        let self = this;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(self.getToken());
          }, 300)
        });
      }

      this.fetchingTokenFromDB = true;

      return this.storageService.getToken()
        .then((token) => {
          this.setToken(token);
          this.fetchingTokenFromDB = false;
          return token;
        })
    }
    return Promise.resolve(this.token);
  }

  getEmployeeId(): Promise< number | null> {
      return this.storageService.getEmployeeId()
        .then((id) => {
          this.setEmpId(id);
          return Promise.resolve(id);
        });
  }

  isAuth(): Promise<boolean> {
    return this.getToken()
      .then(token =>
        !!token);
  }

  registration(email: string, pass: string, client: Client): Promise<any> {
    let body = {
      userName : email,
      password : pass,
      clientList: [{
        firstName: client.firstName,
        lastName: client.lastName,
        dateOfBirth: client.dateOfBirth,
        passportNumber: client.passportNumber,
        dateOfIssue: client.dateOfIssue,
        expiryDate: client.expiryDate,
        email: client.email,
        phoneNumber: client.phoneNumber
      }
      ]
    };

    return this.customHttpService.post(Environment.mainServerURL + Environment.registration, body)
      .then(res => res.json())
      .then((obj: any) => {
        if (obj.result) {
          this.setToken(obj.result.token);
          this.setEmpId(obj.result.empId);
        }
        return obj;
      })
  }

  signIn(email: string, pass: string): Promise<any> {
    let params = {
      email: email,
      password: pass
    };

    return this.customHttpService.get(Environment.mainServerURL + Environment.login, params)
      .then(res => res.json())
      .then((obj: any) => {
        if (obj.result) {
          this.setToken(obj.result.token);
          this.setEmpId(obj.result.empId);
        }
        return obj;
      })
  }

  logOut() {
    this.removeToken();
    this.removeEmpId();
  }

  getAuthBehaviorSubject(): BehaviorSubject<boolean> {
    return this.authBehaviorSubject;
  }

  getClients(): Promise<any> {
    return this.getToken()
      .then(token => {
        let params = {
          t: token,
        };
        let url = Environment.mainServerURL + Environment.get_clients;
        return this.customHttpService.get(url, params)
          .then(res => {
            return res.json();
          })
          .catch(err => {
            console.log(err);

          });
      })

  }


  private setToken(token: string) {
    this.token = token;
    if (token) {
      this.storageService.saveToken(token);
      this.authBehaviorSubject.next(true);

    }
  }

  private setEmpId(empId: number) {
    if (empId) {
      this.storageService.setEmployeeId(empId);
    }
  }

  private removeToken() {
    this.token = null;
    this.storageService.removeToken();
    this.authBehaviorSubject.next(false);

  }

  private removeEmpId() {
    this.storageService.deleteEmployeeId();


  }
}

