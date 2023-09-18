import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bar-main-menu',
  templateUrl: './bar-main-menu.component.html',
  styleUrls: ['./bar-main-menu.component.css']
})
export class BarMainMenuComponent implements OnChanges, OnInit {

  @Input() menuData: any;

  getMenuData: any = [];
  gridItems: number = 0;
  gridSize: string = "";
  screenWidth: number = 0;

  ngOnInit(): void {
    this.onResize(['$event']);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menuData']) {
      this.getMenuData = changes['menuData'].currentValue;
      console.log(this.getMenuData);
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 768 && this.screenWidth < 1499) {
      this.gridItems = 2;
      this.gridSize = "1";
    } else if (this.screenWidth > 1500) {
      this.gridItems = 3;
      this.gridSize = "30";
    } else {
      this.gridItems = 1;
      this.gridSize = "30";
    }

  }
}
