import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-root',
  templateUrl: './home-root.component.html',
  styleUrls: ['./home-root.component.css']
})
export class HomeRootComponent implements OnInit {

  constructor(private route: Router) { }



  ngOnInit(): void {

  }

  goAdminBar() {
    this.route.navigate(['adminbar']);
  }

  goCreateBar() {
    this.route.navigate(['createbar']);
  }
}
