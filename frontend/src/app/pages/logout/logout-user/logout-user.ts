import { Component, inject } from '@angular/core';
import { AuthServiceTs } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { SessionService } from '../../../shared/services/session.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-logout-user',
  imports: [RouterLink],
  templateUrl: './logout-user.html',
  styleUrl: './logout-user.css',
})
export class LogoutUser {
  authService = inject(AuthServiceTs)
  private toastService = inject(ToastService);
  sessionService = inject(SessionService)
  router = inject(Router)


  logoutUser(){
    this.authService.logout()
    .pipe(switchMap(() => this.sessionService.checkUserAuthentication()))
    .subscribe(() => {
      this.toastService.show({message: "Logged out.", classname:"bg-success text-light", delay: 10000 })
      this.router.navigateByUrl('login')
    })
  }
}
