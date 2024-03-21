import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private service: ServicesService, private router: Router) { }

  /**
   * The function `canActivate` checks the user's role based on a token and route configuration, and
   * redirects to the login page if the user does not have the required role.
   * @param {ActivatedRouteSnapshot} route - The `canActivate` method in the provided code snippet is a
   * guard in Angular that determines whether a route can be activated or not based on certain
   * conditions. The `route` parameter of the `canActivate` method is of type `ActivatedRouteSnapshot`,
   * which represents the route associated with a component loaded
   * @returns The `canActivate` method returns a Promise that resolves to a boolean value or a UrlTree.
   * The method first checks if a token is present in the sessionStorage and if the route matches certain
   * paths. If the conditions are met, it resolves the Promise with `true`.
   */
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
