import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent {

  constructor(private btnSheet: MatBottomSheetRef<HomeComponent>) { }

  openLink(event: MouseEvent): void {
    this.btnSheet.dismiss();
    event.preventDefault();
  }
}
