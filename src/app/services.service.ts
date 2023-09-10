import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, RegisterModel, RegisterNewBar, RegisterNewMenu } from './utils';

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
  urlRegisterNewBar = `${this.mainUrl}/register/newbar`;
  urlFindBarDataById = `${this.mainUrl}/find/bar`;
  urlFindMenuById = `${this.mainUrl}/find/menu`;
  urlFindAllUser = `${this.mainUrl}/find/alluser`;
  urlFindAllRoles = `${this.mainUrl}/find/allroles`;
  urlFindAllAdminBarRol = `${this.mainUrl}/find/baradminrol`;
  urlUpdateAdminBar = `${this.mainUrl}/update/adminbar`;
  urlUpdateAdminRol = `${this.mainUrl}/update/adminrol`;
  urlLoadImages = `${this.mainUrl}/files/images/`;

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
    const httpOptions = {
      headers: {
        'Authorization': `${id}`
      },
    };
    return this.http.post(this.urlFindById, null, httpOptions);
  }
  getAllUser() {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlFindAllUser, null, httpOptions);
  }
  getRoles() {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlFindAllRoles, null, httpOptions);
  }
  getBarAdminRol() {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlFindAllAdminBarRol, null, httpOptions);
  }
  postUpdateAdminBar(data: any) {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlUpdateAdminBar, data, httpOptions);
  }
  postUpdateAdminRol(data: any) {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlUpdateAdminRol, data, httpOptions);
  }
  getBarDataById(id: any) {
    return this.http.post(this.urlFindBarDataById, { id_bar: id });
  }
  getMenuDataById(id: any) {
    return this.http.post(this.urlFindMenuById, { id_bar: id });
  }

  postRegisterNewMenu(registro: RegisterNewMenu) {
    return this.http.post(this.urlRegisterNewMenu, registro);
  }
  postRegisterNewBar(registro: RegisterNewBar, logo: File) {
    const data = new FormData();
    data.append('nombre', registro.nombre);
    data.append('lema', registro.lema);
    data.append('descripcion', registro.descripcion);
    data.append('logo', logo);
    return this.http.post(this.urlRegisterNewBar, data);
  }

  getImage(image: any) {
    return this.http.get(this.urlLoadImages+image);
  }

}
