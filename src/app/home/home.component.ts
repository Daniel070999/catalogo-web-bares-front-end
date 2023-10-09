import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ServicesService } from '../services.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchBar: string = "";
  clearInput: boolean = false;
  screenWidth: number = 0;
  gridItems: number = 0;
  gridSize: string = "";
  bars: any = [];
  images: any = [];
  filteredData: any = [];
  loggin: boolean = false;
  @ViewChild('logoBar') logoBar?: ElementRef;

  constructor(private service: ServicesService, private btnSheet: MatBottomSheet, private route: Router) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem('authToken');
    if (token) {
      this.loggin = true;
    }
    this.onResize(['$event']);
    this.loadBars();


  };
  goLogin() {
    this.route.navigate(['login']);
  }
  goBar(bar: any) {
    this.route.navigate(['bar', bar]);
  }

  openBottomSheet(): void {
    this.btnSheet.open(BottomSheetComponent);
  }

  loadBars() {
    this.service.getBars().subscribe({
      next: (response) => {
        const resultsAux: any = response;
        this.bars = resultsAux.message;
        this.filteredData = resultsAux.message;
        console.log(this.bars.message);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }



  logOut() {
    this.service.postLogout().subscribe({
      next: response => {
        console.log(response);
        sessionStorage.clear();
        this.route.navigate(['']);
        this.loggin = false;
        this.route.navigate(['']);
      }, error: err => {
        console.log(err);
      }
    });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 768 && this.screenWidth < 1499) {
      this.gridItems = 2;
      this.gridSize = "60";
    } else if (this.screenWidth > 1500) {
      this.gridItems = 3;
      this.gridSize = "20";
    } else {
      this.gridItems = 1;
      this.gridSize = "30";
    }
  }

  btn_search() {
    console.log(this.filteredData);

    this.filteredData = this.filteredData.filter((item: { nombre: any; lema: any; descripcion: any; }) => {
      return (item.nombre.toLowerCase().includes(this.searchBar.toLowerCase()) ||
        item.lema.toLowerCase().includes(this.searchBar.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(this.searchBar.toLowerCase())
      );
    });
    this.filteredData = this.filteredData;
  }

  btn_clear() {

    this.searchBar = "";
    this.clearInput = false;
    this.loadBars();

  }

  typing() {
    if (this.searchBar == "") {
      this.clearInput = false;
      this.loadBars();
    } else {
      this.clearInput = true;
      this.btn_search();
    }

  }

}
