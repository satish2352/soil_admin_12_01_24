import { Component, OnInit } from '@angular/core';
import { FcofieldService } from "../../fcofield.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PreloadAllModules, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as M from "materialize-css/dist/js/materialize";
declare var $: any;

@Component({
  selector: 'app-plotvisitadd',
  templateUrl: './plotvisitadd.component.html',
  styleUrls: ['./plotvisitadd.component.css']
})
export class PlotvisitaddComponent implements OnInit {

  submitted: boolean = false;
  farmerForm: FormGroup;
  allstate: any;
  alldist: any;
  allcity: any;
  alltaluka: any;
  email: any;
  phone: any;
  state: any;
  district: any;
  taluka: any;
  city: any;
  address: any;
  editdata: any;
  famrmerdetailsall: any = [];
  statelist: any = [];
  dummy: any;

  constructor(public fcofieldService: FcofieldService,
    public http: HttpClient, private fb:
      FormBuilder, public router: Router,
    private location: Location,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.editdata = history.state;
    this.getFarmers();
    this.getStates();

    this.farmerForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      farmer_id: new FormControl('', [Validators.required]),
      crop: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z']+( +[A-Za-z']+)*$/)]),
      acer: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]$/)]),
      description_about_visit: new FormControl('', [Validators.required]),
      about_visit: new FormControl('', [Validators.required]),
      datafor: new FormControl(0),
      visit_id: new FormControl(0)
    });

    $('select').formSelect();

    if (this.location.getState()) {
      const editdatanew = this.editdata[0];
      var obj = { user_id: editdatanew.farmer_id };
      this.fcofieldService.getFarmerDetails(obj).subscribe(farmerDataFinal => {
        var farmerData = farmerDataFinal['data'];
        this.phone = farmerData[0].phone;
        this.address = farmerData[0].address;
        this.state = farmerData[0].state;
        this.district = farmerData[0].district;
        this.taluka = farmerData[0].taluka;
        this.city = farmerData[0].city;
      });

      this.farmerForm.patchValue({
        date: editdatanew.date,
        farmer_id: editdatanew.farmer_id,
        crop: editdatanew.crop,
        acer: editdatanew.acer,
        description_about_visit: editdatanew.description_about_visit,
        about_visit: editdatanew.about_visit,
        datafor: 1,
        visit_id: editdatanew.id
      });
      setTimeout(()=>{
        M.updateTextFields();
      },1000);
      setTimeout(()=>{
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      },1000);
    }
  }

  getFarmers() {
    var data={

    }
    this.fcofieldService.getFarmerList(data).subscribe(famrmerdetailsall => {
      this.famrmerdetailsall = famrmerdetailsall['data'];
      setTimeout(()=>{
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      },1000);
    });
  }

  getStates() {
    this.fcofieldService.getState().subscribe(allstate => {
      this.allstate = allstate['data'];
      setTimeout(()=>{
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      },1000);
    });
  }

  get f() { return this.farmerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.farmerForm.invalid) {
      return;
    }
    if (this.farmerForm.value.datafor == '0') {
      this.fcofieldService.addPlotVisit(this.farmerForm.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Plot visit added successfully!");
          this.router.navigate(['/admin', 'plotvisit-list']);
        }
      });
    }
    else {
      this.fcofieldService.updatePlotVisit(this.farmerForm.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Plot visit updated successfully!");
          this.router.navigate(['/admin', 'plotvisit-list']);
        }
      });
    }
  }

  getFarmerDetails(event) {
    var obj = {
      user_id: event.target.value
    }
    this.fcofieldService.getFarmerDetails(obj).subscribe(farmerDataFinal => {
      var farmerData = farmerDataFinal['data'];
      this.phone = farmerData[0].phone;
      this.address = farmerData[0].address;
      this.state = farmerData[0].state;
      this.district = farmerData[0].district;
      this.taluka = farmerData[0].taluka;
      this.city = farmerData[0].city;
    });
  }


}
