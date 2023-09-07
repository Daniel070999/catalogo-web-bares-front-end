import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ServicesService } from 'src/app/services.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-create-bar',
  templateUrl: './create-bar.component.html',
  styleUrls: ['./create-bar.component.css']
})
export class CreateBarComponent {

  constructor(private service: ServicesService, private snacBar: SnackbarService) { }

  nameRegister: String = '';
  lemaRegister: String = '';
  descriptionRegister: String = '';
  logoRegister?: Blob;

  ControlNameRegister = new FormControl('', Validators.required);
  ControlLemaRegister = new FormControl('', Validators.required);
  ControlDescriptionRegister = new FormControl('', Validators.required);
  ControlLogoRegister = new FormControl('', Validators.required);

  FormValidaeRegister = new FormGroup({
    ControlNameRegister: this.ControlNameRegister,
    ControlLemaRegister: this.ControlLemaRegister,
    ControlDescriptionRegister: this.ControlDescriptionRegister,
    ControlLogoRegister: this.ControlLogoRegister
  });

  registerNew() {
    if (this.FormValidaeRegister.status == 'VALID') {
      const newBar = {
        nombre: this.nameRegister,
        lema: this.lemaRegister,
        descripcion: this.descriptionRegister,
        logo: this.logoRegister
      }
      this.service.postRegisterNewBar(newBar).subscribe(response => {
        console.log(response);
        this.clearFormLogin();
        this.snacBar.success('Bar registrado',null);
      }, err => {
        console.log(err);
      });
    }
  }
  clearFormLogin() {
    this.FormValidaeRegister.reset();
    Object.keys(this.FormValidaeRegister.controls).forEach(key => {
      this.FormValidaeRegister.get(key)?.setErrors(null);
    });
  }
}
