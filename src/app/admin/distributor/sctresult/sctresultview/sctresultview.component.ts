import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../../distributor.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
declare var $: any;
import * as M from "materialize-css/dist/js/materialize";
@Component({
  selector: 'app-sctresultview',
  templateUrl: './sctresultview.component.html',
  styleUrls: ['./sctresultview.component.css']
})
export class SctresultviewComponent implements OnInit {

  submitted: boolean = false;
  formGroupNew: FormGroup;
  allstate: any= [];
  alldist: any = [];
  allcity: any = [];
  alltaluka: any = [];
  flag: number = 0;
  editdata: any;
  statelist: any;
  dummy: any;
  photoviewone: any;
  photoviewtwo: any;
  photoviewthree: any;
  photoviewfour: any;
  photoviewfive: any;
  constructor(public distributorService: DistributorService,
    public http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.editdata = history.state;
    console.log(this.editdata[0].area);
    this.distributorService.getState().subscribe(allstate => {
      this.allstate = allstate['data'];
      setTimeout(()=>{
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      }, 2000);
      // if (this.editdata && !this.flag) {
      //   this.getStateId(this.editdata.state);
      // }
    });

    this.formGroupNew = new FormGroup({
      user_id: new FormControl(''),
      datafor: new FormControl(0),
      fname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      mname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      lname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      area: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      
    });

   
    $('select').formSelect();
    setTimeout(()=>{
      let elems = document.querySelectorAll('select');
      let instances = M.FormSelect.init(elems);
    }, 3000);
    let elems = document.querySelectorAll('select');
    let instances = M.FormSelect.init(elems);
    
    if (this.editdata[0] && this.editdata[0].area) {
      this.photoviewone=this.editdata[0].photopathone;
        this.photoviewtwo=this.editdata[0].photopathtwo;
        this.photoviewthree= this.editdata[0].photopaththree;
        this.photoviewfour=this.editdata[0].photopathfour;
        this.photoviewfive= this.editdata[0].photopathfive;
      this.formGroupNew.patchValue({
        
        fname: this.editdata[0].dfname +' '+this.editdata[0].dmname+' '+this.editdata[0].dlname,
        area: this.editdata[0].area,
        description: this.editdata[0].description,
        latitude: this.editdata[0].latitude,
        longitude: this.editdata[0].longitude,
        date: this.editdata[0].date,
        datafor: 1
      });
      setTimeout(()=>{
        M.updateTextFields();
      },1000);
    }

    $(".paginate_button").hide()

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
      this.distributorService.register(this.formGroupNew.value).subscribe(res=>{
        if (res['result'] == true) {
          this.toastr.success("Distributor added successfully!");
          this.router.navigate(['/admin', 'distributor-list']);
        }
      });
    } else {
      this.distributorService.updateDistributor(this.formGroupNew.value).subscribe(res=>{
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




