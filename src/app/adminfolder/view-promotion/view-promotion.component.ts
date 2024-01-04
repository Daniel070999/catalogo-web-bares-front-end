import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-view-promotion',
  templateUrl: './view-promotion.component.html',
  styleUrls: ['./view-promotion.component.css']
})
export class ViewPromotionComponent implements OnInit {

  constructor(private service: ServicesService, private snacBar: SnackbarService) { }
  dataPromocion: any = [];
  token = sessionStorage.getItem('authToken');
  id_bar: any;
  clearInput: boolean = false;
  searchPromocion: string = '';
  filteredData: any = [];
  promocion: any = [];
  oldImage: any;
  id_promocion: any;

  imageRegister?: File;

  ControlNameRegister = new FormControl('', Validators.required);
  ControlDescriptionRegister = new FormControl('', Validators.required);
  ControlDateStartRegister = new FormControl('', Validators.required);
  ControlDateFinishRegister = new FormControl('', Validators.required);
  ControlScheduleStartRegister = new FormControl('', Validators.required);
  ControlScheduleFinishRegister = new FormControl('', Validators.required);

  FormValidaeRegister = new FormGroup({
    nombre: this.ControlNameRegister,
    descripcion: this.ControlDescriptionRegister,
    fecha_inicio: this.ControlDateStartRegister,
    hora_inicio: this.ControlScheduleStartRegister,
    fecha_fin: this.ControlDateFinishRegister,
    hora_fin: this.ControlScheduleFinishRegister
  });


  ngOnInit(): void {
    if (this.token) {
      this.findById(this.token);
    }
  }

  /**
   * The function checks if the searchPromocion variable is empty and sets the clearInput variable
   * accordingly.
   */
  typing() {
    if (this.searchPromocion == "") {
      this.clearInput = false;
    } else {
      this.clearInput = true;
    }
  }


  /* The `search()` function is used to filter the `filteredData` array based on the `searchPromocion`
  value. It filters the array by checking if the `id_promocion` or `nombre` properties of each item in
  the array contain the `searchPromocion` value (case-insensitive). The filtered results are then
  assigned back to the `filteredData` array. */
  search(): void {
    this.filteredData = this.filteredData.filter((item: { nombre: any; id_promocion: any; }) => {
      return (
        (typeof item.id_promocion === 'string' && item.id_promocion.toLowerCase().includes(this.searchPromocion.toLowerCase())) ||
        item.nombre.toLowerCase().includes(this.searchPromocion.toLowerCase())
      );
    });
  }

  /**
   * The function `btn_clear()` clears the search input and reloads the promotion data for a specific
   * bar.
   */
  btn_clear() {
    this.getPromocionData(this.id_bar);
    this.searchPromocion = "";
    this.clearInput = false;
    this.search();
  }

  /**
   * The function "promocionSelect" retrieves a promotion by its ID and sets the retrieved data to a
   * form for editing.
   * @param {any} id - The parameter "id" is of type "any", which means it can accept any data type. It
   * is used as an identifier to retrieve a specific promotion by its ID.
   */
  promocionSelect(id: any) {
    console.log(id);
    const data = {
      id_promocion: id
    }
    this.id_promocion = id;
    this.service.getPromotionById(data).subscribe({
      next: (response) => {
        const responseAux: any = response;
        this.oldImage = responseAux.message[0].image;
        const fechaInicio = new Date(responseAux.message[0].fecha_inicio);
        const fechaFin = new Date(responseAux.message[0].fecha_fin);
        fechaInicio.setHours(fechaInicio.getHours() - 5);
        fechaFin.setHours(fechaFin.getHours() - 5);
        const fecha_inicio_aux = fechaInicio.toISOString().split('T')[0];
        const hora_inicio_aux = fechaInicio.toISOString().split('T')[1].split('.')[0].substring(0, 5);;
        const fecha_fin_aux = fechaFin.toISOString().split('T')[0];
        const hora_fin_aux = fechaFin.toISOString().split('T')[1].split('.')[0].substring(0, 5);;
        let data = {
          'nombre': responseAux.message[0].nombre,
          'descripcion': responseAux.message[0].descripcion,
          'fecha_inicio': fecha_inicio_aux,
          'hora_inicio': hora_inicio_aux,
          'fecha_fin': fecha_fin_aux,
          'hora_fin': hora_fin_aux
        }
        this.FormValidaeRegister.setValue(data);
      },
      error: (err) => {
        console.log(err);
        this.snacBar.error('Algo salio mal', null);
      }
    });
  }

