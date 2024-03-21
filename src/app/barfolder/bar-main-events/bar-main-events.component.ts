import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewImageComponent } from 'src/app/view-image/view-image.component';

@Component({
  selector: 'app-bar-main-events',
  templateUrl: './bar-main-events.component.html',
  styleUrls: ['./bar-main-events.component.css']
})
export class BarMainEventsComponent implements OnChanges {

  @Input() eventData: any;
  constructor(public dialog: MatDialog) { }

  getEventData: any = [];

  /**
   * The ngOnChanges function in TypeScript updates the value of getEventData when the eventData input
   * property changes.
   * @param {SimpleChanges} changes - The `changes` parameter in the `ngOnChanges` method is an object
   * of type `SimpleChanges` that contains the changed properties of the component. It provides
   * information about the previous and current values of the input properties that have changed.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventData']) {
      this.getEventData = changes['eventData'].currentValue;
    }
  }

  /* The `openFullScreen` method in the `BarMainEventsComponent` class is a function that opens a dialog
  window to view an image. It takes an `imageUrl` parameter, which is the URL of the image to be
  displayed in the dialog. */
  openFullScreen(imageUrl: any): void {
    this.dialog.open(ViewImageComponent, {
      data: { imageUrl: `http://localhost:3000/files/logoevent/${imageUrl}` }
    });
  }
}
