import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../../../../distributor/distributor.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  Router,
} from '@angular/router'
declare var $: any;
import * as M from "materialize-css/dist/js/materialize";
@Component({
  selector: 'app-distview',
  templateUrl: './distview.component.html',
  styleUrls: ['./distview.component.css']
})

export class DistviewComponent implements OnInit {

  submitted: boolean = false;
  formGroupNew: FormGroup;
  allstate: any = [];
  alldist: any = [];
  allcity: any = [];
  alltaluka: any = [];
  flag: number = 0;
  editdata: any;
  statelist: any;
  dummy: any;
  pagetitle: string;

  aadhar_card_image_front: any;
  aadhar_card_image_back: any;
  light_bill: any;
  pan_card: any;
  product_purchase_bill: any;
  shop_act_image: any;

  constructor(public distributorService: DistributorService,
    public http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      var obj = {
        id: this.route.snapshot.params['id']
      };
      console.log(obj)
      this.distributorService.webFrontGetByIdForEdit(obj).subscribe(res => {
        if (res['result'] == true) {
          this.editdata = res['data'];

          this.formControlValueChanges();
          $('select').formSelect();
          setTimeout(() => {
            let elems = document.querySelectorAll('select');
            let instances = M.FormSelect.init(elems);
          }, 3000);
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
          this.aadhar_card_image_front = this.editdata.aadhar_card_image_front;
          this.aadhar_card_image_back = this.editdata.aadhar_card_image_back;
          this.light_bill = this.editdata.light_bill;
          this.pan_card = this.editdata.pan_card;
          this.product_purchase_bill = this.editdata.product_purchase_bill;
          this.shop_act_image = this.editdata.shop_act_image;
          if (this.editdata && this.editdata.fname) {
            this.pagetitle = 'Edit Distributor';
            this.formGroupNew.patchValue({
              fname: this.editdata.fname,
              mname: this.editdata.mname,
              lname: this.editdata.lname,
              email: this.editdata.email,
              phone: this.editdata.phone,
              aadharcard: this.editdata.aadharcard,
              state: this.editdata.state,
              district: this.editdata.district,
              taluka: this.editdata.taluka,
              city: this.editdata.city,
              address: this.editdata.address,
              pincode: this.editdata.pincode,
              occupation: this.editdata.occupation,
              education: this.editdata.education,
              exp_in_agricultural: this.editdata.exp_in_agricultural,
              other_distributorship: this.editdata.other_distributorship,
              reference_from: this.editdata.reference_from,
              shop_location: this.editdata.shop_location,
              password: this.editdata.password,
              user_id: this.editdata.user_id,

              datafor: 1,

              alternate_mobile: this.editdata.alternate_mobile,
              business_address: this.editdata.business_address,
              state_business: this.editdata.state_business,
              district_business: this.editdata.district_business,
              taluka_business: this.editdata.taluka_business,
              city_busines: this.editdata.city_busines,
              why_want_take_distributorship: this.editdata.why_want_take_distributorship,

            });
            setTimeout(() => {
              M.updateTextFields();
            }, 1000);
          }


        }
      });
    })
    this.pagetitle = 'Add Distributor';
    this.distributorService.getState().subscribe(allstate => {
      this.allstate = allstate['data'];
      setTimeout(() => {
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      }, 2000);
    });

    this.formGroupNew = new FormGroup({
      user_id: new FormControl(''),
      datafor: new FormControl(0),
      fname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      mname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      lname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      aadharcard: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]),
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      taluka: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      occupation: new FormControl('', [Validators.required]),
      education: new FormControl('', [Validators.required]),
      exp_in_agricultural: new FormControl('', [Validators.required]),
      other_distributorship: new FormControl('', [Validators.required]),
      reference_from: new FormControl('', [Validators.required]),
      shop_location: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      alternate_mobile: new FormControl('', [Validators.required]),
      business_address: new FormControl('', [Validators.required]),

      state_business: new FormControl('', [Validators.required]),
      district_business: new FormControl('', [Validators.required]),
      taluka_business: new FormControl('', [Validators.required]),
      city_busines: new FormControl('', [Validators.required]),
      why_want_take_distributorship: new FormControl('', [Validators.required]),



    });



  }

  formControlValueChanges() {
    this.formGroupNew.get('state').valueChanges.subscribe(val => {
      if (val) {
        this.distributorService.getDist({ state_id: val }).subscribe((alldist) => {
          this.alldist = alldist['data'];
          setTimeout(() => {
            let elems = document.querySelectorAll('select');
            let instances = M.FormSelect.init(elems);
          }, 2000);
          // if (this.editdata[0] && !this.flag) {
          //   this.getDistrictId(this.editdata[0].district);
          // }
        });
      }
    });

    this.formGroupNew.get('district').valueChanges.subscribe(val => {
      if (val) {
        this.distributorService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
          this.alltaluka = alltaluka['data'];
          setTimeout(() => {
            let elems = document.querySelectorAll('select');
            let instances = M.FormSelect.init(elems);
          }, 2000);
          // if (this.editdata[0] && !this.flag) {
          //   this.getTalukaId(this.editdata[0].taluka);
          // }
        });
      }
    });

    this.formGroupNew.get('taluka').valueChanges.subscribe(val => {
      if (val) {
        this.distributorService.getCity({ taluka_id: val }).subscribe((allcity) => {
          this.allcity = allcity['data'];
          setTimeout(() => {
            let elems = document.querySelectorAll('select');
            let instances = M.FormSelect.init(elems);
          }, 2000);
          // if (this.editdata[0] && !this.flag) {
          //   this.getCityId(this.editdata[0].city);
          // }
        });
      }
    });
  }

  getCheckemailexist(event) {
    var obj = {
      email: event.target.value,
    };
    if (event.target.value) {
      this.distributorService.checkemailexist(obj).subscribe((allemail) => {
        if (allemail['result'] == true) {
          alert('Email Already Exist');
          this.formGroupNew.get('email').setValue('');
        }
      });
    }
  }

  // getStateId(name: any) {
  //   let state_id;
  //   this.allstate.forEach(state => {
  //     if (state['name'] == name) {
  //       state_id = state['location_id'];
  //     }
  //   });
  //   this.formGroupNew.get('state').setValue(state_id);
  // }

  // getDistrictId(name: any) {
  //   let dist_id;
  //   this.alldist.forEach(dt => {
  //     if (dt['name'] == name) {
  //       dist_id = dt['location_id'];
  //     }
  //   });
  //   this.formGroupNew.get('district').setValue(dist_id);
  // }

  // getTalukaId(name: any) {
  //   let taluka_id;
  //   this.alltaluka.forEach(t => {
  //     if (t['name'] == name) {
  //       taluka_id = t['location_id'];
  //     }
  //   });
  //   this.formGroupNew.get('taluka').setValue(taluka_id);
  // }

  // getCityId(name: any) {
  //   let city_id;
  //   this.allcity.forEach(ct => {
  //     if (ct['name'] == name) {
  //       city_id = ct['location_id'];
  //     }
  //   });
  //   this.formGroupNew.get('city').setValue(city_id);
  //   this.flag = 1;
  // }

  get f() { return this.formGroupNew.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.formGroupNew.invalid) {
      this.toastr.warning("Missing some contents/Invalid");
      return;
    }

    if (this.formGroupNew.value.datafor == '0') {
      this.distributorService.register(this.formGroupNew.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Distributor added successfully!");
          this.router.navigate(['/admin', 'distributor-list']);
        }
      });
    } else {
      this.distributorService.updateDistributor(this.formGroupNew.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Distributor updated successfully!");
          this.router.navigate(['/admin', 'distributor-list']);
        }
      });
    }
  }


  // getDistrict(event) {
  //   var obj = {
  //     state_id: event.target.value
  //   };
  //   this.distributorService.getDist(obj).subscribe(alldist => {
  //     this.alldist = alldist['data'];
  //   });
  // }


  // getTalukaAll(event) {
  //   var obj = {
  //     dist_id: event.target.value
  //   };
  //   this.distributorService.getTaluka(obj).subscribe(alltaluka => {
  //     this.alltaluka = alltaluka['data'];
  //   });
  // }

  // getCityAll(event) {
  //   var obj = {
  //     taluka_id: event.target.value
  //   };
  //   this.distributorService.getCity(obj).subscribe(allcity => {
  //     this.allcity = allcity['data'];
  //   });
  // }

}
