import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  constructor(private service: ServicesService, private route: Router) { }

  ngOnInit(): void {
    
  }
  goLogin() {
    this.route.navigate(['login']);
  }

  logOut() {
    this.service.postLogout().subscribe(response => {
      console.log(response);
      sessionStorage.clear();
      this.route.navigate(['']);
    }, error => {
      console.log(error);
    });
  }
}
