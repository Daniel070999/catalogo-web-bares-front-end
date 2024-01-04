import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-view-menu',
  templateUrl: './view-menu.component.html',
  styleUrls: ['./view-menu.component.css']
})
export class ViewMenuComponent implements OnInit {

  constructor(private service: ServicesService, private snacBar: SnackbarService) { }
  dataMenu: any = [];
  token = sessionStorage.getItem('authToken');
  id_bar: any;
  clearInput: boolean = false;
  searchMenu: string = '';
  filteredData: any = [];
  menu: any = [];
  oldImage: any;
  id_menu: any;

  imageRegister?: File;

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

  typing() {
    if (this.searchMenu == "") {
      this.clearInput = false;
    } else {
      this.clearInput = true;
    }
  }


  /* The `search()` function is used to filter the `filteredData` array based on the `searchMenu` value.
  It filters the array by checking if the `id_menu` or `nombre` properties of each item in the array
  contain the `searchMenu` value (case-insensitive). The filtered results are then assigned back to
  the `filteredData` array. */
  search(): void {
    this.filteredData = this.filteredData.filter((item: { nombre: any; id_menu: any; }) => {
      return (
        (typeof item.id_menu === 'string' && item.id_menu.toLowerCase().includes(this.searchMenu.toLowerCase())) ||
        item.nombre.toLowerCase().includes(this.searchMenu.toLowerCase())
      );
    });
  }
  btn_clear() {
    this.getMenuData(this.id_bar);
    this.searchMenu = "";
    this.clearInput = false;
    this.search();
  }

  /**
   * The function `menuSelect` is used to select a menu item by its ID and retrieve its details from the
   * server.
   * @param {any} id - The parameter "id" is of type "any", which means it can accept any data type. It
   * is used as an identifier for selecting a menu item.
   */
  menuSelect(id: any) {
    const data = {
      id_menu: id
    }
    this.id_menu = id;
    this.service.getMenuById(data).subscribe({
      next: (response) => {
        const responseAux: any = response;
        this.oldImage = responseAux.message[0].image;
        let data = {
          'nombre': responseAux.message[0].nombre,
          'descripcion': responseAux.message[0].descripcion,
          'precio': responseAux.message[0].precio
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
   * The `findById` function retrieves data from a service using a token, extracts the `id_bar` value
   * from the response, and calls another function to get menu data based on the `id_bar`.
   * @param {any} token - The token parameter is used to identify a specific item or resource in the
   * system. It is passed to the service's getFindById method to retrieve the corresponding data.
   */
  findById(token: any) {
    this.service.getFindById(token).subscribe({
      next: (response) => {
        const responseAux: any = response;
        const id_bar_aux: any = responseAux.message;
        this.id_bar = id_bar_aux[0].id_bar;
        this.getMenuData(this.id_bar);
      }, error: (err) => {
        console.log(err);
        this.snacBar.error('Algo salio mal', null);
      }
    });
  }

  /**
   * The `getMenuData` function retrieves menu data from a service based on an ID and assigns it to the
   * `dataMenu` and `filteredData` variables.
   * @param {any} id - The `id` parameter is of type `any`, which means it can accept any data type. It
   * is used as an identifier to retrieve menu data from the service.
   */
  getMenuData(id: any) {
    this.service.getMenuDataById(id).subscribe({
      next: (response) => {
        const responseAux: any = response;
        const data: any = responseAux.message;
        this.dataMenu = data;
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
   * The function `updateRegister()` updates a menu item by sending a POST request with the updated data
   * and image (if any) to the server.
   */
  updateRegister() {
    if (this.FormValidaeRegister.status == 'VALID' && this.id_menu) {
      const data: any = this.FormValidaeRegister.value;
      data.old_image = this.oldImage;
      data.id_menu = this.id_menu;
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      if (this.imageRegister) {
        formData.append('image', this.imageRegister);
      }
      console.log(formData);
      this.service.postUpdateMenu(formData).subscribe({
        next: () => {
          this.cancelRegister();
          this.getMenuData(this.id_bar);
          this.snacBar.success('Menu actualizado', null);
        }, error: (err) => {
          console.log(err);
        }
      });
    }
  }

  /**
   * The `deleteRegister` function sends a request to delete a menu item, cancels the current
   * registration, retrieves updated menu data, and displays a success or error message.
   */
  deleteRegister() {
    this.service.postDeleteMenu({ id_menu: this.id_menu }).subscribe({
      next: () => {
        this.cancelRegister();
        this.getMenuData(this.id_bar);
        this.snacBar.success('Menu deleted', null);
      },
      error: () => {
        this.snacBar.error('Error in deleted menu', null);
      },
    });
  }

  /**
   * The function "cancelRegister" resets the form, clears the old image, sets the menu ID to null,
   * clears any validation errors, and clears the image register.
   */
  cancelRegister() {
    this.FormValidaeRegister.reset();
    this.oldImage = null;
    this.id_menu = null;
    Object.keys(this.FormValidaeRegister.controls).forEach(key => {
      this.FormValidaeRegister.get(key)?.setErrors(null);
    });
    this.imageRegister = undefined;
  }

}
