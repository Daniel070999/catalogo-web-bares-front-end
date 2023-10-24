import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-bar-main',
  templateUrl: './bar-main.component.html',
  styleUrls: ['./bar-main.component.css']
})
export class BarMainComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: ServicesService) { }

  barParam: any;
  dataBar: any = [];
  dataMenu: any = [];
  dataPromotion: any = [];
  dataEvent: any = [];

  ngOnInit(): void {
    this.route.params.subscribe(response => {
      this.barParam = response['id'];
      if (this.barParam) {
        this.getBarData(this.barParam);
        this.getMenuData(this.barParam);
        this.getPromotionData(this.barParam);
        this.getEventData(this.barParam);
      }
    });
  }

  getBarData(id: any) {
    this.service.getBarDataById(id).subscribe({
      next: (response) => {
        const dataAux: any = response;
        const data: any = dataAux.message;
        this.dataBar = data[0];
      }, error: (err) => {
        console.log(err);
      }
    });
  }
  getMenuData(id: any) {
    this.service.getMenuDataById(id).subscribe({
      next: (response) => {
        const responseAux: any = response;
        const data: any = responseAux.message;
        this.dataMenu = data;
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  getPromotionData(id: any) {
    this.service.getPromotionDataById(id).subscribe({
      next: (response) => {
        const responseAux: any = response;
        const data: any = responseAux.message;
        this.dataPromotion = data;
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  getEventData(id: any) {
    this.service.getEventDataById(id).subscribe({
      next: (response) => {
        const responseAux: any = response;
        const data: any = responseAux.message;
        this.dataEvent = data;
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
