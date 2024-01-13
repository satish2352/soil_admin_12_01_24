import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ForbiddenComponent } from './commonpages/forbidden/forbidden.component';



// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'admin',
//     pathMatch: 'full'
//   },
//   {
//     path: 'admin',
//     loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
  {
    path: 'session', loadChildren: () =>
      import('./session/session.module').then(m => m.SessionModule)
  },
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    // data:{'dataofrole':['admin']},
    runGuardsAndResolvers: 'always',
    children: [{
      path: 'admin', loadChildren: () =>
        import('./admin/admin.module').then(m => m.AdminModule)
    }
    ],
  },
  {
    path:'forbidden',
    component:ForbiddenComponent
  },
  {
    path: '**',
    redirectTo: 'session'
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
