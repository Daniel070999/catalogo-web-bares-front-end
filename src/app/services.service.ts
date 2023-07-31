import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, RegisterModel } from './utils';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  /**
   * Para solucionar el problema de conexión local por http://localhost:... de CORS usar la extension: 
   * https://webbrowsertools.com/test-cors/
   * habilitar la extension y recargar
   */
  private headersConfig?: HttpHeaders;
  mainUrl = 'http://localhost:3000';

  urlBar = `${this.mainUrl}/bar/bars`;
  urlRegister = `${this.mainUrl}/login/singup`;
  urlLogin = `${this.mainUrl}/login/singin`;
  urlLogout = `${this.mainUrl}/login/logout`;

  urlCheck = `${this.mainUrl}/check/verifySession`;

  getBars() {
    return this.http.get(this.urlBar);
  }

  postRegister(registro: RegisterModel) {
    return this.http.post(this.urlRegister, registro);
  }

  postLogin(loginData: LoginData) {
    return this.http.post(this.urlLogin, loginData);
  }

  postLogout() {
    return this.http.post(this.urlLogout, null);
  }

  getCheck() {
    return this.http.get(this.urlCheck);
  }

  setHeaders(h1: any, h2: any, h3: any,) {
    this.headersConfig = new HttpHeaders();
    this.headersConfig = this.headersConfig.append('Content-Type', h1);
    this.headersConfig = this.headersConfig.append('Authorization', h2);
    this.headersConfig = this.headersConfig.append('Cookie', h3);
  }

  getHeaders() {
    return this.headersConfig;
  }

}
