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

  // store the URL so we can redirect after logging in
  private _redirectUrl: string;
  
  constructor(private router : Router,private keycloak:KeyckloakService,private storage:LocalstorageService , private springBootService:SpringbootService) {}


  //
  login(username:string,password:string): Observable<any> {
    
    return this.keycloak.getAccessToken(username,password).pipe(
      tap( (res)=>{  
        console.log(res);
        },
      )/*,switchMap(response=>  {
          return this.getDataUserWithToken();
      })*/
    ); 
  }
  
  getDataUserWithToken():Observable<DataUs> {

    let token = this.storage.get("token-wrapper").access_token;

    return this.springBootService.getToUserInfo(token).pipe(
        tap( resp => {
          this.userInfo.next(resp); //in futuro se ci sono altre componenti che possano modificare il contenuto in un servizio rest .
        })
    );
  }

  //
  logout(): void {

    this.storage.clear();

  }
  

  public get userInfoObservable(): Observable<DataUs> {
    return this.userInfo.asObservable();
  }



  public get redirectUrl():string{
    return this._redirectUrl;
  }
  
  public set redirectUrl(url:string){
     this._redirectUrl = url;
  }

}
