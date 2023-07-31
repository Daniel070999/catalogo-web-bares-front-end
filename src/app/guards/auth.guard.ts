import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: ServicesService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {

    /*this.service.getCheck().subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });*/
    console.log(this.service.getHeaders());
    /**
     * logica de autenticcion desde NODEjs
     */
    const isAuthorized = true;

    if (isAuthorized) {
      return true; // Permite el acceso a la ruta
    } else {
      // Redirige a otra ruta si el acceso no está permitido
      return this.router.parseUrl('login');
    }
  }
}
