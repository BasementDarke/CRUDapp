import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { SessionService } from "../services/session.service";

export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot,
) => {
    const router = inject(Router);
  const sessionService = inject(SessionService);
  if(sessionService.authenticated()){
    return true
  }
  return router.createUrlTree(['/login'])
};
