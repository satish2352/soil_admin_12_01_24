import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class FcofieldService {
  //declare constant token;
  urlforapi =environment.apiurl;
  token = '';
  smartphone: any = [];
  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService
    ) {


  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  registerFarmer(farmerData,farmerphoto) {
    this.ngxService.start();
    this.token = this.getToken();
    let data = new FormData;
    data.set('farmerData', JSON.stringify(farmerData));
    data.set('farmerphoto', farmerphoto);
    let result= this.http.post(`${this.urlforapi}farmerregistration?token=${this.token}`, data);
    this.ngxService.stop();
    return result;
  }

  updateFarmer(farmerData) {
    this.token = this.getToken();
    this.ngxService.start();
    let result= this.http.post(`${this.urlforapi}farmerupdate?token=${this.token}`, farmerData);
    this.ngxService.stop();
    return result;
  }

  getState() {
    this.ngxService.start();
    let result= this.http.post(this.urlforapi + 'statelist', null);
    this.ngxService.stop();
    return result;
  }

  getDist(obj) {
    this.ngxService.start();
    let result= this.http.post(this.urlforapi + 'districtlist', obj);
    this.ngxService.stop();
    return result;
  }

  getTaluka(obj) {
    this.ngxService.start();
    let result= this.http.post(this.urlforapi + 'talukalist', obj);
    this.ngxService.stop();
    return result;
  }

  getCity(obj) {
    this.ngxService.start();
    let result= this.http.post(this.urlforapi + 'villagelist', obj);
    this.ngxService.stop();
    return result;
  }

  checkemailexist(obj) {
    this.ngxService.start();
    let result= this.http.post(this.urlforapi + 'checkemailexist', obj);
    this.ngxService.stop();
    return result;
  }


  /////////////////////Farmer Operations
  getFarmerList(data) {
    this.token = this.getToken();
    this.ngxService.start();
    let result= this.http.post(`${this.urlforapi}farmerlist?token=${this.token}`, data);
    this.ngxService.stop();
    return result;
  }

  deleteFarmer(obj) {
    this.token = this.getToken();
    this.ngxService.start();
    let result=this.http.post(`${this.urlforapi}farmerdelete?token=${this.token}`, obj);
    this.ngxService.stop();
    return result;
  }

  getFarmerForEdit(obj) {
    this.token = this.getToken();
    this.ngxService.start();
    let result=this.http.post(`${this.urlforapi}farmerget?token=${this.token}`, obj);
    this.ngxService.stop();
    return result;
  }

  getFarmerDetails(obj) {
    this.token = this.getToken();
    this.ngxService.start();
    let result=this.http.post(`${this.urlforapi}farmergetdetails?token=${this.token}`, obj);
    this.ngxService.stop();
    return result;
  }

  

  //Plot Visit
  addPlotVisit(obj) {
    this.token = this.getToken();
    this.ngxService.start();
    let result= this.http.post(`${this.urlforapi}plotvisitadd_web?token=${this.token}`, obj);
    this.ngxService.stop();
    return result;
  }

  getPlotVisitList(data) {
    this.token = this.getToken();
    this.ngxService.start();
    let result=this.http.post(`${this.urlforapi}plotvisitlist_web?token=${this.token}`, data);
    this.ngxService.stop();
    return result;
  }

  deletePlotVisit(obj) {
    this.token = this.getToken();
    this.ngxService.start();
    let result= this.http.post(`${this.urlforapi}plotvisitdelete_web?token=${this.token}`, obj);
    this.ngxService.stop();
    return result;
  }

  getPlotVisitForEdit(obj) {
    this.token = this.getToken();
    this.ngxService.start();
    let result= this.http.post(`${this.urlforapi}plotvisitget_web?token=${this.token}`, obj);
    this.ngxService.stop();
    return result;
  }

  updatePlotVisit(obj) {
    this.token = this.getToken();
    this.ngxService.start();
    let result=this.http.post(`${this.urlforapi}plotvisitupdate_web?token=${this.token}`, obj);
    this.ngxService.stop();
    return result;
  }

}
