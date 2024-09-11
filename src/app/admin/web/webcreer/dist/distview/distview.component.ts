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

  b_allstate: any = [];
  b_alldist: any = [];
  b_allcity: any = [];
  b_alltaluka: any = [];

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
          }, 18000);
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
              alternate_mobile: this.editdata.alternate_mobile,

              state: this.editdata.state,
              district: this.editdata.district,
              taluka: this.editdata.taluka,
              city: this.editdata.city,

              address: this.editdata.address,
              business_address: this.editdata.business_address,
              business_district: this.editdata.business_district,
              business_state: this.editdata.business_state,
              business_tuluka: this.editdata.business_tuluka,
              business_village: this.editdata.business_village,
            
              user_id: this.editdata.user_id,

              datafor: 1,

              where_open_shop:this.editdata.where_open_shop,
              used_sct:this.editdata.used_sct,
              why_want_take_distributorship: this.editdata.why_want_take_distributorship,
              distributorship_exerience: this.editdata.distributorship_exerience,
              experience_farm_garder: this.editdata.experience_farm_garder,
              goal: this.editdata.goal,

            });
            setTimeout(() => {
              M.updateTextFields();
            }, 5000);
          }
        }
      });
    })
    this.pagetitle = 'Add Distributor';
    this.distributorService.getState().subscribe(allstate => {
      this.allstate = allstate['data'];
      this.b_allstate = allstate['data'];
      setTimeout(() => {
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      }, 4000);
    });

    this.formGroupNew = new FormGroup({
      user_id: new FormControl(''),
      datafor: new FormControl(0),
      fname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      mname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      lname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      alternate_mobile: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      taluka: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),

      business_address: new FormControl('', [Validators.required]),
      business_district: new FormControl('', [Validators.required]),
      business_state: new FormControl('', [Validators.required]),
      business_tuluka: new FormControl('', [Validators.required]),
      business_village: new FormControl('', [Validators.required]),

      where_open_shop: new FormControl('', [Validators.required]),
      used_sct: new FormControl('', [Validators.required]),
      why_want_take_distributorship: new FormControl('', [Validators.required]),
      distributorship_exerience: new FormControl('', [Validators.required]),
      experience_farm_garder: new FormControl('', [Validators.required]),
      goal: new FormControl('', [Validators.required]),
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
          this.formGroupNew.get('taluka').value(this.editdata.business_tuluka);

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



    this.formGroupNew.get('business_state').valueChanges.subscribe(val => {
      if (val) {
        this.distributorService.getDist({ state_id: val }).subscribe((alldist) => {
          this.b_alldist = alldist['data'];
          setTimeout(() => {
            let elems = document.querySelectorAll('select');
            let instances = M.FormSelect.init(elems);
          }, 2000);
          
        });
      }
    });

    // this.formGroupNew.get('business_district').valueChanges.subscribe(val => {
    //   if (val) {
    //     this.distributorService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
    //       this.b_alltaluka = alltaluka['data'];
    //       setTimeout(() => {
    //         let elems = document.querySelectorAll('select');
    //         let instances = M.FormSelect.init(elems);
    //       }, 3000);
         
    //     });
    //   }
    // });

    this.formGroupNew.get('business_district').valueChanges.subscribe(val => {
      if (val) {
        this.distributorService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
          this.b_alltaluka = alltaluka['data'];
          setTimeout(() => {
            let elems = document.querySelectorAll('select');
            M.FormSelect.init(elems);
          }, 2000);
    
          // Optionally set the value of business_tuluka here if necessary
          // For example, if you want to select the first Taluka from the updated list
          if (this.b_alltaluka.length > 0) {
            this.formGroupNew.get('business_tuluka').setValue(this.b_alltaluka[0].location_id, { emitEvent: false });
          }
        });
      }
    });

    
    this.formGroupNew.get('business_tuluka').valueChanges.subscribe(val => {
      if (val) {
        this.distributorService.getCity({ taluka_id: val }).subscribe((allcity) => {
          this.b_allcity = allcity['data'];
          setTimeout(() => {
            let elems = document.querySelectorAll('select');
            M.FormSelect.init(elems);
          }, 2000);
    
          // Optionally set the value of business_tuluka here if necessary
          // For example, if you want to select the first Taluka from the updated list
          if (this.b_allcity.length > 0) {
            this.formGroupNew.get('business_village').setValue(this.b_allcity[0].location_id, { emitEvent: false });
          }
        });
      }
    });

    

  //   this.formGroupNew.get('business_tuluka').valueChanges.subscribe(val => {
  //     if (val) {
  //       this.distributorService.getCity({ taluka_id: val }).subscribe((allcity) => {
  //         this.b_allcity = allcity['data'];
  //         setTimeout(() => {
  //           let elems = document.querySelectorAll('select');
  //           let instances = M.FormSelect.init(elems);
  //         }, 4000);
         
  //       });
  //     }
  //   });

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
