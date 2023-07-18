import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
    // Aquí puedes agregar la lógica para autenticar al usuario
    console.log('Iniciando sesión...');
  }

  register() {
    // Aquí puedes agregar la lógica para registrar al usuario
    console.log(this.registerName + '\n'
      + this.registerLastName + '\n'
      + this.registerUser + '\n'
      + this.registerEmail + '\n'
      + this.registerGenero + '\n'
      + this.registerDateBirth + '\n'
      + this.registerPhone + '\n'
      + this.registerPassword + '\n'
      + this.registerPasswordValidate + '\n');
  }
}