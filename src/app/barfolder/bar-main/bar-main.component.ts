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
  dataPromotion: any = [];
  dataEvent: any = [];
  dataLogin: any;
  rol: any;

  ngOnInit(): void {
    this.route.params.subscribe(response => {
      this.barParam = response['id'];
      if (this.barParam) {
        this.getBarData(this.barParam);
        this.getMenuData(this.barParam);
        this.getPromotionData(this.barParam);
        this.getEventData(this.barParam);
      }
      let token = sessionStorage.getItem('authToken');
      if (token) {
        this.getDataSession();
        this.getRol();
      }
    });
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

  /**
   * The function `getBarData` retrieves bar data by ID from a service and assigns it to a variable.
   * @param {any} id - The `id` parameter is used to identify the specific bar data that needs to be
   * retrieved. It is passed to the `getBarDataById` method of the `service` object.
   */
  getBarData(id: any) {
    this.service.getBarDataById(id).subscribe({
      next: (response) => {
        const dataAux: any = response;
        const data: any = dataAux.message;
        this.dataBar = data[0];
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  /**
   * The `getMenuData` function retrieves menu data from a service based on a given ID and assigns it to
   * the `dataMenu` variable.
   * @param {any} id - The `id` parameter is of type `any`, which means it can accept any data type. It
   * is used as an identifier to retrieve menu data from the service.
   */
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

  /**
   * The function `getPromotionData` retrieves promotion data from a service based on the provided ID and
   * assigns it to the `dataPromotion` variable.
   * @param {any} id - The `id` parameter is the identifier of the promotion data that you want to
   * retrieve. It can be of any type.
   */
  getPromotionData(id: any) {
    this.service.getPromotionDataById(id).subscribe({
      next: (response) => {
        const responseAux: any = response;
        const data: any = responseAux.message;
        this.dataPromotion = data;
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  /**
 * The function `getEventData` retrieves event data from a service based on the provided ID and
 * assigns it to the `dataEvent` variable.
 * @param {any} id - The `id` parameter is the identifier of the event data that you want to
 * retrieve. It can be of any type.
 */
  getEventData(id: any) {
    this.service.getEventDataById(id).subscribe({
      next: (response) => {
        const responseAux: any = response;
        const data: any = responseAux.message;
        this.dataEvent = data;
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
