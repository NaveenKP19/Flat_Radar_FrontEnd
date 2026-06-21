import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { finalize, Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastServiceService } from 'src/app/services/toast.service.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router:Router, private loadingService:LoadingService,
    private toast :ToastServiceService
  ) {}

  intercept(request: HttpRequest<any>,
     next: HttpHandler
    ): Observable<HttpEvent<any>> { 

    const token =localStorage.getItem('token');
    
    if(token){
      request = request.clone({
        setHeaders:{
          Authorization:`Bearer ${token}` 
        }
      });
    }
    
    this.loadingService.show();
    return next.handle(request).pipe(

      finalize(()=>{
        this.loadingService.hide();
      }),

      catchError((error : HttpErrorResponse)=>{
        if(error.status===401){
          localStorage.removeItem('token');
          this.toast.warning('Your Session has Expired .Please Login Again',
            'Session Expired'
          );
          if(this.router.url !=='/'){
            this.router.navigate(['/']);
          }
        }
        return throwError(()=>error);
      })
    );
  }
}
