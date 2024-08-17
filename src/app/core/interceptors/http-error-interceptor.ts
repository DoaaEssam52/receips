import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from 'rxjs';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private _toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((httpError: HttpErrorResponse) => {
        let error = httpError.error.message;

        let errorMessage = error;

        if (Array.isArray(error) && error.length) {
          errorMessage = error[0];
        }

        this._toastr.error(errorMessage);

        return throwError(errorMessage);
      })
    );
  }
}
