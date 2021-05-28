import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { DataUs, TokenWrapper } from '../models/iusers';
import { KeyckloakService } from './keyckloak.service';
import { LocalstorageService } from './localstorage.service';
import { SpringbootService } from './springboot.service';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  private tokenwrapper : TokenWrapper;
  private  userInfo = new Subject<DataUs>() ; //beahvior subject ! 
  private _isLoggedIn :boolean = false; 

  // store the URL so we can redirect after logging in
  private _redirectUrl: string;
  
  constructor(private router : Router,private keycloak:KeyckloakService,private storage:LocalstorageService , private springBootService:SpringbootService) { 
        

  }


  //res - crea interface interna .
  login(username:string,password:string): Observable<any> {
    
    this._isLoggedIn = false;
    
    return this.keycloak.getAccessToken(username,password).pipe(
      tap( (res)=>{
          this.tokenwrapper = res;
          console.log(this.tokenwrapper);
          this.storage.set("token-wrapper",this.tokenwrapper);
          this._isLoggedIn = true;
        },
      ),switchMap(response=>  {
          return this.loginWithToken(response.access_token);
      })
    ); 
  }
  
  loginWithToken(token : string):Observable<DataUs> {

    return this.springBootService.getToUserInfo(token).pipe(
        tap( resp => {
          this.userInfo.next(resp);
        })
    );
  }


  logout(): void {

    this._isLoggedIn = false;
    this.storage.clear();

    this.router.navigate(["/login"]);

  }
  

  public get userInfoObservable(): Observable<DataUs> {
    return this.userInfo.asObservable();
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
