import { Component } from '@angular/core';
import { ServicesService } from '../../services.service';
import { RegisterModel } from '../../utils';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/snackbar.service';
interface Genero {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  messageResponse: any = [];
  loading: boolean = false;
  demo1TabIndex: any;

  constructor(private service: ServicesService, private route: Router, private snackbar: SnackbarService) { }


  /**
   * Variables para la validación del formulario para los grupos 
   * FormLoginValidateGroup y FormRegisterValidateGroup
   */
  ControlloginUsername = new FormControl('', Validators.required);
  ControlloginPassword = new FormControl('', Validators.required);
  ControlregisterName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  ControlregisterLastName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  ControlregisterUser = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  ControlregisterEmail = new FormControl('', [Validators.required, Validators.email]);
  ControlregisterDateBirth = new FormControl('', Validators.required);
  ControlregisterPhone = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('^[0-9+]*$')]);
  ControlregisterGenero = new FormControl('', Validators.required);
  ControlregisterPassword = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,100}')]);
  ControlregisterPasswordValidate = new FormControl('', Validators.required);
  /**
   * Variables para el login
   */
  loginUsername: string = "";
  loginPassword: string = "";
  /**
   * Variables para el registro
   */
  registerName: string = "";
  registerLastName: string = "";
  registerUser: string = "";
  registerEmail: string = "";
  registerDateBirth?: Date;
  registerPhone: string = "";
  registerGenero: String = '';
  registerPassword: string = "";
  registerPasswordValidate: string = "";

  genero: Genero[] = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
  ];
  /**
     * Valida el formulario del grupo Login
     */
  FormLoginValidateGroup = new FormGroup({
    ControlloginUsername: this.ControlloginUsername,
    ControlloginPassword: this.ControlloginPassword
  });
  /**
   * Valida el formulario del grupo Register
   */
  FormRegisterValidateGroup = new FormGroup({
    ControlregisterName: this.ControlregisterName,
    ControlregisterLastName: this.ControlregisterLastName,
    ControlregisterUser: this.ControlregisterUser,
    ControlregisterEmail: this.ControlregisterEmail,
    ControlregisterDateBirth: this.ControlregisterDateBirth,
    ControlregisterPhone: this.ControlregisterPhone,
    ControlregisterGenero: this.ControlregisterGenero,
    ControlregisterPassword: this.ControlregisterPassword,
    ControlregisterPasswordValidate: this.ControlregisterPasswordValidate
  });




  login() {
    const loginData = {
      usuario: this.loginUsername,
      email: this.loginUsername,
      clave: this.loginPassword
    };
    this.loading = true;
    if (this.FormLoginValidateGroup.status == 'VALID') {
      this.service.postLogin(loginData).subscribe(
        (response: any) => {
          this.messageResponse = response;
          const rol = this.messageResponse.message[0].rol;
          const authToken = this.messageResponse.message[0].Authorization;
          sessionStorage.setItem('authToken', authToken);
          if (rol === '2') {
            this.route.navigate(['admin']);
          } else if (rol === '1') {
            this.route.navigate(['/']);
          } else if (rol === '3') {
            this.route.navigate(['root']);
          } else {
            this.route.navigate(['']);
          }
          this.clearFormLogin();
          this.loading = false;
        },
        (error: any) => {
          console.log(error);
          this.snackbar.error('Algo salio mal', null);
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
      this.snackbar.warning('No cumple con las validaciones', null);
    }

  }

  register() {
    this.loading = true;
    if (this.registerPassword == '') {
      this.ControlregisterPassword.setErrors({ required: true });
    } else if (!(/[!@#$%^&*_=+-]/).test(this.registerPassword)) {
      this.ControlregisterPassword.setErrors({ especial: true });
    } else if (!(/(?=.*[0-9])/).test(this.registerPassword)) {
      this.ControlregisterPassword.setErrors({ number: true });
    } else if (!(/(?=.*[a-z])/).test(this.registerPassword)) {
      this.ControlregisterPassword.setErrors({ minus: true });
    } else if (!(/(?=.*[A-Z])/).test(this.registerPassword)) {
      this.ControlregisterPassword.setErrors({ mayus: true });
    } else if (this.registerPassword.length <= 8) {
      this.ControlregisterPassword.setErrors({ min: true });
    } else if (this.registerPassword.length >= 100) {
      this.ControlregisterPassword.setErrors({ max: true });
    }
    if (this.FormRegisterValidateGroup.status == 'VALID') {
      if (this.registerPassword == this.registerPasswordValidate) {
        const newUser: RegisterModel = {
          usuario: this.registerUser,
          clave: this.registerPassword,
          email: this.registerEmail,
          nombre: `${this.registerName} ${this.registerLastName}`,
          genero: this.registerGenero,
          telefono: this.registerPhone,
          fechanacimiento: this.registerDateBirth!.toISOString().slice(0,10),
          id_registro: ''
        };
        this.service.postRegister(newUser).subscribe(response => {
          console.log(response);
          this.clearFormRegister();
          this.snackbar.success('Usuario registrado', null);
          this.loading = false;
          this.demo1TabIndex = 0;
        }, error => {
          console.log(error);
          this.snackbar.error('Algo salio mal', null);
          this.loading = false;
        });
      } else {
        this.snackbar.error('Las claves no coinciden', null);
        this.loading = false;
        this.ControlregisterPasswordValidate.setErrors({ noCoincide: true });
      }
    } else {
      this.snackbar.warning('No cumple con las validaciones', null);
      this.loading = false;
    }
  }
  /**
   * clearFormLogin: limpia el formulario Login 
   */
  clearFormLogin() {
    this.FormLoginValidateGroup.reset();
    Object.keys(this.FormLoginValidateGroup.controls).forEach(key => {
      this.FormLoginValidateGroup.get(key)?.setErrors(null);
    });
  }
  /**
   * clearFormLogin: limpia el formulario Register 
   */
  clearFormRegister() {
    this.FormRegisterValidateGroup.reset();
    Object.keys(this.FormRegisterValidateGroup.controls).forEach(key => {
      this.FormRegisterValidateGroup.get(key)?.setErrors(null);
    });
  }
}