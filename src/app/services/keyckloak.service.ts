import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalstorageService } from './localstorage.service';


  const KEYCLOAK_URL = '/keycloak/auth/realms/realm-login-springboot/protocol/openid-connect/token';
  const HEADERS = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  const CLIENT_ID = "springboot-microservice";
  const CLIENT_SECRET = "b6a46747-e77f-40dc-aea6-17431b2b2af8";

@Injectable({
  providedIn: 'root'
})
export class KeyckloakService {

  
  constructor(private http:HttpClient,private localstorage:LocalstorageService) {}


  // Chiamate HTTP APIKEYCLOAK (POST)
  public getAccessToken(username : string,password:string):Observable<any>{
    this.localstorage.clear();
    let params = new HttpParams({
      fromObject: {
        grant_type: 'password',
        client_id: CLIENT_ID,
        username: username,
        password: password,
        client_secret:CLIENT_SECRET

      }
    });

    return this.http.post<any>(KEYCLOAK_URL,params,{headers: HEADERS}).pipe(
        tap(res => {              
          this.localstorage.set("token-wrapper",res);
        }),
      catchError(KeyckloakService.handleError)
    );

  }


  public getRefreshAccessToken(refreshToken:string):Observable<any>{
    this.localstorage.clear();
    const params = new HttpParams({
      fromObject: {
        grant_type: 'refresh_token',
        client_id: CLIENT_ID,
        refresh_token: refreshToken,
        client_secret:CLIENT_SECRET

      }
    });

    return this.http.post<any>(KEYCLOAK_URL,params,{headers: HEADERS}).pipe(
      tap(res => {
        console.log("nuovo token" , res)
        this.localstorage.set("token-wrapper",res);
      }),
      catchError(KeyckloakService.handleError)
    );

  }

  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(error);
  }
}
