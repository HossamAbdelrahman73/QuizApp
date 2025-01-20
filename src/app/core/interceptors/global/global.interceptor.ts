import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const baseUrl = 'https://upskilling-egypt.com:3005/';
    const token = localStorage.getItem('token');
<<<<<<< HEAD
    if (token) {
      req = req.clone({
        url: baseUrl + req.url,
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    } else {
      req = req.clone({
        url: baseUrl + req.url,
      });
    }
=======

    const modifiedRequest = req.clone({
      url: `${baseUrl}${req.url}`,
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
>>>>>>> d20a3f5 ([feat] solve interceptor and add some style in auth module)

    return next.handle(modifiedRequest);
  }
}
