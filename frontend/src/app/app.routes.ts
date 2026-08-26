import { Routes } from '@angular/router';
import { BookRoutes } from './pages/books/books.routes';
import { QuotesRoutes } from './pages/quotes/quotes.routes';
import { LoginUser } from './pages/login/login-user/login-user';
import { RegisterUser } from './pages/register/register-user/register-user';
import { authGuard } from './shared/guards/auth.guard';
import { Homepage } from './pages/homepage/homepage/homepage';

export const routes: Routes = [
    { path: '', component: Homepage, canActivate: [authGuard] },
    { path: 'books', children: BookRoutes, canActivate: [authGuard]},
    { path: 'quotes', children: QuotesRoutes, canActivate: [authGuard]},
    { path: 'login', component: LoginUser},
    { path: 'register', component: RegisterUser}
];


