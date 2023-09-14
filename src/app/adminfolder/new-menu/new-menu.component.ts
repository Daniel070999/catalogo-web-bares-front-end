import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { find } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
import { SnackbarService } from 'src/app/snackbar.service';
import { RegisterModel, RegisterNewMenu } from 'src/app/utils';

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

  ControlNameRegister = new FormControl('', Validators.required);
  ControlDescriptionRegister = new FormControl('', Validators.required);
  ControlPriceRegister = new FormControl('', Validators.required);

  FormValidaeRegister = new FormGroup({
    ControlNameRegister: this.ControlNameRegister,
    ControlDescriptionRegister: this.ControlDescriptionRegister,
    ControlPriceRegister: this.ControlPriceRegister
  });

  token = sessionStorage.getItem('authToken');
  id_bar: any;

  ngOnInit(): void {
    if (this.token) {
      this.findById(this.token);
    }
  }

  findById(token: any) {
    this.service.getFindById(token).subscribe(response => {
      const id_bar_aux: any = response;
      this.id_bar = id_bar_aux[0].id_bar;
    }, err => {
      console.log(err);
    });

  }

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

  register() {
    if (this.FormValidaeRegister.status == 'VALID') {
      if (this.imageRegister == undefined) {
        this.snacBar.warning('Seleccione una imagen adecuada', null);
      } else {
        const newMenu: RegisterNewMenu = {
          nombre: this.nameRegister,
          descripcion: this.descriptionRegister,
          precio: this.priceRegister,
          id_bar: this.id_bar,
        };
        this.service.postRegisterNewMenu(newMenu, this.imageRegister).subscribe(response => {
          console.log(response);
          this.clearFormLogin();
          this.snacBar.success('Menu registrado', null);
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
    this.imageRegister = undefined;
  }

}
