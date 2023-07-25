import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { LoginData, RegisterModel } from '../../utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageResponse: any = [];

  constructor(private service: ServicesService, private route: Router) { }

  ngOnInit(): void {
  }
  //variables de login
  loginUsername: string = "";
  loginPassword: string = "";
  //variables de registro
  registerName: string = "";
  registerLastName: string = "";
  registerUser: string = "";
  registerEmail: string = "";
  registerGenero: string = "";
  registerDateBirth: string = "";
  registerPhone: string = "";
  registerPassword: string = "";
  registerPasswordValidate: string = "";

  login() {
    console.log('Iniciando sesión...');
    const loginData: LoginData = {
      usuario: this.loginUsername,
      email: this.loginUsername,
      clave: this.loginPassword
    };
    this.service.postLogin(loginData).subscribe(response => {
      this.messageResponse = response;
      const rol = this.messageResponse.message[0].rol;
      console.log(rol);
      if (rol == '2') {
        this.route.navigate(['admin']);
      }
    }, error => {
      console.log(error)
    });
  }

  register() {
    const newUser: RegisterModel = {
      usuario: this.registerUser,
      clave: this.registerPassword,
      email: this.registerEmail,
      nombre: `${this.registerName} ${this.registerLastName}`,
      genero: this.registerGenero,
      telefono: this.registerPhone,
      fechanacimiento: this.registerDateBirth,
      tipopersona: 'cliente',
      id_registro: ''
    };
    this.service.postRegister(newUser).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}