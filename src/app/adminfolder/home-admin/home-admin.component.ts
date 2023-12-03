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
  goNewEvent() {
    this.route.navigate(['newevent']);
  }

}
