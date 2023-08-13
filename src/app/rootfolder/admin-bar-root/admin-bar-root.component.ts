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
    this.service.getAllUser().subscribe(response => {
      this.dataUser = response;
      this.search();
    }, err => {
      console.log(err);
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

  obtainDataBar(item: any, id_bar: any) {
    console.log('id_registro:', item.id_registro ?? '');
    console.log('id_bar:', id_bar.id_bar ?? '');
  }
  obtainDataRol(item: any, rol: any) {
    console.log('id_registro:', item.id_registro);
    console.log('rol:', rol.rol);
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
    this.service.getBars().subscribe(response => {
      this.bar = response;
      console.log(this.bar);
    }, err => {
      console.log(err);
    });
  }
  getAllRoles() {
    this.service.getRoles().subscribe(response => {
      this.rol = response;
      console.log(this.rol);
    }, err => {
      console.log(err);
    });
  }
  getBarAdminRol() {
    this.service.getBarAdminRol().subscribe(response => {
      this.dataBarAdminRol = response;
      console.log(this.dataBarAdminRol);

      this.initializeFilteredData();
    }, err => {
      console.log(err);
    });

  }
  btn_clear() {
    this.initializeFilteredData();
    this.searchUser = "";
    this.clearInput = false;
    this.search();

  }
}
