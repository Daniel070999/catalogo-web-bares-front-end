import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(private route: Router) { }



  ngOnInit(): void {

  }


  goNewMenu() {
    this.route.navigate(['newmenu']);
  }
  goNewPromotion() {
    this.route.navigate(['newpromotion']);
  }

}
