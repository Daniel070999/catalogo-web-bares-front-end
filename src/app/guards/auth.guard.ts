import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: ServicesService, private router: Router) { }
  message:any=[];
  check(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const authToken = sessionStorage.getItem('authToken');
      const cookieValue = sessionStorage.getItem('cookieValue');
      console.log(authToken);
      console.log(cookieValue);

      this.service.getCheck({auth:authToken,cookie:cookieValue}).subscribe(response => {
        this.message = response;
        console.log(this.message);
        resolve(this.message.message === 'Ok');
      }, error => {
        console.log(error);
        resolve(false);
      });
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return this.check().then(isAuthorized => {
      if (isAuthorized) {
        return true; // Permite el acceso a la ruta
      } else {
        // Redirige a otra ruta si el acceso no está permitido
        return this.router.parseUrl('login');
      }
    });
  }
}
