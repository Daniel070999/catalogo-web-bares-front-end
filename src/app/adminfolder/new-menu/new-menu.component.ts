import { Component, OnInit } from '@angular/core';
import { find } from 'rxjs';
import { ServicesService } from 'src/app/services.service';
import { RegisterModel, RegisterNewMenu } from 'src/app/utils';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.css']
})
export class NewMenuComponent implements OnInit {
  constructor(private service: ServicesService) { }

  token = sessionStorage.getItem('authToken');
  id_bar: any;

  ngOnInit(): void {
    if (this.token) {
      this.findById(this.token);
    }
  }

  findById(token: any) {
    this.service.getFindById(token).subscribe(response => {
      const id_bar_aux: any = response;
      this.id_bar = id_bar_aux[0].id_bar;
  }, err => {
  console.log(err);
});

  }

registerName: string = "";
registerDescription: string = "";
registerPrice: string = "";
register() {
  const newMenu: RegisterNewMenu = {
    nombre: this.registerName,
    descripcion: this.registerDescription,
    precio: this.registerPrice,
    id_bar: this.id_bar,
  };
  this.service.postRegisterNewMenu(newMenu).subscribe(response => {
    console.log(response);
  }, error => {
    console.log(error);
  });
}
}
