import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private service: ServicesService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {

    const token = sessionStorage.getItem('authToken');
    const routes = ['', 'bar/:id'];
    if (routes.includes(route.routeConfig?.path || '') && !token) {
      return Promise.resolve(true);
    }

    return this.service.getCheck().toPromise().then(response => {
      const message: any = response;
      const role = message.message;
      console.log(role);

      const rootRoutes = ['root', 'adminbar', 'createbar', 'viewbar'];
      const adminRoutes = ['admin', 'newmenu', 'newpromotion', 'newevent', 'viewmenu', 'viewpromotion'];
      const userRoutes = ['', 'bar/:id'];

      switch (role) {
        case '1':
          if (userRoutes.includes(route.routeConfig?.path || '')) {
            return true;
          }
          break;
        case '2':
          if (adminRoutes.includes(route.routeConfig?.path || '')) {
            return true;
          }
          break;
        case '3':
          if (rootRoutes.includes(route.routeConfig?.path || '')) {
            return true;
          }
          break;
      }

      return this.router.parseUrl('/login');

    }).catch(error => {
      console.log(error);
      return this.router.parseUrl('/login');
    });
  }
}
