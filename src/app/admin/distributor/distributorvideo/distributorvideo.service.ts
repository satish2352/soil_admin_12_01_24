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
    var tokennew = this.http.post(`${this.urlforapi}companyprofilelist`, null).subscribe(res => {
    });
  }
  public getToken(): string {
    return localStorage.getItem('token');
  }

  DistributorVideoList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webtargetvideolist`, null);
  }

  DistributorVideoForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webtargetvideoget`, obj);
  }

  DistributorVideoDelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webtargetvideodelete`, data);
  }

  DistributorVideoMissionAdd(formdata) {
    this.token = this.getToken();
    // let data = new FormData;
    // data.set('dataforinsert', JSON.stringify(formdata));
    // data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webtargetvideoadd`, formdata);
  }

  DistributorVideoUpdate(formdata) {
    return this.http.post(`${this.urlforapi}webtargetvideoupdate`, formdata);
  }

}
