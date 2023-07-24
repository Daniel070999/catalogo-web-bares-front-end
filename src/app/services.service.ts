import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from './utils';

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

  mainUrl = 'http://localhost:3000';

  urlBar = `${this.mainUrl}/bar/bars`;
  urlRegister = `${this.mainUrl}/register/singup`;

  getBars() {
    return this.http.get(this.urlBar);
  }
  postRegister(registro: RegisterModel) {
    const json = { ...registro }
    return this.http.post(this.urlRegister, json);
  }


}