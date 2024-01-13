import { Component, OnInit } from '@angular/core';
import { FarmerService } from "../farmer.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-farmeradd',
  templateUrl: './farmeradd.component.html',
  styleUrls: ['./farmeradd.component.css']
})
export class FarmeraddComponent implements OnInit {

  submitted: boolean = false;
  farmerForm: FormGroup;
  allstate: any;
  alldist: any;
  allcity: any;
  alltaluka: any;
  editdata:any;
  constructor(public farmerService: FarmerService, public http: HttpClient, private fb: FormBuilder,public router:Router,private location:Location) { 
    //this.router.getCurrentNavigation().extras.state
  }
  statelist: any;
  dummy: any;

  ngOnInit(): void {
    this.editdata = history.state;
   
    this.farmerService.getState().subscribe(allstate => {
      this.allstate = allstate['data'];
    });

    this.farmerForm = new FormGroup({
      fname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      mname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      lname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      aadharcard: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      taluka: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      crop: new FormControl('', [Validators.required]),
      acre: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),


    });

    $('select').formSelect();

    console.log(this.editdata[0]);
    if(this.location.getState())
    {
      const editdatanew = this.editdata[0];
      this.farmerForm.patchValue({
        fname: editdatanew.fname,
        mname: editdatanew.mname,
        lname: editdatanew.lname,
        email: editdatanew.email,
        phone: editdatanew.phone,
        aadharcard: editdatanew.aadharcard,
        state: editdatanew.state,
        district:editdatanew.district,
        taluka:editdatanew.taluka,
        city:editdatanew.city,
        address: editdatanew.address,
        pincode:editdatanew.pincode,
        crop: editdatanew.crop,
        acre: editdatanew.acre,
        password:editdatanew.password,
      });
      
    }

  }

  get f() { return this.farmerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.farmerForm.invalid) {
      console.log('Form Invalid');
      return;
    }
    console.log(this.farmerForm.value);

    this.farmerService.registerFarmer(this.farmerForm.value).subscribe(res=>{
        if (res['success']== true) {
          alert(res['data']);
        }
       });

    this.farmerForm.reset({
      fname: '',
      mname: '',
      lname: '',
      email: '',
      phone: '',

    });
    this.submitted = false;
  }


  getDistrict(event) {
    var obj = {
      state_id: event.target.value
    };

    this.farmerService.getDist(obj).subscribe(alldist => {
      this.alldist = alldist['data'];
    });
  }


  getTalukaAll(event) {
    var obj = {
      dist_id: event.target.value
    };

    this.farmerService.getTaluka(obj).subscribe(alltaluka => {
      this.alltaluka = alltaluka['data'];
    });

  }

  getCityAll(event) {
    var obj = {
      taluka_id: event.target.value
    };

    this.farmerService.getCity(obj).subscribe(allcity => {
      this.allcity = allcity['data'];
    });
  }


}
