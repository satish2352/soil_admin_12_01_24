import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class WebService {
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

  //Company Profile API
  addCompanyProfile(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}companyprofileadd?token=${this.token}`, data);
  }

  getCompanyGetList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}companyprofilelist?token=${this.token}`, null);
  }

  getCompanyProfileForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}companyprofileget?token=${this.token}`, obj);
  }

  updateCompanyProfile(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}companyprofileupdate?token=${this.token}`, data);
  }

  deleteCompanyProfile(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}companyprofiledelete?token=${this.token}`, data);
  }

  //About Us API
  addAboutUs(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webaboutusadd?token=${this.token}`, data);
  }

  getAboutUsList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webaboutuslist?token=${this.token}`, null);
  }

  getAboutUsForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webaboutusget?token=${this.token}`, obj);
  }

  updateAboutUs(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webaboutusupdate?token=${this.token}`, data);
  }

  deleteAboutUs(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webaboutusdelete?token=${this.token}`, data);
  }

  //Cover Photot API
  addCoverPhoto(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}coverphotoadd?token=${this.token}`, data);
  }

  getCoverPhotoList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}coverphotolist?token=${this.token}`, null);
  }

  getCoverPhotoEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}coverphotoget?token=${this.token}`, obj);
  }

  updateCoverPhoto(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}coverphotoupdate?token=${this.token}`, data);
  }

  deleteCoverPhoto(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}coverphotodelete?token=${this.token}`, data);
  }

  //Gallary Photo API
  addGallaryPhoto(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}gallaryphotoadd?token=${this.token}`, data);
  }

  getGallaryPhotoList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}gallaryphotolist?token=${this.token}`, null);
  }

  getGallaryPhotoEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}gallaryphotoget?token=${this.token}`, obj);
  }

  updateGallaryPhoto(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}gallaryphotoupdate?token=${this.token}`, data);
  }

  deleteGallaryPhoto(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}gallaryphotodelete?token=${this.token}`, data);
  }

  //Vision Mission API
  addVisionMission(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webvisionmissionadd?token=${this.token}`, data);
  }

  getVisionMissionList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webvisionmissionlist?token=${this.token}`, null);
  }

  getVisionMissionEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webvisionmissionget?token=${this.token}`, obj);
  }

  updateVisionMission(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webvisionmissionupdate?token=${this.token}`, data);
  }

  deleteVisionMission(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webvisionmissiondelete?token=${this.token}`, data);
  }
  // Principle API
  getPrincipleList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}principles_list?token=${this.token}`, null);
  }
  //webVideo API

  webVideoList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webvideolist?token=${this.token}`, null);
  }

  WebVideoForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webvideoget?token=${this.token}`, obj);
  }

  webVideoDelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webvideodelete?token=${this.token}`, data);
  }

  webVideoMissionAdd(formdata) {
    this.token = this.getToken();
    // let data = new FormData;
    // data.set('dataforinsert', JSON.stringify(formdata));
    // data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webvideoadd?token=${this.token}`, formdata);
  }

  webVideoUpdate(formdata) {
    return this.http.post(`${this.urlforapi}webvideoupdate?token=${this.token}`, formdata);
  }


  //webAudio API

  webAudioList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webaudiolist?token=${this.token}`, null);
  }

  webAudioForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webaudioget?token=${this.token}`, obj);
  }

  webAudioDelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webaudiodelete?token=${this.token}`, data);
  }

  webAudioAdd(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webaudioadd?token=${this.token}`, data);
  }

  webAudioUpdate(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webaudioupdate?token=${this.token}`, data);
  }

  //Blog Article API

  webBlogArticleList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webblogarticlelist?token=${this.token}`, null);
  }

  webBlogReplyList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}blog_reply_list?token=${this.token}`, null);
  }

  webEnquiryList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}frontenquiryget?token=${this.token}`, null);
  }

  webBlogArticleForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webblogarticleget?token=${this.token}`, obj);
  }

  webBlogArticleDelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webblogarticledelete?token=${this.token}`, data);
  }

  webBlogArticleAdd(formdata, imagefileone, imagefiletwo) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefileone);
    data.set('photo_two', imagefiletwo);
    return this.http.post(`${this.urlforapi}webblogarticleadd?token=${this.token}`, data);
  }

  webBlogArticleUpdate(formdata, imagefileone, imagefiletwo) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefileone);
    data.set('photo_two', imagefiletwo);
    return this.http.post(`${this.urlforapi}webblogarticleupdate?token=${this.token}`, data);
  }


  //Blog Schedule API

  webBlogScheduleList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webblogsschedulelist?token=${this.token}`, null);
  }

  webBlogScheduleForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webblogsscheduleget?token=${this.token}`, obj);
  }

  webBlogScheduleDelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webblogsscheduledelete?token=${this.token}`, data);
  }

  webBlogScheduleAdd(formdata, imagefileone, imagefiletwo) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefileone);
    data.set('photo_two', imagefiletwo);
    return this.http.post(`${this.urlforapi}webblogsscheduleadd?token=${this.token}`, data);
  }

  webBlogScheduleUpdate(formdata, imagefileone, imagefiletwo) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefileone);
    data.set('photo_two', imagefiletwo);
    return this.http.post(`${this.urlforapi}webblogsscheduleupdate?token=${this.token}`, data);
  }


  //Web Testimonials API
  webTestimonialsAdd(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webtestimonialsadd?token=${this.token}`, data);
  }

  webTestimonialsList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webtestimonialslist?token=${this.token}`, null);
  }

  webTestimonialsEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webtestimonialsget?token=${this.token}`, obj);
  }

  webTestimonialsUpdate(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webtestimonialsupdate?token=${this.token}`, data);
  }

  webTestimonialsDelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webtestimonialsdelete?token=${this.token}`, data);
  }


  //Add Product
  addProduct(formdata,file1,file2,file3,file4,file5)
  {
    this.token = this.getToken();
    let data=new FormData;
    data.append('dataforinsert', JSON.stringify(formdata));
    data.append('photo_one',file1);
    data.append('photo_two',file2);
    data.append('photo_three',file3);
    data.append('photo_four',file4);
    data.append('photo_five',file5);
    return this.http.post(`${this.urlforapi}webproductadd?token=${this.token}`,data);
  }

  webProductList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webproductlist?token=${this.token}`, null);
  }

  webProductEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webproductget?token=${this.token}`, obj);
  }


  // webProductUpdate(formdata,productImage)
  // {
  //   this.token = this.getToken();
  //   let data=new FormData;
  //   data.append('dataforinsert', JSON.stringify(formdata));
  //   data.append('photo_one',productImage);
  //   return this.http.post(`${this.urlforapi}webproductupdate?token=${this.token}`,data);
  // }


  webProductUpdate(formdata,file1,file2,file3,file4,file5)
  {
    this.token = this.getToken();
    let data=new FormData;
    data.append('dataforinsert', JSON.stringify(formdata));
    data.append('photo_one',file1);
    data.append('photo_two',file2);
    data.append('photo_three',file3);
    data.append('photo_four',file4);
    data.append('photo_five',file5);
    return this.http.post(`${this.urlforapi}webproductupdate?token=${this.token}`,data);
  }


  webProductDelete(data)
  {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webproductdelete?token=${this.token}`, data);
  }


  webEntrenshipList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}internship_list?token=${this.token}`, null);
  }

  webEntrenshipEdit(obj) {
    var objnew={
      id:obj
    }
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}internship_get?token=${this.token}`, objnew);
  }



  webEntrenshipUpdate(formdata) {
    let data=new FormData;
    data.append('dataforinsert', JSON.stringify(formdata));
    return this.http.post(`${this.urlforapi}internship_update?token=${this.token}`, data);
  }
  

  webCareerList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}career_list?token=${this.token}`, null);
  }

  
  webCareerGet(obj) {
    var objnew={
      id:1
    }
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}career_get?token=${this.token}`, objnew);
  }
  




/////////////////////////////////////////////////////////
addWebProductInfo(formdata,file1)
  {
    this.token = this.getToken();
    let data=new FormData;
    data.append('dataforinsert', JSON.stringify(formdata));
    data.append('photo_one',file1);
    return this.http.post(`${this.urlforapi}frontproductadd?token=${this.token}`,data);
  }

  webProductInfoList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}frontproductlist?token=${this.token}`, null);
  }

  webProductInfoEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}frontproductget?token=${this.token}`, obj);
  }



  webProductInfoUpdate(formdata,file1)
  {
    this.token = this.getToken();
    let data=new FormData;
    data.append('dataforinsert', JSON.stringify(formdata));
    data.append('photo_one',file1);
    return this.http.post(`${this.urlforapi}frontproductupdate?token=${this.token}`,data);
  }


  webProductInfoDelete(data)
  {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}frontproductdelete?token=${this.token}`, data);
  }

  webCareerDistList(data)
  {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}frontdistributorlist?token=${this.token}`, data);
  }

  webCareerJobList()
  {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}job_posting_list?token=${this.token}`, null);
  }

  webCareerJobEdit(obj) {
    var objnew={
      id:obj
    }
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}job_posting_get?token=${this.token}`, objnew);
  }

  webCareerJobUpdate(formdata) {
    let data=new FormData;
    data.append('dataforinsert', JSON.stringify(formdata));
    return this.http.post(`${this.urlforapi}job_posting_update?token=${this.token}`, data);
  }

  updateCareerMenu(formdata,file1,file2,file3,file4)
  {
    this.token = this.getToken();
    let data=new FormData;
    data.append('dataforinsert', JSON.stringify(formdata));
    data.append('internshipmenuphoto',file1);
    data.append('dsitmenuphotoview',file2);
    data.append('jobmenuphotoview',file3);
    data.append('certificatephotoview',file4);
    return this.http.post(`${this.urlforapi}career_update?token=${this.token}`,data);
  }

  WebFrontCounterList()
  {
    var obj={
      id:1
    }
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}front_counter_list?token=${this.token}`, obj);
  }

  WebFrontCounterEditGet(obj)
  {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}front_counter_get?token=${this.token}`, obj);
  }

  WebFrontCounterUpdate(data)
  {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}front_counter_update?token=${this.token}`, data);
  }



////////////////////////////////////////////////////////////////////////////

  getMarqueAdd(formdata) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}website_marquee_add?token=${this.token}`,formdata)
  }

  getMarqueList() {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}website_marquee_list?token=${this.token}`,null)
  }

  getMarqueEdit(obj) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}website_marquee_get?token=${this.token}`,obj)
  }

  getMarqueDelete(obj) {
  this.token = this.getToken()
  return this.http.post(
    `${this.urlforapi}website_marquee_delete?token=${this.token}`,obj)
  }

  getMarqueUpdate(formdata) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}website_marquee_update?token=${this.token}`,
      formdata,
    )
  }

}
