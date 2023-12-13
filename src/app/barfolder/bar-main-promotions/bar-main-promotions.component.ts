import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewImageComponent } from 'src/app/view-image/view-image.component';

@Component({
  selector: 'app-bar-main-promotions',
  templateUrl: './bar-main-promotions.component.html',
  styleUrls: ['./bar-main-promotions.component.css']
})
export class BarMainPromotionsComponent implements OnChanges, OnInit {

  @Input() promotionData: any;

  constructor(public dialog: MatDialog) { }


  getPromotionData: any = [];

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['promotionData']) {
      this.getPromotionData = changes['promotionData'].currentValue;

    }
  }
  formatFecha(fecha: string): string {
    const fechaDate = new Date(fecha);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return fechaDate.toLocaleString(undefined, options);
  }
  openFullScreen(imageUrl: any): void {
    this.dialog.open(ViewImageComponent, {
      data: { imageUrl: `http://localhost:3000/files/logopromotion/${imageUrl}` }
    });
  }

}
