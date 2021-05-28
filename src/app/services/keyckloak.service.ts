import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyckloakService {

  
  private keycloakUrl = '/keycloak/auth/realms/realm-login-springboot/protocol/openid-connect/token';
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  private client_id = "springboot-microservice";
  private client_secret = "b6a46747-e77f-40dc-aea6-17431b2b2af8";

  constructor(private http:HttpClient) {}


  // Chiamate HTTP APIKEYCLOAK (POST)
  public getAccessToken(username : string,password:string):Observable<any>{

    const params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        client_id: this.client_id,
        username: username,
        password: password,
        client_secret:this.client_secret

      }
    });

    return this.http.post(this.keycloakUrl,params,{headers: this.headers});

  }

  public getRefreshAccessToken(refreshToken:string):Observable<any>{

    const params = new HttpParams({
      fromObject: {
        grant_type: 'refresh_token',
        client_id: this.client_id,
        refresh_token: refreshToken,
        client_secret:this.client_secret

      }
    });

    return this.http.post(this.keycloakUrl,params,{headers: this.headers});

  }


}
