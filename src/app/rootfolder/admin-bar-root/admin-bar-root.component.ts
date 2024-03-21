import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-admin-bar-root',
  templateUrl: './admin-bar-root.component.html',
  styleUrls: ['./admin-bar-root.component.css']
})

export class AdminBarRootComponent implements OnInit {

  constructor(private service: ServicesService) { }

  clearInput: boolean = false;
  dataUser: any = [];
  searchUser: string = '';
  filteredData: any = [];
  selectedValueBar: any;
  selectedValueRol: any;
  dataBarAdminRol: any = [];


  bar: any = [];
  rol: any = [];

  ngOnInit(): void {
    this.service.getAllUser().subscribe({
      next: response => {
        const responseAux: any = response;
        this.dataUser = responseAux.message;
        this.search();
      }, error: err => {
        console.log(err);
      }
    });
    this.getAllBars();
    this.getAllRoles();
    this.getBarAdminRol();
  }

  /**
   * The function `initializeFilteredData` initializes the `filteredData` array by mapping and combining
   * data from `dataBarAdminRol`, `bar`, and `rol` arrays.
   */
  initializeFilteredData(): void {
    this.filteredData = this.dataBarAdminRol.map((item: any) => ({
      ...item,
      selectedValueBar: this.bar.find((barItem: any) => barItem.id_bar === item.id_bar),
      selectedValueRol: this.rol.find((rolItem: any) => rolItem.rol === item.rol),
    }));

    this.filteredData = this.filteredData;
  }

  /**
   * The search function filters data based on a search query input for id_registro, usuario, and email
   * fields.
   */
  search(): void {
    this.filteredData = this.filteredData.filter((item: { id_registro: any; usuario: any; email: any; }) => {
      return (
        (typeof item.id_registro === 'string' && item.id_registro.toLowerCase().includes(this.searchUser.toLowerCase())) ||
        item.usuario.toLowerCase().includes(this.searchUser.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchUser.toLowerCase())
      );
    });
  }

  /**
   * The `obtainDataBar` function in TypeScript obtains data from a given `registro` and `bar` object,
   * then posts the data to update an admin bar using a service.
   * @param {any} registro - The `registro` parameter seems to represent an object with an `id_registro`
   * property, and the `bar` parameter represents an object with an `id_bar` property. The
   * `obtainDataBar` function is creating a `data` object with `id_registro` and `id_bar`
   * @param {any} bar - The `bar` parameter in the `obtainDataBar` function seems to be an object that
   * contains information about a bar. The function extracts the `id_bar` property from the `bar` object
   * and assigns it to the `id_bar` key in the `data` object. If the
   */
  obtainDataBar(registro: any, bar: any) {
    const data = {
      id_registro: registro.id_registro ?? 'null',
      id_bar: bar.id_bar ?? 'null'
    }

    this.service.postUpdateAdminBar(data).subscribe({
      next: response => {
        console.log(response);
      }, error: err => {
        console.log(err);
      }
    });
  }

  /**
   * The function `obtainDataRol` obtains data from a given `registro` and `rol`, then posts the data to
   * update an admin role.
   * @param {any} registro - The `registro` parameter seems to be an object with a property
   * `id_registro`. If the `id_registro` property is not present in the `registro` object, the `??
   * 'null'` syntax is used to provide a default value of `'null'`.
   * @param {any} rol - The `rol` parameter in the `obtainDataRol` function seems to represent an object
   * with a property `rol`. If the `rol` parameter is passed as an argument to the function, it will
   * access the `rol` property of that object. If the `rol` property is not
   */
  obtainDataRol(registro: any, rol: any) {
    const data = {
      id_registro: registro.id_registro ?? 'null',
      rol: rol.rol ?? 'null'
    }

    this.service.postUpdateAdminRol(data).subscribe({
      next: response => {
      }, error: err => {
        console.log(err);
      }
    });
  }

  typing() {
    if (this.searchUser == "") {
      this.clearInput = false;
      this.initializeFilteredData();
    } else {
      this.clearInput = true;
    }

  }

/**
 * The function `getAllBars` makes an API call to retrieve a list of bars and logs the response to the
 * console.
 */
  getAllBars() {
    this.service.getBars().subscribe({
      next: response => {
        const responseAux: any = response;
        this.bar = responseAux.message;
        console.log(this.bar);
      }, error: err => {
        console.log(err);
      }
    });
  }

/**
 * The `getAllRoles` function makes an API call to retrieve roles and assigns the response to the `rol`
 * property.
 */
  getAllRoles() {
    this.service.getRoles().subscribe({
      next: response => {
        const responseAux: any = response;
        this.rol = responseAux.message;
        console.log(this.rol);
      }, error: err => {
        console.log(err);
      }
    });
  }

/**
 * The function `getBarAdminRol` makes an API call to retrieve bar admin roles and initializes filtered
 * data based on the response.
 */
  getBarAdminRol() {
    this.service.getBarAdminRol().subscribe({
      next: response => {
        const responseAux: any = response;
        this.dataBarAdminRol = responseAux.message;
        console.log(this.dataBarAdminRol);

        this.initializeFilteredData();
      }, error: err => {
        console.log(err);
      }
    });
  }

  btn_clear() {
    this.initializeFilteredData();
    this.searchUser = "";
    this.clearInput = false;
    this.search();

  }
}
