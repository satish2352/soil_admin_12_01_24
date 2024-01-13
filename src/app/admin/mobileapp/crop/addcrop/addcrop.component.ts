import { Component, OnInit } from '@angular/core';
import { MobileappService } from '../../mobileapp.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as M from "materialize-css/dist/js/materialize";
declare var $: any;
@Component({
  selector: 'app-addcrop',
  templateUrl: './addcrop.component.html',
  styleUrls: ['./addcrop.component.css']
})
export class AddcropComponent implements OnInit {

  submitted: boolean = false;
  formContent: FormGroup;
  allstate: any;
  editdata: any;
  
  constructor(public MobileappService: MobileappService,
    public http: HttpClient, private fb: FormBuilder,
    public router: Router, private location: Location,
    private toastr: ToastrService,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.formContent = new FormGroup({
      title: new FormControl('', [Validators.required]),
      datafor: new FormControl('0'),
      id: new FormControl('0')
    });

    this.route.params.subscribe((params: Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    })
    if (this.editdata) {
      this.formContent.removeControl('photo_one');
      var obj = { id: this.editdata };
      this.MobileappService.getMobileAppCropEdit(obj).subscribe(res => {
        if (res['result'] == true) {
       
          this.formContent.patchValue({
            title: res['data'][0].title,
            datafor: 1,
            id: res['data'][0].id
          });
          setTimeout(() => {
            M.updateTextFields();
          }, 1000);
        }
      });
    }
  }

  get f() { return this.formContent.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.warning("Details missing");
      return;
    }

    if (this.formContent.value.datafor == 0) {
      
      this.MobileappService.getMobileAppCropAdd(this.formContent.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("About us added successfully!");
          this.router.navigate(['/admin', 'mobileapp-crop-list']);
        }
      });
    }
    if (this.formContent.value.datafor == 1) {
      this.MobileappService.getMobileAppCropUpdate(this.formContent.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success('About us updated successfully!');
          this.router.navigate(['/admin', 'mobileapp-crop-list']);
        }
        else {
          this.toastr.success(res['message']);
          this.router.navigate(['/admin', 'mobileapp-crop-list']);
        }
      });
    }
  }
}
