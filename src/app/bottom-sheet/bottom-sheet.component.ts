import { Component, Inject } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Router } from "@angular/router";
import { ServicesService } from "../services.service";

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent {
  dataBar: any;
  dataEvent: any;
  dataPromotion: any;

  constructor(private servie: ServicesService, private route: Router, private btnSheet: MatBottomSheetRef, @Inject(MAT_BOTTOM_SHEET_DATA) private data: { barData: any }) {
    this.dataBar = data;
    this.getAllEvents();
    this.getAllPromotions();
  }

  async getAllEvents() {
    await this.servie.getEventDataById(this.dataBar.id_bar).subscribe({
      next: response => {
        const resultsAux: any = response;
        this.dataEvent = resultsAux.message;
      },
      error: err=>{
        console.log(err);
      }
    });
}
async getAllPromotions() {
    await this.servie.getPromotionDataById(this.dataBar.id_bar).subscribe({
      next: response => {
        const resultsAux: any = response;
        this.dataPromotion = resultsAux.message;
      },
      error: err=>{
        console.log(err);
      }
    });
}

  goBar(bar: any) {
    this.route.navigate(['bar', bar]);
    this.btnSheet.dismiss();
  }

  panelOpenState = false;
  openLink(event: MouseEvent): void {
    this.btnSheet.dismiss();
    event.preventDefault();
  }
}
