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
    this.service.getBarDataById(id).subscribe({
      next: (response) => {
        const dataAux: any = response;
        const data: any = dataAux.message;
        this.dataBar = data[0];
        console.log(this.dataBar);

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
}
