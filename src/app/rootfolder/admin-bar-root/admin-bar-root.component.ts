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
  dataMenu: any = [];
  searchUser: string = '';
  filteredData: any = [];
  selectedValueBar: any;
  selectedValueRol: any;


  bar: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  rol: any[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
  ];

  ngOnInit(): void {
    this.service.getAllUser().subscribe(response => {
      this.dataMenu = response;
      this.search();
    }, err => {
      console.log(err);
    });
  }


  search(): void {
    this.filteredData = this.dataMenu.filter((item: { usuario: any; email: any; }) => {
      return item.usuario.toLowerCase().includes(this.searchUser.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchUser.toLowerCase());
    });
  }

  typing() {

    if (this.searchUser == "") {
      this.clearInput = false;
    } else {
      this.clearInput = true;
    }

  }

  btn_clear() {

    this.searchUser = "";
    this.clearInput = false;
    this.search();

  }
}
