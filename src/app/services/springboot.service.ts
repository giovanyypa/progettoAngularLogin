import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataUs } from '../models/iusers';

@Injectable({
  providedIn: 'root'
})
export class SpringbootService {

  constructor(private http:HttpClient) { }

/*
  // Chiamate HTTP APIKEYCLOAK (POST)
  public getToUserInfo():Observable<DataUs>{

    /*
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

    let  body = new URLSearchParams();
      body.set("client_id","springboot-microservice");
      body.set("client_secret","7d1214f0-57a0-48dc-95b2-97d2616cd388");
      body.set("username",username);
      body.set("password",password);
      body.set("grant_type","password");

    return this.http.post(this.keycloakUrl,body.toString(),{headers: headers});

  }*/

}
