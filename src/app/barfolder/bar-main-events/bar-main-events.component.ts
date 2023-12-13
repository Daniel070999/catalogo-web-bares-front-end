import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewImageComponent } from 'src/app/view-image/view-image.component';

@Component({
  selector: 'app-bar-main-events',
  templateUrl: './bar-main-events.component.html',
  styleUrls: ['./bar-main-events.component.css']
})
export class BarMainEventsComponent implements OnChanges, OnInit {

  @Input() eventData: any;
  constructor(public dialog: MatDialog) { }

  getEventData: any = [];

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventData']) {
      this.getEventData = changes['eventData'].currentValue;
    }
  }
  openFullScreen(imageUrl: any): void {
    this.dialog.open(ViewImageComponent, {
      data: { imageUrl: `http://localhost:3000/files/logoevent/${imageUrl}` }
    });
  }
}
