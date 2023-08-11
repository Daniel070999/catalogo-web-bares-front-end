import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bar-main-menu',
  templateUrl: './bar-main-menu.component.html',
  styleUrls: ['./bar-main-menu.component.css']
})
export class BarMainMenuComponent implements OnChanges {


  @Input() menuData: any;

  getMenuData: any = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menuData']) {
      this.getMenuData = changes['menuData'].currentValue;
      console.log(this.getMenuData);
    }
  }
}
