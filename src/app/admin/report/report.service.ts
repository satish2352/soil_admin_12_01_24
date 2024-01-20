import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  urlforapi = environment.apiurl;
  token = '';
  constructor(private http: HttpClient, private ngxService: NgxUiLoaderService) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  getOrders(data): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}websalesreport`, data);
  }

  getOrders1(data): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}reportsales`, data);
  }
  
  getOrder(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}weborderget`, data);
  }
  getOrders2(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}viewreportsales`, data);
  }
  getbyid(id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', id);
    // data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}viewreportsales`, data);
  }

  getDistOrders(data): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webdistributorrderreport`, data);
  }

  getAllOrders(data): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}weborderlist`, data);
    // return this.http.post(`${this.urlforapi}weballorderreport`, data);
  }

  
  getOrderNotDispatched(data): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}weballorderconfirmnotdispatchedreport`, data);
  }

  getOrderDispatched(data): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}weballorderconfirmdispatchedreport`, data);
  }
  
}
