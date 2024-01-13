import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  urlforapi = environment.apiurl;
  token = '';
  constructor(private http: HttpClient, private ngxService: NgxUiLoaderService) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  getOrders(): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}weborderlistforwarehouse?token=${this.token}`, null);
  }

  getOrder(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}weborderget?token=${this.token}`, data);
  }

  dispatchOrder(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}weborderdispatchedfromwarehouse?token=${this.token}`, data);
  }
}
