import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('imagenDiv') imagenDiv?: ElementRef;
  @ViewChild('fileInput') fileInput?: ElementRef;

  nameRegister: any;
  lemaRegister: any;
  descriptionRegister: any;
  logoRegister?: File;


  ControlNameRegister = new FormControl('', Validators.required);
  ControlLemaRegister = new FormControl('', Validators.required);
  ControlDescriptionRegister = new FormControl('', Validators.required);

  FormValidaeRegister = new FormGroup({
    ControlNameRegister: this.ControlNameRegister,
    ControlLemaRegister: this.ControlLemaRegister,
    ControlDescriptionRegister: this.ControlDescriptionRegister
  });

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.logoRegister = files[0];
    }
    console.log(this.logoRegister);

  }



  registerNew() {
    if (this.FormValidaeRegister.status == 'VALID') {
      if (this.logoRegister == undefined) {
        this.snacBar.warning('Seleccione una imagen', null);
      } else {
        const newBar = {
          nombre: this.nameRegister,
          lema: this.lemaRegister,
          descripcion: this.descriptionRegister
        }
        this.service.postRegisterNewBar(newBar, this.logoRegister).subscribe(response => {
          console.log(response);
          this.clearFormLogin();
          this.snacBar.success('Bar registrado', null);
        }, err => {
          console.log(err);
        });
      }
    }
  }
  clearFormLogin() {
    this.FormValidaeRegister.reset();
    Object.keys(this.FormValidaeRegister.controls).forEach(key => {
      this.FormValidaeRegister.get(key)?.setErrors(null);
    });
  }

}
