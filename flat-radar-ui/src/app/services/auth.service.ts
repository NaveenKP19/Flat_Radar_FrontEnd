import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { ProfileResponse } from '../models/profile-response';
import { RegisterRequest } from '../models/register-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(credentials:LoginRequest){
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`,credentials);
  }

  getProfile(){
    return this.http.get<ProfileResponse>(`${this.apiUrl}/profile`);
  }

  register(data:RegisterRequest){
    return this.http.post<RegisterRequest>(`${this.apiUrl}/register`,data);
  }

}
