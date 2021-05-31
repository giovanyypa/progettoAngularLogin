import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorSpringbootComponent } from './components/error-springboot/error-springboot.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeGuardGuard } from './guards/home-guard.guard';

const routes: Routes = [
  {
    path: '', redirectTo :'/login',pathMatch:'full'
  },
  {
    path:'login',component : LoginComponent
  },
  {
    path:'not-found',component : NotFoundComponent,canActivate: [HomeGuardGuard]
  },
  {
    path:'error-springboot',component : ErrorSpringbootComponent,canActivate: [HomeGuardGuard]
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
