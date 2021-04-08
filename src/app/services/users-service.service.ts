import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataUs, User } from '../models/iusers';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  userTest : User ;
  private _isLoggedIn :boolean = false; 

  // store the URL so we can redirect after logging in
  private _redirectUrl: string;
  
  constructor(private router : Router) { 
    
    this.popolateTesUser();
    

  }

  login(username:string,password:string): Observable<User> {
    
    this._isLoggedIn  =   this.userTest.username === username && this.userTest.password === password;
    
    return (this._isLoggedIn)? of(this.userTest): of(null);
    
  }

  logout(): void {

    this._isLoggedIn = false;
    //this.router.navigate(["/login"]);

  }
  

  popolateTesUser(){
    this.userTest = {username:"giovany",password:"giovany",userData:{
      name : "gio",
    surname : "ypa" ,
    dateOfBirthay : new Date(),
    birthPlace :new Date(),
    fiscalCode : "ABCDEFGHIJK",
    phone : "3892037815",
    email : "studente.giovany.flores@gmail.com",
    address : "Francesco Veracini 53 Bis",
    ibanCode : "123456789" ,
    userType : "Admin",
}};
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
