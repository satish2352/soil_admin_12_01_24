import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.prod'
@Injectable({
  providedIn: 'root',
})
export class MobileappService {
  token = ''
  urlforapi = environment.apiurl
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')
    var tokennew = this.http
      .post(`${this.urlforapi}companyprofilelist`, null)
      .subscribe((res) => {
        if (res['message'] == 'Token Signature could not be verified') {
          console.log('satish')
        }
      })
  }
  public getToken(): string {
    return localStorage.getItem('token')
  }

  GetMessege(obj) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}messageview_perticular`,obj)
  }

  UpdateMessege(obj) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}messageedit`,obj)
  }

  GetComplaint(obj) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}complaintview_perticular`,obj)
  }

  UpdateComplaint(obj) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}complaintedit`,obj)
  }


  MobileAddressList(obj) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}address_list`,obj)
  }


  MobileAddressUpdate(data) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}address_update`,data)
  }

  getMobileAppCropAdd(formdata) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}crops_add`,formdata)
  }

  getMobileAppCropList() {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}crops_list`,null)
  }

  getMobileAppCropEdit(obj) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}crops_get`,obj)
  }

  getMobileAppCropDelete(obj) {
   this.token = this.getToken()
   return this.http.post(
     `${this.urlforapi}cropsdelete`,obj)
 }

  getMobileAppCropUpdate(formdata) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}crops_update`,
      formdata,
    )
  }

  getMobileAppHetMessegesList(dataNew) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}messageview`,dataNew)
  }

  getMobileAppHetComplaintList(data) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}complaintview`,data)
  }

  getMobileAppYoutubeSuscriberList() {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}suscriberlist_distributorapp`,null)
  }
}
