import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HomeGuardGuard } from './guards/home-guard.guard';

const routes: Routes = [
  {
    path: '', redirectTo :'/login',pathMatch:'full'
  },
  {
    path:'login',component : LoginComponent
  },
  {
    path:'home',component : HomeComponent,canActivate: [HomeGuardGuard],
  },
  {
    path:'**',redirectTo :''
  }
];

//useHash da tenere o no ? . 
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
