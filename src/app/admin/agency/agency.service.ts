import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  urlforapi =environment.apiurl;
  token = '';
  constructor(private http: HttpClient, private ngxService: NgxUiLoaderService) { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  getAgencyList(): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webagencylist?token=${this.token}`, null);
  }

  getDistributors(): Observable<any> {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributorlist?token=${this.token}`, null);
  }

  addAgency(formdata: any, photo: any): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', photo);
    return this.http.post(`${this.urlforapi}webagencyadd?token=${this.token}`, data);
  }

  updateAgency(formdata: any, photo: any): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', photo);
    return this.http.post(`${this.urlforapi}webagencyupdate?token=${this.token}`, data);
  }

  getAgency(id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('id', id);
    return this.http.post(`${this.urlforapi}webagencyget?token=${this.token}`, data);
  }

  deleteAgency(id): Observable<any> {
    this.token = this.getToken();
    let data = new FormData();
    data.set('id', id);
    return this.http.post(`${this.urlforapi}webagencydelete?token=${this.token}`, data);
  }

  webagencyby_lat_long_distance(data): Observable<any> {
    return this.http.post(`${this.urlforapi}webagencyby_lat_long_distance?token=${this.token}`, data);
  }
  
}
