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
    return this.http.post(`${this.urlforapi}distributorregistration`, data);
  }

  registerspecific(data) {
    this.token = this.getToken();
    //  console.log(this.token);
    //  farmerData.token=this.token;
    return this.http.post(`${this.urlforapi}distributorregistrationspecific`, data);
  }




  updateDistributor(distributorData) {
    this.token = this.getToken();
    let result = this.http.post(`${this.urlforapi}distributorupdate`, distributorData);
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
    return this.http.post(`${this.urlforapi}websctresultlist`, null);
  }

  getSctresultsview(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}websctresultget`, obj);
  }
  /////////////////////Farmer Operations
  getDistributorList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributorlist`, null);
  }

  getDistributorListNewArrival() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributorlist_new_arrival`, null);
  }

  deleteById(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributordelete`, obj);
  }

  getByIdForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributorinfo`, obj);
  }

  //WebFront
  webFrontGetByIdForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}web_frontdistributorinfo`, obj);
  }

  //All Meeting List
  getFarmerMeetingList(data) {
    this.token = this.getToken();
    this.ngxService.start();
    let result = this.http.post(`${this.urlforapi}farmermeetinglist_distributorweb`, data);
    this.ngxService.stop();
    return result;

  }

  getDistributorMeetingList(data) {
    this.token = this.getToken();
    this.ngxService.start();
    let result = this.http.post(`${this.urlforapi}distributormeetinglist_distributorweb`, data);
    this.ngxService.stop();
    return result;
  }

  //Visit List Distributor
  getVisitList(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributorvisittofarmerlist_distributorweb`, data);
  }

    //Visit List Distributor
    targetVideoViewedMobileapp() {
      this.token = this.getToken();
      return this.http.post(`${this.urlforapi}target_video_viewed_admin`, null);
    }

  //distributor video list

  getVideoDetailsAll() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}getvideodetailsdistributorall`, null);
  }

  addDistirbutorTargetVideo(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributortargetvideoadd_distributorweb`, obj);
  }
  getDistributorVideoList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributortargetvideolist_distributorweb`, null);
  }

  getByDistirbutorVideoIdForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributortargetvideoget_distributorweb`, obj);
  }

  updateDistirbutorTargetVideo(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributortargetvideoupdate_distributorweb`, obj);
  }

  deleteDistirbutorVideoById(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributortargetvideodelete_distributorweb`, data);
  }

  blockDistributor(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}block_distributor`, obj);
  }



  unblockDistributor(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}unblock_distributor`, obj);
  }

  promoteDistributor(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}web_distributor_promotion`, obj);
  }

  demoteDistributor(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}web_distributor_demotion`, obj);
  }

  getDistributorComplaints(id) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}complaintview_by_distributor&distributor_id=${id}`, null);
  }

  getDistributorMessages(id) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}messageview_by_distributor&distributor_id=${id}`, null);
  }


  getFSCList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}fsc_list_by_fsc`, null);
  }

  getBSCList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}bsc_list_by_bsc`, null);
  }

  getDSCList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}dsc_list_by_dsc`, null);
  }



}
