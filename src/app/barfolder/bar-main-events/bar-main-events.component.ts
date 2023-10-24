import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bar-main-events',
  templateUrl: './bar-main-events.component.html',
  styleUrls: ['./bar-main-events.component.css']
})
export class BarMainEventsComponent implements OnChanges, OnInit {

  @Input() eventData: any;

  getEventData: any = [];
  gridItems: number = 0;
  gridSize: string = "";
  height: string = "";
  screenWidth: number = 0;

  ngOnInit(): void {
    this.onResize(['$event']);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventData']) {
      this.getEventData = changes['eventData'].currentValue;
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
