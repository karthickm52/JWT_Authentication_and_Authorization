import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Injectable,Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  private totalRequests = 0;

  constructor(private inject:Injector,private loadingService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    let auth=this.inject.get(AuthService);
    this.totalRequests++;
    this.loadingService.setLoading(true);
    let jwtToken=req.clone({
     
      setHeaders:{
        Authorization:'bearer '+auth.getToken()
      },
      
    })
    return next.handle(jwtToken).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }

}
