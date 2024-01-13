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
      .post(`${this.urlforapi}companyprofilelist?token=${this.token}`, null)
      .subscribe((res) => {
        if (res['message'] == 'Token Signature could not be verified') {
          console.log('satish')
        }
      })
  }
  public getToken(): string {
    return localStorage.getItem('token')
  }

  MobileAddressList(obj) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}address_list?token=${this.token}`,obj)
  }

  MobileAddressUpdate(data) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}address_update?token=${this.token}`,data)
  }

  getMobileAppCropAdd(formdata) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}crops_add?token=${this.token}`,formdata)
  }

  getMobileAppCropList() {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}crops_list?token=${this.token}`,null)
  }

  getMobileAppCropEdit(obj) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}crops_get?token=${this.token}`,obj)
  }

  getMobileAppCropDelete(obj) {
   this.token = this.getToken()
   return this.http.post(
     `${this.urlforapi}cropsdelete?token=${this.token}`,obj)
 }

  getMobileAppCropUpdate(formdata) {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}crops_update?token=${this.token}`,
      formdata,
    )
  }

  getMobileAppHetMessegesList() {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}messageview?token=${this.token}`,null)
  }

  getMobileAppHetComplaintList() {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}complaintview?token=${this.token}`,null)
  }

  getMobileAppYoutubeSuscriberList() {
    this.token = this.getToken()
    return this.http.post(
      `${this.urlforapi}suscriberlist_distributorapp?token=${this.token}`,null)
  }
}
