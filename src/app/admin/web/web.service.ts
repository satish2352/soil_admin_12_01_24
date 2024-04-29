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
    var tokennew=this.http.post(`${this.urlforapi}companyprofilelist`, null).subscribe(res => {

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
    return this.http.post(`${this.urlforapi}companyprofileadd`, data);
  }

  getCompanyGetList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}companyprofilelist`, null);
  }

  getCompanyProfileForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}companyprofileget`, obj);
  }

  updateCompanyProfile(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}companyprofileupdate`, data);
  }

  deleteCompanyProfile(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}companyprofiledelete`, data);
  }

  //About Us API
  addAboutUs(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webaboutusadd`, data);
  }

  getAboutUsList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webaboutuslist`, null);
  }

  getAboutUsForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webaboutusget`, obj);
  }

  updateAboutUs(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webaboutusupdate`, data);
  }

  deleteAboutUs(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webaboutusdelete`, data);
  }

  //Cover Photot API
  addCoverPhoto(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}coverphotoadd`, data);
  }

  getCoverPhotoList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}coverphotolist`, null);
  }

  getCoverPhotoEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}coverphotoget`, obj);
  }

  updateCoverPhoto(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}coverphotoupdate`, data);
  }

  deleteCoverPhoto(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}coverphotodelete`, data);
  }

  //Gallary Photo API
  addGallaryPhoto(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}gallaryphotoadd`, data);
  }

  getGallaryPhotoList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}gallaryphotolist`, null);
  }

  getGallaryPhotoEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}gallaryphotoget`, obj);
  }

  updateGallaryPhoto(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}gallaryphotoupdate`, data);
  }

  deleteGallaryPhoto(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}gallaryphotodelete`, data);
  }

  //Vision Mission API
  addVisionMission(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webvisionmissionadd`, data);
  }

  getVisionMissionList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webvisionmissionlist`, null);
  }

  getVisionMissionEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webvisionmissionget`, obj);
  }

  updateVisionMission(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webvisionmissionupdate`, data);
  }

  deleteVisionMission(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webvisionmissiondelete`, data);
  }
  // Principle API
  getPrincipleList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}principles_list`, null);
  }
  //webVideo API

  webVideoList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webvideolist`, null);
  }

  WebVideoForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webvideoget`, obj);
  }

  webVideoDelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webvideodelete`, data);
  }

  webVideoMissionAdd(formdata) {
    this.token = this.getToken();
    // let data = new FormData;
    // data.set('dataforinsert', JSON.stringify(formdata));
    // data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webvideoadd`, formdata);
  }

  webVideoUpdate(formdata) {
    return this.http.post(`${this.urlforapi}webvideoupdate`, formdata);
  }


  //webAudio API

  webAudioList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webaudiolist`, null);
  }

  webAudioForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webaudioget`, obj);
  }

  webAudioDelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webaudiodelete`, data);
  }

  webAudioAdd(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webaudioadd`, data);
  }

  webAudioUpdate(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webaudioupdate`, data);
  }

  //Blog Article API

  webBlogArticleList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webblogarticlelist`, null);
  }

  webBlogReplyList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}blog_reply_list`, null);
  }

  webEnquiryList(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}frontenquiryget`, data);
  }

  webBlogArticleForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webblogarticleget`, obj);
  }

  webBlogArticleDelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webblogarticledelete`, data);
  }

  webBlogArticleAdd(formdata, imagefileone, imagefiletwo) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefileone);
    data.set('photo_two', imagefiletwo);
    return this.http.post(`${this.urlforapi}webblogarticleadd`, data);
  }

  webBlogArticleUpdate(formdata, imagefileone, imagefiletwo) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefileone);
    data.set('photo_two', imagefiletwo);
    return this.http.post(`${this.urlforapi}webblogarticleupdate`, data);
  }


  //Blog Schedule API

  webBlogScheduleList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webblogsschedulelist`, null);
  }

  webBlogScheduleForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webblogsscheduleget`, obj);
  }

  webBlogScheduleDelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webblogsscheduledelete`, data);
  }

  webBlogScheduleAdd(formdata, imagefileone, imagefiletwo) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefileone);
    data.set('photo_two', imagefiletwo);
    return this.http.post(`${this.urlforapi}webblogsscheduleadd`, data);
  }

  webBlogScheduleUpdate(formdata, imagefileone, imagefiletwo) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefileone);
    data.set('photo_two', imagefiletwo);
    return this.http.post(`${this.urlforapi}webblogsscheduleupdate`, data);
  }


  //Web Testimonials API
  webTestimonialsAdd(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webtestimonialsadd`, data);
  }

  webTestimonialsList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webtestimonialslist`, null);
  }

  webTestimonialsEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webtestimonialsget`, obj);
  }

  webTestimonialsUpdate(formdata, imagefile) {
    this.token = this.getToken();
    let data = new FormData;
    data.set('dataforinsert', JSON.stringify(formdata));
    data.set('photo_one', imagefile);
    return this.http.post(`${this.urlforapi}webtestimonialsupdate`, data);
  }

  webTestimonialsDelete(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webtestimonialsdelete`, data);
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
    return this.http.post(`${this.urlforapi}webproductadd`,data);
  }

  webProductList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webproductlist`, null);
  }

  webProductEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webproductget`, obj);
  }


  // webProductUpdate(formdata,productImage)
  // {
  //   this.token = this.getToken();
  //   let data=new FormData;
  //   data.append('dataforinsert', JSON.stringify(formdata));
  //   data.append('photo_one',productImage);
  //   return this.http.post(`${this.urlforapi}webproductupdate`,data);
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
    return this.http.post(`${this.urlforapi}webproductupdate`,data);
  }


  webProductDelete(data)
  {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}webproductdelete`, data);
  }


  webEntrenshipList(data) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}internship_list`, data);
  }

  webEntrenshipEdit(obj) {
    var objnew={
      id:obj
    }
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}internship_get`, objnew);
  }



  webEntrenshipUpdate(formdata) {
    let data=new FormData;
    data.append('dataforinsert', JSON.stringify(formdata));
    return this.http.post(`${this.urlforapi}internship_update`, data);
  }
  

  webCareerList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}career_list`, null);
  }

  
  webCareerGet(obj) {
    var objnew={
      id:1
    }
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}career_get`, objnew);
  }
  




