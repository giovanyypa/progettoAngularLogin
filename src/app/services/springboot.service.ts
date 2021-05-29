import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataUs } from '../models/iusers';


const SRINGBOOT_URL = "/springboot/";
const ENDPOINT_SECURE = "auth/profile";

@Injectable({
  providedIn: 'root'
})
export class SpringbootService {
  

  constructor(private http:HttpClient) {}


  // Chiamate HTTP APIKEYCLOAK (POST)
  public getToUserInfo(token:string):Observable<DataUs>{

    token = "Bearer " + token;
    let header = new HttpHeaders().set('Authorization', token);
    let url = SRINGBOOT_URL + ENDPOINT_SECURE;

    return this.http.get<DataUs>(url,{headers: header});

  }

}
