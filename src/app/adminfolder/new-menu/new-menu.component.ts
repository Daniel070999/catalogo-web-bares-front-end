import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.css']
})
export class NewMenuComponent implements OnInit {
  constructor(private service: ServicesService, private snacBar: SnackbarService) { }

  nameRegister: any;
  descriptionRegister: any;
  priceRegister: any;
  imageRegister?: File;

  token = sessionStorage.getItem('authToken');
  id_bar: any;

  ControlNameRegister = new FormControl('', Validators.required);
  ControlDescriptionRegister = new FormControl('', Validators.required);
  ControlPriceRegister = new FormControl('', Validators.required);

  FormValidaeRegister = new FormGroup({
    nombre: this.ControlNameRegister,
    descripcion: this.ControlDescriptionRegister,
    precio: this.ControlPriceRegister,
  });



  ngOnInit(): void {
    if (this.token) {
      this.findById(this.token);
    }
  }

  /**
   * The `findById` function makes an HTTP request to retrieve a specific item by its token, and assigns
   * the corresponding ID to the `id_bar` property.
   * @param {any} token - The token parameter is used to identify a specific item or resource in the
   * system. It is typically a unique identifier that allows the system to retrieve the corresponding
   * data or perform specific operations on that item.
   */
  findById(token: any) {
    this.service.getFindById(token).subscribe({
      next: (response) => {
        const responseAux: any = response;
        const id_bar_aux: any = responseAux.message;
        this.id_bar = id_bar_aux[0].id_bar;
      }, error: (err) => {
        console.log(err);
        this.snacBar.error('Algo salio mal', null);
      }
    });
  }

  /**
   * The function `onFileSelected` is used to handle the selection of a file, specifically an image file,
   * and checks if the image dimensions are within the specified limits before assigning the selected
   * file to a variable.
   * @param {any} event - The event parameter is the event object that is triggered when a file is
   * selected. It contains information about the selected file(s), such as the file name, size, and type.
   */
  onFileSelected(event: any) {
    const files = event.target.files;

    if (files.length > 0) {
      const selectedFile = files[0];
      const image = new Image();

      image.onload = () => {
        if (image.width <= 1080 && image.height <= 1080) {
          this.imageRegister = selectedFile;
          console.log(this.imageRegister);
        } else {
          this.snacBar.error('La imagen debe ser menor o igual a 1080 x 1080', null);
        }
      };
      image.src = URL.createObjectURL(selectedFile);
    }
  }

  /**
   * The `register` function checks if the registration form is valid, and if so, it sends a request to
   * register a new menu item with an image.
   */
  register() {
    if (this.FormValidaeRegister.status == 'VALID') {
      if (this.imageRegister == undefined) {
        this.snacBar.warning('Seleccione una imagen adecuada', null);
      } else {
        const newMenu = Object.assign(this.FormValidaeRegister.value, { id_bar: this.id_bar });

        this.service.postRegisterNewMenu(newMenu, this.imageRegister).subscribe({
          next: (response) => {
            console.log(response);
            this.clearFormLogin();
            this.snacBar.success('Menu registrado', null);
          }, error: (err) => {
            console.log(err);
          }
        });
      }
    }
  }

  /**
   * The function "clearFormLogin" resets a form, clears any validation errors, and removes an image.
   */
  clearFormLogin() {
    this.FormValidaeRegister.reset();
    Object.keys(this.FormValidaeRegister.controls).forEach(key => {
      this.FormValidaeRegister.get(key)?.setErrors(null);
    });
    this.imageRegister = undefined;
  }

}
