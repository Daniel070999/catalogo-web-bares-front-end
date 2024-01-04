import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(private service: ServicesService, private route: Router) { }

  dataLogin: any;
  rol: any;

  ngOnInit(): void {
    let token = sessionStorage.getItem('authToken');
    if (token) {
      this.getDataSession();
      this.getRol();
    }
  }

/**
 * The function `getRol()` makes an HTTP request to the `getCheck()` service and assigns the response
 * message to the `rol` variable.
 */
  getRol() {
    this.service.getCheck().subscribe({
      next: response => {
        const resultsAux: any = response;
        this.rol = resultsAux.message;
      },
      error: err => {
        console.log(err);
      }
    });
  }

/**
 * The function `getDataSession` makes an HTTP request to retrieve session data and assigns the first
 * message from the response to the `dataLogin` variable.
 */
  getDataSession() {
    this.service.getDataSession().subscribe({
      next: response => {
        const resultsAux: any = response;
        this.dataLogin = resultsAux.message[0];
      },
      error: err => {
        console.log(err);

      }
    });
  }

  goNewMenu() {
    this.route.navigate(['newmenu']);
  }
  goViewMenu() {
    this.route.navigate(['viewmenu']);
  }
  goNewPromotion() {
    this.route.navigate(['newpromotion']);
  }
  goViewPromotion() {
    this.route.navigate(['viewpromotion']);
  }
  goNewEvent() {
    this.route.navigate(['newevent']);
  }

}
