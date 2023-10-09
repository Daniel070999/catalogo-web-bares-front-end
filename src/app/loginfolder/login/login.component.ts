import { Component } from '@angular/core';
import { ServicesService } from '../../services.service';
import { RegisterModel } from '../../utils';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/snackbar.service';

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

  registerGenero: String = '';
  genero: any = [
    { value: 'Masculino', viewValue: 'Masculino' },
    { value: 'Femenino', viewValue: 'Femenino' },
  ];
  /**
     * Valida el formulario del grupo Login
     */
  FormLoginValidateGroup = new FormGroup({
    usuario: this.ControlloginUsername,
    email: this.ControlloginUsername,
    clave: this.ControlloginPassword
  });
  /**
   * Valida el formulario del grupo Register
   */
  FormRegisterValidateGroup = new FormGroup({
    nombre: this.ControlregisterName,
    apellido: this.ControlregisterLastName,
    usuario: this.ControlregisterUser,
    email: this.ControlregisterEmail,
    fechanacimiento: this.ControlregisterDateBirth,
    telefono: this.ControlregisterPhone,
    genero: this.ControlregisterGenero,
    clave: this.ControlregisterPassword,
    claveconfirm: this.ControlregisterPasswordValidate
  });



  login() {

    const loginData: any = this.FormLoginValidateGroup.value;

    this.loading = true;
    if (this.FormLoginValidateGroup.status == 'VALID') {
      this.service.postLogin(loginData).subscribe({
        next: (response) => {
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
        error: (error) => {
          console.log(error);
          this.snackbar.error('Algo salio mal', null);
          this.loading = false;
        }
      }
      );
    } else {
      this.loading = false;
      this.snackbar.warning('No cumple con las validaciones', null);
    }

  }

  register() {
    const pass: any = this.FormRegisterValidateGroup.value.clave;

    this.loading = true;
    if (pass == '') {
      this.FormRegisterValidateGroup.get(['clave'])?.setErrors({ required: true });
    } else if (!(/[!@#$%^&*_=+-]/).test(pass)) {
      this.FormRegisterValidateGroup.get(['clave'])?.setErrors({ especial: true });
    } else if (!(/(?=.*[0-9])/).test(pass)) {
      this.FormRegisterValidateGroup.get(['clave'])?.setErrors({ number: true });
    } else if (!(/(?=.*[a-z])/).test(pass)) {
      this.FormRegisterValidateGroup.get(['clave'])?.setErrors({ minus: true });
    } else if (!(/(?=.*[A-Z])/).test(pass)) {
      this.FormRegisterValidateGroup.get(['clave'])?.setErrors({ mayus: true });
    } else if (pass.length <= 8) {
      this.FormRegisterValidateGroup.get(['clave'])?.setErrors({ min: true });
    } else if (pass.length >= 100) {
      this.FormRegisterValidateGroup.get(['clave'])?.setErrors({ max: true });
    }
    if (this.FormRegisterValidateGroup.status == 'VALID') {
      const confirmPass = this.FormRegisterValidateGroup.value.claveconfirm;
      if (pass == confirmPass) {
        const registerData: any = this.FormRegisterValidateGroup.value;

        this.service.postRegister(registerData).subscribe({
          next: () => {
            this.snackbar.success('Usuario registrado', null);
            this.clearFormRegister();
            this.demo1TabIndex = 0;
          }, error: (error) => {
            console.log(error);
            this.snackbar.error('Algo salio mal', null);
          }, complete: () => {
            this.loading = false;
          }
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