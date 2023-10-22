import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bar-main-promotions',
  templateUrl: './bar-main-promotions.component.html',
  styleUrls: ['./bar-main-promotions.component.css']
})
export class BarMainPromotionsComponent implements OnChanges, OnInit {

  @Input() promotionData: any;

  getPromotionData: any = [];
  gridItems: number = 0;
  gridSize: string = "";
  height: string = "";
  screenWidth: number = 0;

  ngOnInit(): void {
    this.onResize(['$event']);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['promotionData']) {
      this.getPromotionData = changes['promotionData'].currentValue;
      console.log(this.height);
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 768 && this.screenWidth < 1499) {
      this.gridItems = 1;
      this.gridSize = "1";
      this.height = "2:1";
    } else if (this.screenWidth > 1500) {
      this.gridItems = 2;
      this.gridSize = "1";
      this.height = "2:1";
    } else {
      this.gridItems = 1;
      this.gridSize = "1";
      this.height = "1:1";
    }

  }
}
