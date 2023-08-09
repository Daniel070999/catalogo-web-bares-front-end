import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { RegisterModel } from '../../utils';
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
    const loginData = {
      usuario: this.loginUsername,
      email: this.loginUsername,
      clave: this.loginPassword
    };

    this.service.postLogin(loginData).subscribe(
      (response: any) => {
        this.messageResponse = response;
        const rol = this.messageResponse.message[0].rol;
        console.log(rol);
        console.log(this.messageResponse);
        const authToken = this.messageResponse.message[0].Authorization;
        sessionStorage.setItem('authToken', authToken);
        console.log(rol);
        if (rol === 2) {
          this.route.navigate(['admin']);
        }else if(rol === 1){
          this.route.navigate(['/']);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
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
      id_registro: ''
    };
    this.service.postRegister(newUser).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}