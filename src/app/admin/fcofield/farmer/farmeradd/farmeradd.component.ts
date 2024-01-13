import { Component, OnInit } from '@angular/core';
import { FcofieldService } from '../../fcofield.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as M from "materialize-css/dist/js/materialize";
declare var $: any;

@Component({
  selector: 'app-farmeradd',
  templateUrl: './farmeradd.component.html',
  styleUrls: ['./farmeradd.component.css'],
})
export class FarmeraddComponent implements OnInit {
  submitted: boolean = false;
  farmerForm: FormGroup;
  allstate: any = [];
  alldist: any = [];
  allcity: any = [];
  alltaluka: any = [];
  email: any;
  editdata: any;
  farmerphotoview: any = "assets/img/placeholder-image.png";
  showphoto: any = false;
  fileup: File = null;
  statelist: any;
  dummy: any;
  flag: number = 0;
  filesize: any;
  filetype: any;
  filetypepresent: boolean = false;
  filetypes: Array<string> = ['image/png', 'image/PNG'];
  constructor(
    public fcofieldService: FcofieldService,
    public http: HttpClient,
    private fb: FormBuilder,
    public router: Router,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.editdata = history.state;
    this.fcofieldService.getState().subscribe((allstate) => {
      this.allstate = allstate['data'];
      setTimeout(() => {
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      }, 1000);
      if (this.editdata[0] && !this.flag) {
        this.getStateId(this.editdata[0].state);
      }
    });

    this.farmerForm = new FormGroup({
      fname: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z']+( +[A-Za-z']+)*$/),
      ]),
      mname: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z']+( +[A-Za-z']+)*$/),
      ]),
      lname: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z']+( +[A-Za-z']+)*$/),
      ]),
      email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      //email: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      aadharcard: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.minLength(12),
        Validators.maxLength(12)
      ]),
      //aadharcard: new FormControl(''),
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      taluka: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.minLength(6),
        Validators.maxLength(6)
      ]),
      crop: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z']+( +[A-Za-z']+)*$/),
      ]),
      acre: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
      ]),
      password: new FormControl('', [Validators.required]),
      farmerphoto: new FormControl(''),
      datafor: new FormControl('0'),
      user_id: new FormControl('0'),
    });

    this.formControlValueChanges();
    $('select').formSelect();

    if (this.editdata[0]) {
      const editdatanew = this.editdata[0];
      this.farmerphotoview = editdatanew.photo;
      this.showphoto = true;

      this.farmerForm.patchValue({
        fname: editdatanew.fname,
        mname: editdatanew.mname,
        lname: editdatanew.lname,
        email: editdatanew.email,
        phone: editdatanew.phone,
        aadharcard: editdatanew.aadharcard,
        // state: this.getStateId(editdatanew.state),
        // district: this.getDistrictId(editdatanew.district),
        // taluka: this.getTalukaId(editdatanew.taluka),
        // city: this.getCityId(editdatanew.city),
        address: editdatanew.address,
        pincode: editdatanew.pincode,
        crop: editdatanew.crop,
        acre: editdatanew.acre,
        password: editdatanew.password,
        datafor: 1,
        user_id: editdatanew.user_id,
      });
      setTimeout(() => {
        M.updateTextFields();
      }, 1000);
    }
  }

  getStateId(name: any) {
    let state_id;
    this.allstate.forEach(state => {
      if (state['name'] == name) {
        state_id = state['location_id'];
      }
    });
    this.farmerForm.get('state').setValue(state_id);
  }

  getDistrictId(name: any) {
    let dist_id;
    this.alldist.forEach(dt => {
      if (dt['name'] == name) {
        dist_id = dt['location_id'];
      }
    });
    this.farmerForm.get('district').setValue(dist_id);
  }

  getTalukaId(name: any) {
    let taluka_id;
    this.alltaluka.forEach(t => {
      if (t['name'] == name) {
        taluka_id = t['location_id'];
      }
    });
    this.farmerForm.get('taluka').setValue(taluka_id);
  }

  getCityId(name: any) {
    let city_id;
    this.allcity.forEach(ct => {
      if (ct['name'] == name) {
        city_id = ct['location_id'];
      }
    });
    this.farmerForm.get('city').setValue(city_id);
    this.flag = 1;
  }

  formControlValueChanges() {
    this.farmerForm.get('state').valueChanges.subscribe(val => {
      this.fcofieldService.getDist({ state_id: val }).subscribe((alldist) => {
        this.alldist = alldist['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        if (this.editdata[0] && !this.flag) {
          this.getDistrictId(this.editdata[0].district);
        }
      });
    });

    this.farmerForm.get('district').valueChanges.subscribe(val => {
      this.fcofieldService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
        this.alltaluka = alltaluka['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        if (this.editdata[0] && !this.flag) {
          this.getTalukaId(this.editdata[0].taluka);
        }
      });
    });

    this.farmerForm.get('taluka').valueChanges.subscribe(val => {
      this.fcofieldService.getCity({ taluka_id: val }).subscribe((allcity) => {
        this.allcity = allcity['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        if (this.editdata[0] && !this.flag) {
          this.getCityId(this.editdata[0].city);
        }
      });
    });
  }

  onFileSelect(event) {
    this.fileup = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.farmerphotoview = reader.result;
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
      this.toastr.error("File type should be png");
      return;
    }

  }

  get f() {
    return this.farmerForm.controls;
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

    this.submitted = true;
    if (this.farmerForm.invalid) {
      console.log("this.farmerForm ",this.farmerForm)
      console.log("this.farmerForm.invalid ",this.farmerForm.invalid)
      console.log(this.farmerForm.invalid)
      console.log(this.farmerForm.controls)
      this.toastr.warning('Form Invalid Something Missing/Invalid!');
      return;
    }
    // console.log(this.farmerForm.value);
    if (this.farmerForm.value.datafor == '0') {
      if (!this.fileup) {
        this.toastr.warning("Please choose farmer photo!");
        return;
      }
      this.fcofieldService
        .registerFarmer(this.farmerForm.value, this.fileup)
        .subscribe((res) => {
          if (res['result'] == true) {
            this.toastr.success('Farmer added successfully!');
            this.router.navigate(['/admin', 'farmer-list']);
          }
        });
    } else {
      this.fcofieldService
        .updateFarmer(this.farmerForm.value)
        .subscribe((res) => {
          if (res['result'] == true) {
            this.toastr.success('Farmer updated successfully!');
            this.router.navigate(['/admin', 'farmer-list']);
          }
        });
    }
  }

  getDistrict(event) {
    var obj = {
      state_id: event.target.value,
    };

    this.fcofieldService.getDist(obj).subscribe((alldist) => {
      this.alldist = alldist['data'];
    });
  }

  getTalukaAll(event) {
    var obj = {
      dist_id: event.target.value,
    };

    this.fcofieldService.getTaluka(obj).subscribe((alltaluka) => {
      this.alltaluka = alltaluka['data'];
    });
  }

  getCityAll(event) {
    var obj = {
      taluka_id: event.target.value,
    };

    this.fcofieldService.getCity(obj).subscribe((allcity) => {
      this.allcity = allcity['data'];
    });
  }

  getCheckemailexist(event) {
    var obj = {
      email: event.target.value,
    };
    if (event.target.value) {
      this.fcofieldService.checkemailexist(obj).subscribe((allemail) => {
        if (allemail['result'] == true) {
          alert('Email Already Exist');
          this.farmerForm.get('email').setValue('');
        }
      });
    }
  }
}
