
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
    var tokennew=this.http.post(`${this.urlforapi}companyprofilelist`, null).subscribe(res => {
  
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
    return this.http.post(`${this.urlforapi}webbrochureadd`, data);
  }

  webbrochurelist() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webbrochurelist`, null);
  }

  webbrochureget(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webbrochureget`, obj);
  }

  webbrochureupdate(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webbrochureupdate`, data);
  }

  webbrochuredelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webbrochuredelete`, data);
  }



}
