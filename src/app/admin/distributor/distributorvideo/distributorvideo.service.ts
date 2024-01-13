import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DistributorvideoService {

  token = '';
  urlforapi = environment.apiurl;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    var tokennew = this.http.post(`${this.urlforapi}companyprofilelist?token=${this.token}`, null).subscribe(res => {
    });
  }
  public getToken(): string {
    return localStorage.getItem('token');
  }

  DistributorVideoList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webtargetvideolist?token=${this.token}`, null);
  }

  DistributorVideoForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webtargetvideoget?token=${this.token}`, obj);
  }

  DistributorVideoDelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webtargetvideodelete?token=${this.token}`, data);
  }

  DistributorVideoMissionAdd(formdata) {
    this.token = this.getToken();
    // let data = new FormData;
    // data.set('dataforinsert', JSON.stringify(formdata));
    // data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webtargetvideoadd?token=${this.token}`, formdata);
  }

  DistributorVideoUpdate(formdata) {
    return this.http.post(`${this.urlforapi}webtargetvideoupdate?token=${this.token}`, formdata);
  }

}
