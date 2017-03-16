import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// AuthGuard
//
// Whether User login successfully.
// Enter the platform if login successfully

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // If user has logined successfully, return to the other page
    if (localStorage.getItem('currentUser')) {
      return true;
    }

    // If logined in error return to login page
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
