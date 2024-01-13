import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { HelperService } from '../../../../helper.service'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as M from "materialize-css/dist/js/materialize";
declare var $: any;
@Component({
  selector: 'app-countadd',
  templateUrl: './countadd.component.html',
  styleUrls: ['./countadd.component.css']
})
export class CountaddComponent implements OnInit {

  submitted: boolean = false;
  formContent: FormGroup;
  allstate: any;
  editdata: any;
  languageall: any = [];
  languageedit: any = [];
  videoforall: { id: string; name: string; }[];

  constructor(public WebService: WebService,
    public http: HttpClient, private fb: FormBuilder,
    public router: Router, private location: Location,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private helperService: HelperService,
    private route: ActivatedRoute
  ) {  }
  ngOnInit(): void {

    this.formContent = new FormGroup({
      farmer_count: new FormControl('', [Validators.required]),
      sem_meet_count: new FormControl('', [Validators.required]),
      app_down_count: new FormControl('', [Validators.required]),
      youtube_sus_count: new FormControl('', [Validators.required]),
      distributor_count: new FormControl('', [Validators.required]),
      datafor: new FormControl(0),
      id: new FormControl(0)
    });

    this.route.params.subscribe((params: Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    });
    if (this.editdata) {
      var obj = { id: this.editdata };
      this.ngxService.start();
      this.WebService.WebFrontCounterEditGet(obj).subscribe(res => {
        if (res['result'] == true) {
          this.formContent.patchValue({
            farmer_count: res['data'][0].farmer_count,
            sem_meet_count: res['data'][0].sem_meet_count,
            app_down_count: res['data'][0].app_down_count,
            youtube_sus_count: res['data'][0].youtube_sus_count,
            distributor_count:res['data'][0].distributor_count,
            datafor: 1,
            id: res['data'][0].id
          });
          setTimeout(()=>{
            M.updateTextFields();
          },1000);
          setTimeout(()=>{
            let elems = document.querySelectorAll('select');
            let instances = M.FormSelect.init(elems);
          },1000);
        }
        if (res['error'] == true) {
          this.toastr.error("Something went wrong " + res['message']);
          this.router.navigate(['/admin', 'webcount-list']);
        }
      });
      this.ngxService.stop();
    }
  }

  get f() { return this.formContent.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.warning("Form Invalid Something Missing /Invalid");
      return;
    }

    if (this.formContent.value.datafor == 0) {
      this.ngxService.start();
      this.WebService.webVideoMissionAdd(this.formContent.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Count added successfully!");
          this.router.navigate(['/admin', 'webcount-list']);
        }
        else {
          this.toastr.error(res['message']);
          this.router.navigate(['/admin', 'webcount-list']);
        }
      });
      this.ngxService.stop();
    }
    if (this.formContent.value.datafor == 1) {
      this.ngxService.start();
      this.WebService.WebFrontCounterUpdate(this.formContent.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Count updated successfully!");
          this.router.navigate(['/admin', 'webcount-list']);
        } else {
          this.toastr.error(res['message']);
        }
        this.ngxService.stop();
      });
    }
  }
}
