import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials:LoginRequest){

    return this.http.post<LoginResponse>(
      'http://localhost:8080/api/users/login',
      credentials
    );
  }

}
