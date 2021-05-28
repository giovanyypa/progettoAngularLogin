import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataUs, User } from '../models/iusers';
import { KeyckloakService } from './keyckloak.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  userTest : User ;
  private _isLoggedIn :boolean = false; 

  // store the URL so we can redirect after logging in
  private _redirectUrl: string;
  
  constructor(private router : Router,private keycloak:KeyckloakService,private storage:LocalstorageService) { 
        

  }

  login(username:string,password:string): Observable<Boolean> {
    
    
    this.keycloak.getTokenAccess(username,password)
        .subscribe((res:any)=>{
          console.log(res);
          this.storage.set("access_token",res.access_token);
          this.storage.set("refresh_token",res.refresh_token); 
          this._isLoggedIn = true;
        }),
        (error) => {
          console.log("not authorization");
          this._isLoggedIn = false;
        };

        return of(this._isLoggedIn);
    
  }

  logout(): void {

    this._isLoggedIn = false;
    //this.router.navigate(["/login"]);

  }
  



  public get isLoggedIn ():boolean{

    return this._isLoggedIn;

  }
  public set isLoggedIn (valAccess : boolean){

    this._isLoggedIn = valAccess;

  }

  public get redirectUrl():string{
    return this._redirectUrl;
  }
  
  public set redirectUrl(url:string){
     this._redirectUrl = url;
  }

}
