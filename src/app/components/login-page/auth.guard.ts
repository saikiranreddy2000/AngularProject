import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const allowedRoles = next.data.roles as Array<string>;
    if (allowedRoles && allowedRoles.length > 0) {
      const user = this.userService.getUser();
      const userRole = user ? user.role : '';

      if (allowedRoles.includes(userRole)) {
        return true;
      }
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
