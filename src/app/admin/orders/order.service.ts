import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  urlforapi = environment.apiurl;
  token = '';
  constructor(private http: HttpClient, private ngxService: NgxUiLoaderService) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  getFarmers(): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}farmerlist?token=${this.token}`, null);
  }

  getProducts(): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webproductlist?token=${this.token}`, null);
  }

  getOrders(): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}weborderlist?token=${this.token}`, null);
  }
  getOrder1(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}viewreportsales?token=${this.token}`, data);
  }
  getOrder(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}weborderget?token=${this.token}`, data);
  }
 


  addOrder(formdata: any): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}weborderadd?token=${this.token}`, formdata);
  }

  updateOrder(formdata: any): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}weborderupdate?token=${this.token}`, formdata);
  }

  verifyOrder(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}weborderaccountsectionverified?token=${this.token}`, data);
  }

  forwardOrder(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}weborderaccountsectionforwardtowarehouse?token=${this.token}`, data);
  }

  deleteOrder(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}weborderdelete?token=${this.token}`, data);
  }
}
