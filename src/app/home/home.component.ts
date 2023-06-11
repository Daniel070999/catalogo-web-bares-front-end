import { Component, OnInit, HostListener } from '@angular/core';

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
  bars: any[] = [1, 2, 3, 4, 5];

  constructor() { }
  ngOnInit(): void {
    this.onResize(['$event']);
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 768) {
      this.gridItems = 2;
      this.gridSize = "80";
    } else {
      this.gridItems = 1;
      this.gridSize = "20";
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
