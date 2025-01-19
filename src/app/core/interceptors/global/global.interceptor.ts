import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const baseUrl = 'https://upskilling-egypt.com:3005';
    const token = localStorage.getItem('token');

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

    return next.handle(req);
  }
}
