import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, RegisterModel, RegisterNewMenu } from './utils';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  private authToken: string = '';

  /**
   * Para solucionar el problema de conexión local por http://localhost:... de CORS usar la extension: 
   * https://webbrowsertools.com/test-cors/
   * habilitar la extension y recargar
   */
  mainUrl = 'http://localhost:3000';

  urlBar = `${this.mainUrl}/bar/bars`;
  urlRegister = `${this.mainUrl}/login/singup`;
  urlLogin = `${this.mainUrl}/login/singin`;
  urlLogout = `${this.mainUrl}/login/logout`;
  urlFindById = `${this.mainUrl}/find/byid`;
  urlRegisterNewMenu = `${this.mainUrl}/register/newmenu`;

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
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlCheck, null, httpOptions);
  }
  getFindById(id: any) {
    return this.http.post(this.urlFindById, null, { headers: { 'Authorization': id } });
  }
  postRegisterNewMenu(registro: RegisterNewMenu) {
    return this.http.post(this.urlRegisterNewMenu, registro);
  }


}
