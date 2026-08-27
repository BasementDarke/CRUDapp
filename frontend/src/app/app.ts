import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NgbAlert, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsComponent } from './pages/toasts/toasts-component/toasts-component';
import { AppNavbar } from './pages/navbar/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, RouterLink, NgbModule, NgbAlert, ToastsComponent, AppNavbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