  /**
   * The `findById` function makes an API call to retrieve data based on a given token and handles the
   * response accordingly.
   * @param {any} token - The token parameter is a variable that represents some kind of identifier or
   * key used to retrieve data from the service.
   */
  findById(token: any) {
    this.service.getFindById(token).subscribe({
      next: (response) => {
        const responseAux: any = response;
        const id_bar_aux: any = responseAux.message;
        this.id_bar = id_bar_aux[0].id_bar;
        this.getPromocionData(this.id_bar);
      }, error: (err) => {
        console.log(err);
        this.snacBar.error('Algo salio mal', null);
      }
    });
  }

  /**
   * The function "getPromocionData" retrieves promotion data from a service based on the provided ID and
   * assigns it to the "dataPromocion" and "filteredData" variables.
   * @param {any} id - The `id` parameter is of type `any`, which means it can accept any data type. It
   * is used as an identifier to retrieve promotion data from the service.
   */
  getPromocionData(id: any) {
    this.service.getPromotionDataById(id).subscribe({
      next: (response) => {
        const responseAux: any = response;
        const data: any = responseAux.message;
        this.dataPromocion = data;
        this.filteredData = data;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  /**
   * The function `onFileSelected` checks if the selected image file meets the size requirements and
   * assigns it to `this.imageRegister` if it does, otherwise it displays an error message.
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
        } else {
          this.snacBar.error('La imagen debe ser menor o igual a 1080 x 1080', null);
        }
      };
      image.src = URL.createObjectURL(selectedFile);
    }
  }

  /**
   * The function `updateRegister()` updates a promotion by sending a POST request with the updated data
   * and image (if any) to the server.
   */
  updateRegister() {
    if (this.FormValidaeRegister.status == 'VALID' && this.id_promocion) {
      const data: any = this.FormValidaeRegister.value;
      data.old_image = this.oldImage;
      data.id_promocion = this.id_promocion;
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      if (this.imageRegister) {
        formData.append('image', this.imageRegister);
      }
      this.service.postUpdatePromotion(formData).subscribe({
        next: () => {
          this.cancelRegister();
          this.getPromocionData(this.id_bar);
          this.snacBar.success('promocion actualizada', null);
        }, error: (err) => {
          console.log(err);
        }
      });
    }
  }

  /**
   * The `deleteRegister()` function sends a request to delete a promotion, cancels the current
   * operation, retrieves updated promotion data, and displays a success or error message.
   */
  deleteRegister() {
    this.service.postDeletePromotion({ id_promocion: this.id_promocion }).subscribe({
      next: () => {
        this.cancelRegister();
        this.getPromocionData(this.id_bar);
        this.snacBar.success('promocion deleted', null);
      },
      error: () => {
        this.snacBar.error('Error in deleted promocion', null);
      },
    });
  }

  /**
   * The function "cancelRegister" resets the form, clears the old image, sets the promotion ID to null,
   * clears any validation errors, and clears the image register.
   */
  cancelRegister() {
    this.FormValidaeRegister.reset();
    this.oldImage = null;
    this.id_promocion = null;
    Object.keys(this.FormValidaeRegister.controls).forEach(key => {
      this.FormValidaeRegister.get(key)?.setErrors(null);
    });
    this.imageRegister = undefined;
  }

}
