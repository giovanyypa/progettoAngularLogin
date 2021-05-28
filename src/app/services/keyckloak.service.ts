import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyckloakService {

  private keycloakUrl = "http://localhost:8080/auth/realms/Demo-Realm/protocol/openid-connect/token";
   
    

  constructor(private http:HttpClient) { }


  // Chiamate HTTP APIKEYCLOAK (POST)
  public getTokenAccess(username : string,password:string):Observable<any>{


    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

    let  body = new URLSearchParams();
      body.set("client_id","springboot-microservice");
      body.set("client_secret","7d1214f0-57a0-48dc-95b2-97d2616cd388");
      body.set("username",username);
      body.set("password",password);
      body.set("grant_type","password");

    return this.http.post(this.keycloakUrl,body.toString(),{headers: headers});

  }
}
