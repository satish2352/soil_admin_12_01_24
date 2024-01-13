import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  //declare constant token;
  urlforapi = environment.apiurl;
  token = '';
  smartphone: any = [];
  constructor(private http: HttpClient,
    private ngxService: NgxUiLoaderService) {


  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  checkemailexist(obj) {
    let result = this.http.post(this.urlforapi + 'checkemailexist', obj);
    return result;
  }

  register(data) {
    this.token = this.getToken();
    //  console.log(this.token);
    //  farmerData.token=this.token;
    return this.http.post(`${this.urlforapi}distributorregistration?token=${this.token}`, data);
  }

  registerspecific(data) {
    this.token = this.getToken();
    //  console.log(this.token);
    //  farmerData.token=this.token;
    return this.http.post(`${this.urlforapi}distributorregistrationspecific?token=${this.token}`, data);
  }




  updateDistributor(distributorData) {
    this.token = this.getToken();
    let result = this.http.post(`${this.urlforapi}distributorupdate?token=${this.token}`, distributorData);
    return result;
  }

  getState() {
    return this.http.post(this.urlforapi + 'statelist', null);
  }

  getDist(obj) {
    return this.http.post(this.urlforapi + 'districtlist', obj);
  }

  getTaluka(obj) {
    return this.http.post(this.urlforapi + 'talukalist', obj);
  }

  getCity(obj) {
    return this.http.post(this.urlforapi + 'villagelist', obj);
  }

  /// SCT Result
  getSctresultslist() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}websctresultlist?token=${this.token}`, null);
  }

  getSctresultsview(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}websctresultget?token=${this.token}`, obj);
  }
  /////////////////////Farmer Operations
  getDistributorList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributorlist?token=${this.token}`, null);
  }

  deleteById(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributordelete?token=${this.token}`, obj);
  }

  getByIdForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributorinfo?token=${this.token}`, obj);
  }

  //WebFront
  webFrontGetByIdForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}web_frontdistributorinfo?token=${this.token}`, obj);
  }

  //All Meeting List
  getFarmerMeetingList(data) {
    this.token = this.getToken();
    this.ngxService.start();
    let result = this.http.post(`${this.urlforapi}farmermeetinglist_distributorweb?token=${this.token}`, data);
    this.ngxService.stop();
    return result;

  }

  getDistributorMeetingList(data) {
    this.token = this.getToken();
    this.ngxService.start();
    let result = this.http.post(`${this.urlforapi}distributormeetinglist_distributorweb?token=${this.token}`, data);
    this.ngxService.stop();
    return result;
  }

  //Visit List Distributor
  getVisitList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributorvisittofarmerlist_distributorweb?token=${this.token}`, null);
  }

    //Visit List Distributor
    targetVideoViewedMobileapp() {
      this.token = this.getToken();
      return this.http.post(`${this.urlforapi}target_video_viewed_admin?token=${this.token}`, null);
    }

  //distributor video list

  getVideoDetailsAll() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}getvideodetailsdistributorall?token=${this.token}`, null);
  }

  addDistirbutorTargetVideo(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributortargetvideoadd_distributorweb?token=${this.token}`, obj);
  }
  getDistributorVideoList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributortargetvideolist_distributorweb?token=${this.token}`, null);
  }

  getByDistirbutorVideoIdForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributortargetvideoget_distributorweb?token=${this.token}`, obj);
  }

  updateDistirbutorTargetVideo(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributortargetvideoupdate_distributorweb?token=${this.token}`, obj);
  }

  deleteDistirbutorVideoById(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributortargetvideodelete_distributorweb?token=${this.token}`, data);
  }

  blockDistributor(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}block_distributor?token=${this.token}`, obj);
  }



  unblockDistributor(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}unblock_distributor?token=${this.token}`, obj);
  }

  promoteDistributor(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}web_distributor_promotion?token=${this.token}`, obj);
  }

  demoteDistributor(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}web_distributor_demotion?token=${this.token}`, obj);
  }

  getDistributorComplaints(id) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}complaintview_by_distributor?token=${this.token}&distributor_id=${id}`, null);
  }

  getDistributorMessages(id) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}messageview_by_distributor?token=${this.token}&distributor_id=${id}`, null);
  }


  getFSCList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}fsc_list_by_fsc?token=${this.token}`, null);
  }

  getBSCList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}bsc_list_by_bsc?token=${this.token}`, null);
  }

  getDSCList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}dsc_list_by_dsc?token=${this.token}`, null);
  }



}
