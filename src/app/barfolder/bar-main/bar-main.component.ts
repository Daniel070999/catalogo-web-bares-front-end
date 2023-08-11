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

  ngOnInit(): void {
    this.route.params.subscribe(response => {
      this.barParam = response['id'];
      if (this.barParam) {
        this.getBarData(this.barParam);
        this.getMenuData(this.barParam);
      }
    });
  }

  getBarData(id: any) {
    this.service.getBarDataById(id).subscribe(response => {
      const data: any = response;
      this.dataBar = data[0];
    }, err => {
      console.log(err);
    })
  }
  getMenuData(id: any) {
    this.service.getMenuDataById(id).subscribe(response => {
      const data: any = response;
      this.dataMenu = data;
    }, err => {
      console.log(err);
    })
  }
}
