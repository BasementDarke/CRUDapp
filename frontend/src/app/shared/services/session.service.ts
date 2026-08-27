import { inject, Injectable, signal } from '@angular/core';
import { AuthServiceTs } from './auth.service';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _authenticated = signal<boolean>(false);
  readonly authenticated = this._authenticated.asReadonly()
  authService = inject(AuthServiceTs)

  load() {
    return this.checkUserAuthentication()
  }

  public checkUserAuthentication() {
    return this.authService.meGet().pipe(tap(() => {
      this._authenticated.set(true)
    }), catchError(() => {
      this._authenticated.set(false)
      return of(null)
    }))
  }
}
