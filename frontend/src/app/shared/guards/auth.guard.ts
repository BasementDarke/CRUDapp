import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { SessionService } from "../services/session.service";

export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
) => {
    const router = inject(Router);
  const authService = inject(SessionService);
  if(authService.isAuthenticated()){
    return true
  }
  return router.createUrlTree(['/login'])
};
