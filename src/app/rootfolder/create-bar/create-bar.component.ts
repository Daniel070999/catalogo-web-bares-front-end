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

  logoRegister?: File;


  ControlNameRegister = new FormControl('', Validators.required);
  ControlLemaRegister = new FormControl('', Validators.required);
  ControlDescriptionRegister = new FormControl('', Validators.required);

  FormValidaeRegister = new FormGroup({
    nombre: this.ControlNameRegister,
    lema: this.ControlLemaRegister,
    descripcion: this.ControlDescriptionRegister
  });

  /**
   * The function `onFileSelected` is used to handle the selection of a file, specifically an image file,
   * and checks if the image dimensions are 512x512 pixels before assigning it to `this.logoRegister`.
   * @param {any} event - The `event` parameter in the `onFileSelected` function represents the event
   * that occurred, such as a user selecting a file using an input element. In this case, it is capturing
   * the event when a file is selected by the user through an input field.
   */
  onFileSelected(event: any) {
    const files = event.target.files;

    if (files.length > 0) {
      const selectedFile = files[0];
      const image = new Image();

      image.onload = () => {
        //if (image.width === 512 && image.height === 512) {
        this.logoRegister = selectedFile;
        console.log(this.logoRegister);
        /*} else {
          this.snacBar.error('La imagen debe ser de 512 x 512 pixeles', null);
        }*/
      };
      image.src = URL.createObjectURL(selectedFile);
    }
  }

  /**
   * The function `registerNew` checks if a form is valid, prompts the user to select an image if
   * necessary, and then submits the form data to a service for registering a new bar.
   */
  registerNew() {
    if (this.FormValidaeRegister.status == 'VALID') {
      if (this.logoRegister == undefined) {
        this.snacBar.warning('Seleccione una imagen adecuada', null);
      } else {
        const newBar: any = this.FormValidaeRegister.value;
        this.service.postRegisterNewBar(newBar, this.logoRegister).subscribe({
          next: response => {
            console.log(response);
            this.clearFormLogin();
            this.snacBar.success('Bar registrado', null);
          }, error: err => {
            console.log(err);
          }
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
