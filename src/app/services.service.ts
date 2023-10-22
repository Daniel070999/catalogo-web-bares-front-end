import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, RegisterModel, RegisterNewBar, RegisterNewMenu, RegisterNewPromotion } from './utils';

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

  //ruta principal de bar
  barUrl = `${this.mainUrl}/bar`
  //rutas relacionadas al bar
  urlBars = `${this.barUrl}/bars`;//ok
  urlFindBarByIdSession = `${this.barUrl}/barbysessionid`;//ok
  urlRegisterNewBar = `${this.barUrl}/newbar`;//ok
  urlFindBarDataById = `${this.barUrl}/allbarbyid`;//ok

  //ruta prnicipal de session
  sessionUrl = `${this.mainUrl}/session`;
  //rutas relacinoadas a session
  urlRegister = `${this.sessionUrl}/signup`;//ok
  urlLogin = `${this.sessionUrl}/login`;//ok
  urlLogout = `${this.sessionUrl}/logout`;//ok

  //ruta principal de menu
  menuUrl = `${this.mainUrl}/menu`;
  urlRegisterNewMenu = `${this.menuUrl}/newmenu`;//ok
  urlFindMenuById = `${this.menuUrl}/menubybarid`;//ok

  //ruta principal de promocion
  promotionUrl = `${this.mainUrl}/promotion`;
  urlRegisterNewPromotion = `${this.promotionUrl}/newpromotion`;//ok
  urlFindPromotionById = `${this.promotionUrl}/promotionbybarid`;//ok


  //ruta principal de usuario
  usuarioUrl = `${this.mainUrl}/user`;
  urlFindAllUser = `${this.usuarioUrl}/getbyrolsessionpermission`;//ok
  urlUpdateAdminBar = `${this.usuarioUrl}/updateuseradminbarbyrolsessionpermission`;//ok

  //ruta principal de rol
  rolUrl = `${this.mainUrl}/rol`;
  urlFindAllRoles = `${this.rolUrl}/getbyrolsessionpermission`;//ok
  urlFindAllAdminBarRol = `${this.rolUrl}/getbaradminrolsessionpermission`;//ok

  //ruta principal de registros
  registroUrl = `${this.mainUrl}/register`;
  urlUpdateAdminRol = `${this.registroUrl}/updateregisteradminrolbyrolsessionpermission`;//ok

  //Ruta usada por Guard para verificar la sesion activa
  urlCheck = `${this.mainUrl}/check/verifySession`;//ok

  getBars() {
    return this.http.get(this.urlBars);
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
    return this.http.post(this.urlFindBarByIdSession, null, httpOptions);
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
  getPromotionDataById(id: any) {
    return this.http.post(this.urlFindPromotionById, { id_bar: id });
  }
  postRegisterNewMenu(registro: RegisterNewMenu, image: File) {
    const data = new FormData();
    data.append('nombre', registro.nombre);
    data.append('descripcion', registro.descripcion);
    data.append('precio', registro.precio);
    data.append('id_bar', registro.id_bar);
    data.append('image', image);
    return this.http.post(this.urlRegisterNewMenu, data);
  }
  postRegisterNewPromotion(info: any, image: File) {
    const data = new FormData();
    data.append('data', JSON.stringify(info));
    data.append('image', image);
    console.log(data);

    return this.http.post(this.urlRegisterNewPromotion, data);
  }
  postRegisterNewBar(registro: RegisterNewBar, logo: File) {
    const data = new FormData();
    data.append('nombre', registro.nombre);
    data.append('lema', registro.lema);
    data.append('descripcion', registro.descripcion);
    data.append('logo', logo);
    return this.http.post(this.urlRegisterNewBar, data);
  }


}
