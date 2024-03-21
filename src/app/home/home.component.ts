import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ServicesService } from '../services.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { Router } from '@angular/router';
import { ViewImageComponent } from '../view-image/view-image.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private service: ServicesService, private btnSheet: MatBottomSheet, private route: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem('authToken');
    if (token) {
      this.loggin = true;
    }
    this.onResize(['$event']);
    this.loadBars();


  };

  /* The `openFullScreen` method in the `BarMainEventsComponent` class is a function that opens a dialog
window to view an image. It takes an `imageUrl` parameter, which is the URL of the image to be
displayed in the dialog. */
  openFullScreen(imageUrl: any): void {
    this.dialog.open(ViewImageComponent, {
      data: { imageUrl: `http://localhost:3000/files/logobar/${imageUrl}` }
    });
  }

  goLogin() {
    this.route.navigate(['login']);
  }
  goBar(bar: any) {
    this.route.navigate(['bar', bar]);
  }

  openBottomSheet(barData: any): void {

    this.btnSheet.open(BottomSheetComponent, { data: barData });
  }

  /**
   * The `loadBars` function in TypeScript loads bars data from a service and assigns it to the `bars`
   * and `filteredData` properties, with error handling included.
   */
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



  /**
   * The `logOut` function logs out the user by sending a POST request to the server, clearing the
   * session storage, and navigating to the home page while handling any errors that may occur.
   */
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

  /**
   * The `btn_search` function filters data based on a search input and updates the filtered data.
   */
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
