import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SessionComponent } from './session/session.component';

export const SessionRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SessionComponent,
    children: [{
      path: 'login',
      component: LoginComponent
    }]
  }];