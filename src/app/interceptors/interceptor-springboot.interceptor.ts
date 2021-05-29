import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
import { catchError, map } from 'rxjs/operators';
import { KeyckloakService } from '../services/keyckloak.service';

@Injectable()
export class InterceptorSpringbootInterceptor implements HttpInterceptor {

  constructor(private storage:LocalstorageService,private keycloakS:KeyckloakService) {}

  //intercetto i vari endpoint  a cui voglio accedere per controllare la validita dei token 
  //in caso postitivo non succede niente , in caso negativo mi ricreo un token valido a partire dal refres_token .
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    const token_wrapper = this.storage.get("token-wrapper"); 
  
    if (request.headers.has('Authorization')&& token_wrapper){

        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                if (error.error === 'messaggio di scaduto token') {
                    this.keycloakS.getRefreshAccessToken(token_wrapper.refresh_token)
                      .subscribe(() => {
                        location.reload();
                      });
                } 
              }
              if(error.status >=500 && error.status<=510){
                console.error("errore server backend");
              }
              return throwError(error);
          })
        );
      }
    else {

      return next.handle(request);
    }
      
  }



/*
return next.handle(request).pipe(
  map((event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
      console.log('event--->>>', event);
    }
    return event;
  }),
  catchError((error: HttpErrorResponse) => {
    console.log(error.error.error);
    if (error.status === 401) {
      if (error.error.error === 'invalid_token') {
        this.authService.refreshToken({refresh_token: refreshToken})
          .subscribe(() => {
            location.reload();
          });
      } else {
        this.router.navigate(['login']).then(_ => console.log('redirect to login'));
      }
    }
    return throwError(error);
  }));*/
}