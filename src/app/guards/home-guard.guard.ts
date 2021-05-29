import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { UsersServiceService } from '../services/users-service.service';

@Injectable({
  providedIn: 'root'
})
//simulazione della guardia.
//attenzione e' solo una simulazione.
export class HomeGuardGuard implements CanActivate {
  
  constructor(private storage :LocalstorageService, private router: Router,private userService :UsersServiceService) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
   
      const url: string = state.url;

      return this.checkLogin(url);

    }
  
    checkLogin(url: string): boolean {
      if (this.storage.get("token-wrapper")) { 
        console.log("sono la guardia , " ,this.storage.get("token-wrapper"));
        return true; }
  
      // Store the attempted URL for redirecting
      this.userService.redirectUrl = url;       
  
      // Redirect to the login page
       this.router.navigate(['/login']).then(_ => false);
      
    } 

  }
  
