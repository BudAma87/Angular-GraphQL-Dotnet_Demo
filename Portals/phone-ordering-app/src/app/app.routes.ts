import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PhonesComponent } from './pages/phones/phones.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'phones', component: PhonesComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
  ];
