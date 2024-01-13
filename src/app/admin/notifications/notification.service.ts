import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  urlforapi = environment.apiurl;
  token = '';
  constructor(private http: HttpClient, private ngxService: NgxUiLoaderService) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  getNotifications() {
    this.token = this.getToken();
    this.ngxService.start();
    let result= this.http.post(`${this.urlforapi}list_notification_web?token=${this.token}`, null);
    this.ngxService.stop();
    return result;
  }

  getFarmers(): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}farmerlist?token=${this.token}`, null);
  }

  getDistributors(): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributorlist?token=${this.token}`, null);
  }

  sendNotification(formdata: any): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('all_notification', JSON.stringify(formdata));
    return this.http.post(`${this.urlforapi}send_notification?token=${this.token}`, data);
  }
}
