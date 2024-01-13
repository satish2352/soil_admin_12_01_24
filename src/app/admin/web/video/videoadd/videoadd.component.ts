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
  selector: 'app-videoadd',
  templateUrl: './videoadd.component.html',
  styleUrls: ['./videoadd.component.css']
})
export class VideoaddComponent implements OnInit {

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

    this.videoforall = this.helperService.getVideoforAllList();
    setTimeout(() => {
      let elems = document.querySelectorAll('select');
      let instances = M.FormSelect.init(elems);
    }, 1000);

    this.languageall = this.helperService.getLanguageList();
    setTimeout(()=>{
      let elems = document.querySelectorAll('select');
      let instances = M.FormSelect.init(elems);
    },1000);
    this.formContent = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      datafor: new FormControl(0),
      id: new FormControl(0),
      videofor:new FormControl('',[Validators.required])
    });

    this.route.params.subscribe((params: Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    });
    if (this.editdata) {
      var obj = { id: this.editdata };
      this.ngxService.start();
      this.WebService.WebVideoForEdit(obj).subscribe(res => {
        if (res['result'] == true) {
          this.languageedit = res['data'][0].language;
          this.formContent.patchValue({
            title: res['data'][0].title,
            description: res['data'][0].description,
            url: res['data'][0].url,
            language: res['data'][0].language,
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
          this.router.navigate(['/admin', 'webvideo-list']);
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
          this.toastr.success("Video added successfully!");
          this.router.navigate(['/admin', 'webvideo-list']);
        }
        else {
          this.toastr.error(res['message']);
          this.router.navigate(['/admin', 'webvideo-list']);
        }
      });
      this.ngxService.stop();
    }
    if (this.formContent.value.datafor == 1) {
      this.ngxService.start();
      this.WebService.webVideoUpdate(this.formContent.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Video updated successfully!");
          this.router.navigate(['/admin', 'webvideo-list']);
        } else {
          this.toastr.error(res['message']);
        }
        this.ngxService.stop();
      });
    }
  }
}