/////////////////////////////////////////////////////////
addWebProductInfo(formdata,file1)
  {
    this.token = this.getToken();
    let data=new FormData;
    data.append('dataforinsert', JSON.stringify(formdata));
    data.append('photo_one',file1);
    return this.http.post(`${this.urlforapi}frontproductadd`,data);
  }

  webProductInfoList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}frontproductlist`, null);
  }

  webProductInfoEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}frontproductget`, obj);
  }



  webProductInfoUpdate(formdata,file1)
  {
    this.token = this.getToken();
    let data=new FormData;
    data.append('dataforinsert', JSON.stringify(formdata));
    data.append('photo_one',file1);
    return this.http.post(`${this.urlforapi}frontproductupdate`,data);
  }


  webProductInfoDelete(data)
  {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}frontproductdelete`, data);
  }

  webCareerDistList(data)
  {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}frontdistributorlist`, data);
  }

  webCareerJobList(data)
  {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}job_posting_list`, data);
  }

  webCareerJobEdit(obj) {
    var objnew={
      id:obj
    }
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}job_posting_get`, objnew);
  }

  webCareerJobUpdate(formdata) {
    let data=new FormData;
    data.append('dataforinsert', JSON.stringify(formdata));
    return this.http.post(`${this.urlforapi}job_posting_update`, data);
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
    return this.http.post(`${this.urlforapi}career_update`,data);
  }

  WebFrontCounterList()
  {
    var obj={
      id:1
    }
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}front_counter_list`, obj);
  }

  WebFrontCounterEditGet(obj)
  {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}front_counter_get`, obj);
  }

  WebFrontCounterUpdate(data)
  {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}front_counter_update`, data);
  }



////////////////////////////////////////////////////////////////////////////

  getMarqueAdd(formdata) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}website_marquee_add`,formdata)
  }

  getMarqueList() {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}website_marquee_list`,null)
  }

  getMarqueEdit(obj) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}website_marquee_get`,obj)
  }

  getMarqueDelete(obj) {
  this.token = this.getToken()
  return this.http.post(
    `${this.urlforapi}website_marquee_delete`,obj)
  }

  getMarqueUpdate(formdata) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}website_marquee_update`,
      formdata,
    )
  }

}
