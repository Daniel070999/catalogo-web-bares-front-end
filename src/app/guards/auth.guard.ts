import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: ServicesService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    const token = sessionStorage.getItem('authToken');
    if (route.routeConfig?.path === '' && !token) {
      return Promise.resolve(true);
    }

    return this.service.getCheck().toPromise().then(response => {
      const message: any = response;
      const role = message.message;
      console.log(role);

      const adminRoutes = ['admin','newmenu'];
      const userRoutes = [''];

      if (role === 1 && userRoutes.includes(route.routeConfig?.path || '')) {
        return true;
      } else if (role === 2 && adminRoutes.includes(route.routeConfig?.path || '')) {
        return true;
      } else {
        return this.router.parseUrl('/login');
      }
    }).catch(error => {
      console.log(error);
      return this.router.parseUrl('/login');
    });
  }
}
