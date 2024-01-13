import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map} from 'rxjs/operators';

import { catchError } from 'rxjs/operators';

import { HelperService } from './helper.service';
import { Router } from '@angular/router';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

    constructor(private HelperService: HelperService,
        private router: Router,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return next.handle(request).pipe(catchError(err => {
        //     if ([401, 403].indexOf(err.status) !== -1) {
        //         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        //         this.HelperService.adminLogout();
        //         location.reload(true);
        //     }

        //     const error = err.error.message || err.statusText;
        //     return throwError(error);


        
        return next.handle(request).pipe(map(event => {
            if (event instanceof HttpResponse) {
                // console.log("hi I am here")
                console.log(event)
                if (event.body.error_code == '401') {
                    this.HelperService.adminLogout();
                    //this.toastr.success("Logged out successfully!");
                    this.router.navigate(['/session', 'login']);


                    
                }
            }         
            return event;
        }));
    }
}


