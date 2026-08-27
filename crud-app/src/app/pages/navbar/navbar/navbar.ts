import { Component, inject } from '@angular/core';
import { SessionService } from '../../../shared/services/session.service';
import { RouterLink } from '@angular/router';
import { LogoutUser } from "../../logout/logout-user/logout-user";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LogoutUser],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class AppNavbar {
  private sessionService = inject(SessionService);

  readonly authorized = this.sessionService.authenticated;
}
