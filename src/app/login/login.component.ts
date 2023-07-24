import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { RegisterModel } from '../utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private registerService: ServicesService) { }
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
    this.registerService.postRegister(newUser).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}