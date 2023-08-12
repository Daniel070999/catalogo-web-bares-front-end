import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private service: ServicesService, private route: Router) { }
  loggin: boolean = false;

  ngOnInit(): void {
    let token = sessionStorage.getItem('authToken');
    if (token) {
      this.loggin = true;
    }

  }

  goLogin() {
    this.route.navigate(['login']);
  }

  logOut() {
    this.service.postLogout().subscribe(response => {
      console.log(response);
      sessionStorage.clear();
      this.route.navigate(['']);
      this.loggin = false;
      this.route.navigate(['']);
    }, error => {
      console.log(error);
    });
  }

}
