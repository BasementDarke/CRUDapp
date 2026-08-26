import { inject, Injectable } from '@angular/core';
import { AuthServiceTs } from './auth.service';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private authenticated = false;
  authService = inject(AuthServiceTs)

  load() {
    return this.authService.meGet().pipe(tap(() => {
      this.authenticated = true
    }), catchError(() => {
      this.authenticated = false
      return of(null)
    }))
  }

  isAuthenticated(){
    return this.authenticated;
  }

  // Check /me endpoint
  // Check return type of /me endpoint
  // IF it is 401
  //    redirect to /login
  // ELSE
  //    redirect to a {homepage}
}
