import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewImageComponent } from 'src/app/view-image/view-image.component';

@Component({
  selector: 'app-bar-main-menu',
  templateUrl: './bar-main-menu.component.html',
  styleUrls: ['./bar-main-menu.component.css']
})
export class BarMainMenuComponent implements OnChanges, OnInit {

  constructor(public dialog: MatDialog) { }

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
  openFullScreen(imageUrl: any): void {
    this.dialog.open(ViewImageComponent, {
      data: { imageUrl: `http://localhost:3000/files/logomenu/${imageUrl}` }
    });
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
