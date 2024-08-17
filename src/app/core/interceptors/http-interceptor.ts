import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const baseUrl = environment.baseUrl;
    const accessToken = localStorage.getItem('userToken');

    let newRequest = request.clone({
      url: baseUrl + '/' + request.url,
      headers: request.headers.set('Authorization', 'Bearer ' + accessToken),
    });

    return next.handle(newRequest);
  }
}
