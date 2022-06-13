import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegisterUser } from '../_interfaces/registerUser';
import { ILoginUser } from '../_interfaces/loginUser';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  baseUrl: string = 'http://localhost:7000/flightbooking/accounts/';

  constructor(private http: HttpClient) {}

  register(registerUserData: IRegisterUser) {
    return this.http.post(this.baseUrl + 'register', registerUserData);
  }

  login(loginUserData: ILoginUser) {
    return this.http.post(this.baseUrl + 'login', loginUserData);
  }
}
