import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { markTimeline } from 'console';
//import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  urlforapi = environment.apiurl;
  token: any;
  constructor(private http: HttpClient, private permissionsService: NgxPermissionsService) {
    var data = localStorage.getItem('userrole');
    if (data) {
      this.permissionsService.loadPermissions([data]);
    }
  }

  getapiurl() {
    return this.urlforapi;
  }

  adminLogin(adminData) {
    return this.http.post(this.urlforapi + 'login', adminData);
  }

  adminLogout() {
    this.token =localStorage.getItem('token');
    // this.http.post(`${this.urlforapi}logout?token=${this.token}`, null).subscribe(()=>
    // {   });

    localStorage.removeItem('token');
    localStorage.removeItem('userrole');
    localStorage.removeItem('user');
    this.permissionsService.flushPermissions();

  }

  getRole() {
    var data = localStorage.getItem('userrole');
    return data;
  }

  getLocalStorageUser() {
    var data = localStorage.getItem('token');
    if (data) {
      return true;
    }
    else {
      return false;
    }
  }

  roleMatch(allowedroles) {
    var isMatch = false;
    var userRoles = localStorage.getItem('userrole');
    allowedroles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  getLanguageList() {
    let language = [
      { id: 'mar', name: "Marathi" },
      { id: 'hin', name: "Hindi" },
      { id: 'eng', name: "English" },
      { id: 'guj', name: "Gujrati" }
    ];
    return language;
  }

  getBSCDSCList()
  {
    let language = [
      { id: 'fsc', name: "FSC" },
      { id: 'bsc', name: "BSC" },
      { id: 'dsc', name: "DSC" },
    ];
    return language;

  }

  getGallaryforAllList()
  {
    let language = [
      { id: 'All', name: "All" },
      { id: 'Farmer_Seminar', name: "Farmer_Seminar" },
      { id: 'Distributor_Training', name: "Distributor_Training" },
      { id: 'News_Coverage', name: "News_Coverage" },
      { id: 'Product_Result', name: "Product_Result" },
      { id: 'Official', name: "Official" },
    ];
    return language;
  }

  getVideoforAllList()
  {
    let language = [
      { id: 'All', name: "All" },
      { id: 'Farmer', name: "Farmer" },
      { id: 'Educational', name: "Educational" },
    ];
    return language;
  }

  getBannerBroucherTypeList()
  {
    let listbnnbr=[
      { id: 'brochure', name: "Brochure" },
      { id: 'banner', name: "Banner" },
      // { id: 'langbrochure', name: "Language Brochure" },
      // { id: 'langbanner', name: "Language Banner" },
    ];
    return listbnnbr;
  }

  getUnitList() {
    let language = [
      { id: 'Ml', name: "Ml" },
      { id: 'Liter', name: "Liter" },
      { id: 'Gram', name: "Gram" },
      { id: 'Kg', name: "Kg" }
    ];
    return language;
  }

  getDistributorTypeList() {
    let language = [
      { id: 'DSC', name: "dsc" },
      { id: 'BSC', name: "bsc" },
      { id: 'FSC', name: "fsc" }
    ];
    return language;
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
}
