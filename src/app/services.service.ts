import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, RegisterModel, RegisterNewBar, RegisterNewMenu } from './utils';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  mainUrl = 'http://localhost:3000';

  //ruta principal de bar
  barUrl = `${this.mainUrl}/bar`
  urlBars = `${this.barUrl}/bars`;
  urlFindBarByIdSession = `${this.barUrl}/barbysessionid`;
  urlRegisterNewBar = `${this.barUrl}/newbar`;
  urlFindBarDataById = `${this.barUrl}/allbarbyid`;
  urlUpdateBar = `${this.barUrl}/update`;
  urlDeleteBar = `${this.barUrl}/delete`;

  //ruta prnicipal de session
  sessionUrl = `${this.mainUrl}/session`;
  urlRegister = `${this.sessionUrl}/signup`;
  urlLogin = `${this.sessionUrl}/login`;
  urlLogout = `${this.sessionUrl}/logout`;
  urlDataSession = `${this.sessionUrl}/datasession`;

  //ruta principal de menu
  menuUrl = `${this.mainUrl}/menu`;
  urlRegisterNewMenu = `${this.menuUrl}/newmenu`;
  urlFindMenuById = `${this.menuUrl}/menubybarid`;
  urlGetMenu = `${this.menuUrl}/menubyid`;
  urlUpdateMenu = `${this.menuUrl}/update`;
  urlDeleteMenu = `${this.menuUrl}/delete`;

  //ruta principal de promocion
  promotionUrl = `${this.mainUrl}/promotion`;
  urlRegisterNewPromotion = `${this.promotionUrl}/newpromotion`;
  urlFindPromotionById = `${this.promotionUrl}/promotionbybarid`;
  urlGetPromotion = `${this.promotionUrl}/promotionbyid`;
  urlUpdatePromotion = `${this.promotionUrl}/update`;
  urlDeletePromotion = `${this.promotionUrl}/delete`;

  //ruta principal de evento
  eventUrl = `${this.mainUrl}/event`;
  urlRegisterNewEvent = `${this.eventUrl}/newevent`;
  urlFindEventById = `${this.eventUrl}/eventbybarid`;

  //ruta principal de usuario
  usuarioUrl = `${this.mainUrl}/user`;
  urlFindAllUser = `${this.usuarioUrl}/getbyrolsessionpermission`;
  urlUpdateAdminBar = `${this.usuarioUrl}/updateuseradminbarbyrolsessionpermission`;

  //ruta principal de rol
  rolUrl = `${this.mainUrl}/rol`;
  urlFindAllRoles = `${this.rolUrl}/getbyrolsessionpermission`;
  urlFindAllAdminBarRol = `${this.rolUrl}/getbaradminrolsessionpermission`;

  //ruta principal de registros
  registroUrl = `${this.mainUrl}/register`;
  urlUpdateAdminRol = `${this.registroUrl}/updateregisteradminrolbyrolsessionpermission`;

  //Ruta usada por Guard para verificar la sesion activa
  urlCheck = `${this.mainUrl}/check/verifySession`;

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


  getDataSession() {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlDataSession, null, httpOptions);
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
  postUpdateBar(data: any) {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlUpdateBar, data, httpOptions);
  }
  postUpdateAdminRol(data: any) {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlUpdateAdminRol, data, httpOptions);
  }
  getMenuById(data: any) {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlGetMenu, data, httpOptions);
  }
  postUpdateMenu(data: any) {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlUpdateMenu, data, httpOptions);
  }
  postDeleteMenu(data: any) {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlDeleteMenu, data, httpOptions);
  }
  postDeleteBar(data: any) {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlDeleteBar, data, httpOptions);
  }
  getPromotionById(data: any) {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlGetPromotion, data, httpOptions);
  }
  postUpdatePromotion(data: any) {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlUpdatePromotion, data, httpOptions);
  }
  postDeletePromotion(data: any) {
    const httpOptions = {
      headers: {
        'Authorization': `${sessionStorage.getItem('authToken')}`
      },
    };
    return this.http.post(this.urlDeletePromotion, data, httpOptions);
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
  getEventDataById(id: any) {
    return this.http.post(this.urlFindEventById, { id_bar: id });
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
    return this.http.post(this.urlRegisterNewPromotion, data);
  }
  postRegisterNewEvent(info: any, image: File) {
    const data = new FormData();
    data.append('data', JSON.stringify(info));
    data.append('image', image);
    console.log(data);

    return this.http.post(this.urlRegisterNewEvent, data);
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
