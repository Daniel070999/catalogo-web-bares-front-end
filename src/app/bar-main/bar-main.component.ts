import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bar-main',
  templateUrl: './bar-main.component.html',
  styleUrls: ['./bar-main.component.css']
})
export class BarMainComponent implements OnInit {

  constructor(private route: ActivatedRoute){}

  barParam: any;

  ngOnInit(): void {
    this.route.params.subscribe(response =>{
      this.barParam = response['id'];
      console.log(response);
    });
  }

}
