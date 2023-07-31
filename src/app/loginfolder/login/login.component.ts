import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { LoginData, RegisterModel } from '../../utils';
import { Router } from '@angular/router';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

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
      (response: any) => { // Cambio el tipo del parámetro a 'any'
        this.messageResponse = response;
        const rol = this.messageResponse.message[0].rol;
        console.log(rol);
        console.log(this.messageResponse);
        // Obtener los valores del token y la cookie de la respuesta
        const authToken = this.messageResponse.message[0].Authorization;
        const cookieValue = this.messageResponse.message[0].cookie;

     
        // Guardar el encabezado en el servicio para su uso en otras solicitudes
        this.service.setHeaders('application/json',`Bearer ${authToken}`,`access_token=${cookieValue}`);

        if (rol === 2) {
          // Si la solicitud de inicio de sesión fue exitosa y el rol es igual a 2, redirige al componente 'admin'
          this.route.navigate(['admin']);
        }
      },
      (error: any) => {
        console.log(error);
        // Manejar el error de la solicitud, por ejemplo, mostrar un mensaje de error en el inicio de sesión
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