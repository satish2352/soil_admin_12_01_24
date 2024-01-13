import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SessionRoutes } from './session.routing';
import { RouterModule } from '@angular/router';
import { SessionComponent } from './session/session.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [SessionComponent,LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SessionRoutes),
    ReactiveFormsModule
    



    
  ]
})
export class SessionModule { }
