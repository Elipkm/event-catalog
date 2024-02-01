// error-interceptor.service.ts

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private messageService: MessageService) {}
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log('HTTP request intercepted:', req);
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
            // Handle the error here
            console.log('HTTP error occurred:', error);
            this.messageService.add({severity:'error', summary: 'Fehler', detail: "Ein Fehler ist aufgetreten. Bitte laden Sie die Seite neu."});
            return throwError(() => new Error(error.message));
        }));
    }
}
