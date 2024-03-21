import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewImageComponent } from 'src/app/view-image/view-image.component';

@Component({
  selector: 'app-bar-main-promotions',
  templateUrl: './bar-main-promotions.component.html',
  styleUrls: ['./bar-main-promotions.component.css']
})
export class BarMainPromotionsComponent implements OnChanges {

  @Input() promotionData: any;

  constructor(public dialog: MatDialog) { }


  getPromotionData: any = [];

  /**
 * The ngOnChanges function in TypeScript updates the value of getEventData when the eventData input
 * property changes.
 * @param {SimpleChanges} changes - The `changes` parameter in the `ngOnChanges` method is an object
 * of type `SimpleChanges` that contains the changed properties of the component. It provides
 * information about the previous and current values of the input properties that have changed.
 */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['promotionData']) {
      this.getPromotionData = changes['promotionData'].currentValue;

    }
  }


  /**
   * The function `formatFecha` takes a string representing a date, converts it to a Date object, and
   * returns a formatted string with the date and time in a specific format.
   * @param {string} fecha - The `formatFecha` function takes a `fecha` parameter, which is expected to
   * be a string representing a date. The function then converts this string into a `Date` object and
   * formats it using the `toLocaleString` method with specific options for displaying the year, month,
   * day, hour,
   * @returns The `formatFecha` function takes a string `fecha` representing a date, converts it to a
   * `Date` object, and then formats it using the `toLocaleString` method with the specified options for
   * year, month, day, hour, and minute. The formatted date string is then returned by the function.
   */
  formatFecha(fecha: string): string {
    const fechaDate = new Date(fecha);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return fechaDate.toLocaleString(undefined, options);
  }

  /* The `openFullScreen` method in the `BarMainEventsComponent` class is a function that opens a dialog
window to view an image. It takes an `imageUrl` parameter, which is the URL of the image to be
displayed in the dialog. */
  openFullScreen(imageUrl: any): void {
    this.dialog.open(ViewImageComponent, {
      data: { imageUrl: `http://localhost:3000/files/logopromotion/${imageUrl}` }
    });
  }

}
