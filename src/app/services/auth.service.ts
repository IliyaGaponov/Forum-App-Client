import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths, environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/auth/login.model';
import { RegisterRequest } from '../models/auth/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  private baseUrl = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}${ApiPaths.Register}`, registerRequest);
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}${ApiPaths.Login}`, loginRequest);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToSession(email: string, userName: string): void {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('userName', userName);
  } 
}
