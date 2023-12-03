import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ServicesService } from 'src/app/services.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-new-promotion',
  templateUrl: './new-promotion.component.html',
  styleUrls: ['./new-promotion.component.css']
})
export class NewPromotionComponent implements OnInit {
  constructor(private service: ServicesService, private snacBar: SnackbarService) { }

  imageRegister?: File;

  token = sessionStorage.getItem('authToken');
  id_bar: any;

  ControlNameRegister = new FormControl('', Validators.required);
  ControlDescriptionRegister = new FormControl('', Validators.required);
  ControlDateStartRegister = new FormControl('', Validators.required);
  ControlScheduleStartRegister = new FormControl('', Validators.required);
  ControlDateFinishRegister = new FormControl('', Validators.required);
  ControlScheduleFinishRegister = new FormControl('', Validators.required);

  FormValidaeRegister = new FormGroup({
    nombre: this.ControlNameRegister,
    descripcion: this.ControlDescriptionRegister,
    fecha_inicio: this.ControlDateStartRegister,
    hora_inicio: this.ControlScheduleStartRegister,
    fecha_fin: this.ControlDateFinishRegister,
    hora_fin: this.ControlScheduleFinishRegister,
  });



  ngOnInit(): void {
    if (this.token) {
      this.findById(this.token);
    }
  }

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
        const newPromotion = Object.assign(this.FormValidaeRegister.value, { id_bar: this.id_bar });
        this.service.postRegisterNewPromotion(newPromotion, this.imageRegister).subscribe({
          next: (response) => {
            console.log(response);
            this.clearFormLogin();
            this.snacBar.success('Promoción registrada', null);
          }, error: (err) => {
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
    this.imageRegister = undefined;
  }

}
