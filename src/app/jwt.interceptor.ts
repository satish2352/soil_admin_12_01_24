import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { catchError } from 'rxjs/operators';

import { HelperService } from './helper.service';
import { Router } from '@angular/router';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

    constructor(private HelperService: HelperService,
        private router: Router,) { }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (!navigator.onLine) {
        //     // if there is no internet, throw a HttpErrorResponse error
        //     // since an error is thrown, the function will terminate here
        //     const error = {
        //         status: 0,
        //         error: {
        //             description: 'Check Connectivity!'
        //         },
        //         statusText: 'Check Connectivity!'
        //     };
        //     alert('No internet! Check Connectivity.');

        //     return throwError(error);
        // } else {
            // add authorization header with jwt token if available
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
            return next.handle(request);

        // }
    }
}


