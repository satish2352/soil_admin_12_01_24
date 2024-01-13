import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { HelperService } from '../../helper.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }


  constructor(private router: Router, private userAuthService: HelperService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userAuthService.getLocalStorageUser()) {
      // let role = route.data['dataofrole'] as Array<string>;
      // if (role) {
      //   var match = this.userAuthService.roleMatch(['admin']);
      //   if (match) {
      //     return true;
      //   }
      //   else {
      //     this.router.navigate(['forbidden']);
      //   }
      // }
      return true;
    } else {
      this.router.navigate(['/session/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
