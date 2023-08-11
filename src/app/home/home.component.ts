import { Component, OnInit, HostListener } from '@angular/core';
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

  constructor(private barServices: ServicesService, private btnSheet: MatBottomSheet, private route: Router) { }

  ngOnInit(): void {

    this.onResize(['$event']);
    this.loadBars();

  };

  goBar(bar: any) {
    this.route.navigate(['bar',bar]);
  }

  openBottomSheet(): void {
    this.btnSheet.open(BottomSheetComponent);
  }

  loadBars() {

    this.barServices.getBars().subscribe(response => {
      console.log(response);
      this.bars = response;
    }, error => {
      console.log(error);
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

    console.log(this.searchBar);

  }

  btn_clear() {

    this.searchBar = "";
    this.clearInput = false;

  }

  typing() {

    if (this.searchBar == "") {
      this.clearInput = false;
    } else {
      this.clearInput = true;
    }

  }

}
