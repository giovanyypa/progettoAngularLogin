import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsersServiceService } from '../services/users-service.service';

@Injectable({
  providedIn: 'root'
})
//simulazione della guardia per la home e altro.
export class HomeGuardGuard implements CanActivate {
  
  constructor(private userService: UsersServiceService, private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
   
      const url: string = state.url;

      return this.checkLogin(url);

    }
  
    checkLogin(url: string): boolean {
      if (this.userService.isLoggedIn) { 
        console.log("sono la guardia , " ,this.userService.isLoggedIn);
        return true; }
  
      // Store the attempted URL for redirecting
      this.userService.redirectUrl = url;       
  
      // Redirect to the login page
       this.router.navigate(['/login']);
       return false;
    } 


  }
  
