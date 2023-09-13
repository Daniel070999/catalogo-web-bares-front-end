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
      const selectedFile = files[0];
      const image = new Image();

      image.onload = () => {
        if (image.width === 512 && image.height === 512) {
          // La imagen tiene las dimensiones correctas, puedes asignarla.
          this.logoRegister = selectedFile;
          console.log(this.logoRegister);
        } else {
          this.snacBar.error('La imagen debe ser de 512 x 512 pixeles', null);
        }
      };

      // Carga la imagen para obtener sus dimensiones.
      image.src = URL.createObjectURL(selectedFile);
    }
  }



  registerNew() {
    if (this.FormValidaeRegister.status == 'VALID') {
      if (this.logoRegister == undefined) {
        this.snacBar.warning('Seleccione una imagen adecuada', null);
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
    this.logoRegister = undefined;
  }

}
