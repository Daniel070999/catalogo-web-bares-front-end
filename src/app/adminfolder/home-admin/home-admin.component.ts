import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  constructor(private service: ServicesService) { }

  ver() {
    this.service.getCheck(this.service.getHeaders()).subscribe(response => {
      console.log(response);
    });
  }

}
