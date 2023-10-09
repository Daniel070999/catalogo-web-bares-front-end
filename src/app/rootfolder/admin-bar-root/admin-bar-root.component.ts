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

  initializeFilteredData(): void {
    this.filteredData = this.dataBarAdminRol.map((item: any) => ({
      ...item,
      selectedValueBar: this.bar.find((barItem: any) => barItem.id_bar === item.id_bar),
      selectedValueRol: this.rol.find((rolItem: any) => rolItem.rol === item.rol),
    }));

    this.filteredData = this.filteredData;
  }

  search(): void {
    this.filteredData = this.filteredData.filter((item: { id_registro: any; usuario: any; email: any; }) => {
      return (
        (typeof item.id_registro === 'string' && item.id_registro.toLowerCase().includes(this.searchUser.toLowerCase())) ||
        item.usuario.toLowerCase().includes(this.searchUser.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchUser.toLowerCase())
      );
    });
  }

  obtainDataBar(registro: any, bar: any) {
    const data = {
      id_registro: registro.id_registro ?? 'null',
      id_bar: bar.id_bar ?? 'null'
    }
    console.log(data);

    this.service.postUpdateAdminBar(data).subscribe({
      next: response => {
        console.log(response);
      }, error: err => {
        console.log(err);
      }
    });
  }
  obtainDataRol(registro: any, rol: any) {
    const data = {
      id_registro: registro.id_registro ?? 'null',
      rol: rol.rol ?? 'null'
    }
    console.log(data);

    this.service.postUpdateAdminRol(data).subscribe({
      next: response => {
        console.log(response);
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
