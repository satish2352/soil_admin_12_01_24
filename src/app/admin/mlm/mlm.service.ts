import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MlmService {
  //declare constant token;
  urlforapi =environment.apiurl;
  token = '';
  smartphone: any = [];
  constructor(private http: HttpClient) {


  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  checkemailexist(obj) {
    let result= this.http.post(this.urlforapi + 'checkemailexist', obj);
    return result;
  }

  /////////////////////Farmer Operations
  getDistributorList() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}dsc_list_structure`, null);
  }


  getBscUnderDSC(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}bsc_list_structure`, obj);
  }


  getFscUnderBsc(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}fsc_list_structure`, obj);
  }
  


  deleteById(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributordelete`, obj);
  }

  getByIdForEdit(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}distributorinfo`, obj);
  }

  blockDistributor(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}block_distributor`, obj);
  }

  unblockDistributor(obj) {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}unblock_distributor`, obj);
  }

  getExcelSCTStrucutr() {
    this.token = this.getToken();
    return this.http.post(`${this.urlforapi}getSctStructure`, null);
  }

}
