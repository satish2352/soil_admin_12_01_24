import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgencyService } from '../agency.service';
import * as M from "materialize-css/dist/js/materialize";
//import {any } from '@agm/core';
@Component({
  selector: 'app-addagency',
  templateUrl: './addagency.component.html',
  styleUrls: ['./addagency.component.css']
})
export class AddagencyComponent implements OnInit {

  agencyForm: FormGroup;
  distributors: any[] = [];
  fileup: File;
  filepreview: any;
  filesize: any;
  filetype: any;
  filetypepresent: boolean = false;
  filetypes: Array<string> = ['image/png', 'image/PNG','image/jpeg','image/JPEG'];
  lat:number=20.254579800000002;
  lon:number=74.432198;
  zoom:number=9;
  mapClickListener: any;
  map: any;
  zone: any;
  result: any;
  
  constructor(
    private as: AgencyService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.agencyForm = new FormGroup({
      id: new FormControl(''),
      agency_name: new FormControl('', Validators.required),
      lat: new FormControl('', Validators.required),
      lon: new FormControl('', Validators.required),
      agency_under_distributor_id: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      photo_one: new FormControl('')
    });
    this.getDistributors();
  }

  mapClick(position)
  {
    console.log(position);
    this.lat=position.coords.lat;
    this.lon=position.coords.lng;
    this.agencyForm.patchValue({lat:position.coords.lat,
      lon :position.coords.lng});

      var data={
        'lat':this.lat,
        'lon':this.lon
      }

    
      this.as.webagencyby_lat_long_distance(data).subscribe(res => {
       
         if(res['result']=='true'){
          this.toastr.error("You cant add agency on this location");
          this.agencyForm.patchValue({lat:'',
            lon :''});
          return;
         }
        });
     
    

    // navigator.geolocation.getCurrentPosition((position) => {
    //   const coords = position.coords;
    //   const latLong = [coords.latitude, coords.longitude];
    //   console.log(
    //     `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
    //   );
    // });
    
  }


  
  
  getDistributors() {
    this.as.getDistributors().subscribe(res => {
      if (res['result']) {
        this.distributors = res['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
      }
    });
  }

  onSubmit() {

    if (this.filesize > 1000000) {
      this.toastr.error("File Size Should be less than 1 MB");
      return;
    }

    this.filetypes.forEach(element => {
      if (element == this.filetype) {
        this.filetypepresent = true;
      }

    });
    if (this.filetypepresent != true) {
      this.toastr.error("File type should be png");
      return;
    }

    if (this.agencyForm.invalid) {
      return;
    }
    if (!this.fileup) {
      this.toastr.warning('Select agency photo!');
      return;
    }
    this.as.addAgency(this.agencyForm.value, this.fileup).subscribe(res => {
      if (res['result']) {
        this.toastr.success('Agency added successfully');
        this.router.navigate(['/admin', 'agency-list']);
      } else {
        this.toastr.error(res['message']);
      }
    });
  }

  onFileSelect(event) {
    this.fileup = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.filepreview = reader.result;
    };

    this.filesize = this.fileup.size;
    this.filetype = this.fileup.type;

    if (this.filesize > 1000000) {
      this.toastr.error("File Size Should be less than 1 MB");
    }

    this.filetypes.forEach(element => {
      if (element == this.filetype) {
        this.filetypepresent = true;
      }

    });
    if (this.filetypepresent != true) {
      this.toastr.error("File type should be png/jpg/jpeg/bmp");
      return;
    }
  }
}
