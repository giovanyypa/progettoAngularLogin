import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataUs } from '../models/iusers';

@Injectable({
  providedIn: 'root'
})
export class SpringbootService {
  
  private urlSpringBootBase = "/springboot/";
  private endPointInfo = "auth/profile";

  
  constructor(private http:HttpClient) {}


  // Chiamate HTTP APIKEYCLOAK (POST)
  public getToUserInfo(token:string):Observable<DataUs>{

    token = "Bearer " + token;
    let header = new HttpHeaders().set('Authorization', token);
    let url = this.urlSpringBootBase + this.endPointInfo;

    return this.http.get<DataUs>(url,{headers: header});

  }

}
