
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class BannerbrService {
  token = '';
  urlforapi =environment.apiurl;
  constructor(private http: HttpClient) { 
    this.token=localStorage.getItem('token');
    var tokennew=this.http.post(`${this.urlforapi}companyprofilelist?token=${this.token}`, null).subscribe(res => {
  
      if (res['message'] == 'Token Signature could not be verified') {
        console.log("satish");
      }
    });
  }
  public getToken(): string {
    return localStorage.getItem('token');
  }

 
  //Web Testimonials API
  webbrochureadd(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webbrochureadd?token=${this.token}`, data);
  }

  webbrochurelist() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webbrochurelist?token=${this.token}`, null);
  }

  webbrochureget(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webbrochureget?token=${this.token}`, obj);
  }

  webbrochureupdate(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webbrochureupdate?token=${this.token}`, data);
  }

  webbrochuredelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webbrochuredelete?token=${this.token}`, data);
  }



}
