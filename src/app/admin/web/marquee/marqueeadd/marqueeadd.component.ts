import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as M from "materialize-css/dist/js/materialize";
declare var $: any;
@Component({
  selector: 'app-marqueeadd',
  templateUrl: './marqueeadd.component.html',
  styleUrls: ['./marqueeadd.component.css']
})


export class MarqueeaddComponent implements OnInit {


  submitted: boolean = false;
  formContent: FormGroup;
  allstate: any;
  editdata: any;
  
  constructor(public WebService: WebService,
    public http: HttpClient, private fb: FormBuilder,
    public router: Router, private location: Location,
    private toastr: ToastrService,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.formContent = new FormGroup({
      marquee: new FormControl('', [Validators.required]),
      datafor: new FormControl('0'),
      id: new FormControl('0')
    });

    this.route.params.subscribe((params: Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    })
    if (this.editdata) {
      this.formContent.removeControl('photo_one');
      var obj = { id: this.editdata };
      this.WebService.getMarqueEdit(obj).subscribe(res => {
        if (res['result'] == true) {
       
          this.formContent.patchValue({
            marquee: res['data'][0].marquee,
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
      
      this.WebService.getMarqueAdd(this.formContent.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("News added successfully!");
          this.router.navigate(['/admin', 'marquee-list']);
        }
      });
    }
    if (this.formContent.value.datafor == 1) {
      this.WebService.getMarqueUpdate(this.formContent.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success('News updated successfully!');
          this.router.navigate(['/admin', 'marquee-list']);
        }
        else {
          this.toastr.success(res['message']);
          this.router.navigate(['/admin', 'marquee-list']);
        }
      });
    }
  }
}
