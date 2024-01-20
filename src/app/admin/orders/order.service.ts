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
    return this.http.post(`${this.urlforapi}farmerlist`, null);
  }

  getProducts(): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webproductlist`, null);
  }

  getOrders(): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}weborderlist`, null);
  }
  getOrder1(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}viewreportsales`, data);
  }
  getOrder(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}weborderget`, data);
  }
 


  addOrder(formdata: any): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}weborderadd`, formdata);
  }

  updateOrder(formdata: any): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}weborderupdate`, formdata);
  }

  verifyOrder(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}weborderaccountsectionverified`, data);
  }

  forwardOrder(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}weborderaccountsectionforwardtowarehouse`, data);
  }

  deleteOrder(order_no, distributor_id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('order_no', order_no);
    data.set('created_disctributor_id', distributor_id);
    return this.http.post(`${this.urlforapi}weborderdelete`, data);
  }
}
