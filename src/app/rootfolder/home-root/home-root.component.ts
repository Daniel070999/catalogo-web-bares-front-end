import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-root',
  templateUrl: './home-root.component.html',
  styleUrls: ['./home-root.component.css']
})
export class HomeRootComponent implements OnInit {

  constructor(private route: Router) { }

  screenWidth: number = 0;
  gridItems: number = 0;
  gridSize: string = "";


  ngOnInit(): void {
    this.onResize(['$event']);
    console.log(this.screenWidth);

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

  goAdminBar() {
    this.route.navigate(['adminbar']);
  }

  goCreateBar() {
    this.route.navigate(['createbar']);
  }
}
