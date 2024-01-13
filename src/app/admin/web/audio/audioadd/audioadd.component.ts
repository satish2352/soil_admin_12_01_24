import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../../../../helper.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as M from "materialize-css/dist/js/materialize";
declare var $: any;

@Component({
  selector: 'app-audioadd',
  templateUrl: './audioadd.component.html',
  styleUrls: ['./audioadd.component.css']
})
export class AudioaddComponent implements OnInit {

  submitted: boolean = false;
  formContent: FormGroup;
  filesize: any;
  filetype: any;
  allstate: any;
  editdata: any;
  photoview: any;
  showphoto: any;
  fileupone: File = null;
  fileuptwo: File = null;
  languageall: any;
  languageedit: any;
  constructor(public WebService: WebService,
    public http: HttpClient, private fb: FormBuilder,
    public router: Router, private location: Location,
    private toastr: ToastrService,
    private helperService: HelperService,
    private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    this.editdata = history.state;
    this.languageall = this.helperService.getLanguageList();
    setTimeout(() => {
      let elems = document.querySelectorAll('select');
      let instances = M.FormSelect.init(elems);
    }, 1000);
    this.formContent = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      language: new FormControl('', [Validators.required]),
      audio_clip: new FormControl(''),
      datafor: new FormControl(0),
      id: new FormControl(0)
    });


    this.route.params.subscribe((params: Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    });

    if (this.editdata) {
      this.formContent.removeControl('audio_clip');
      var obj = { id: this.editdata };
      this.ngxService.start();
      this.WebService.webAudioForEdit(obj).subscribe(res => {
        if (res['result'] == true) {
          this.languageedit = res['data'][0].language;
          this.photoview = res['data'][0].photopathone;
          this.showphoto = true;
          this.formContent.patchValue({
            title: res['data'][0].title,
            content: res['data'][0].content,
            language: res['data'][0].language,
            datafor: 1,
            id: res['data'][0].id
          });
          setTimeout(() => {
            M.updateTextFields();
          }, 1000);
          setTimeout(() => {
            let elems = document.querySelectorAll('select');
            let instances = M.FormSelect.init(elems);
          }, 1000);
        }
        if (res['error'] == true) {
          this.toastr.error("Something went wrong " + res['message']);
          this.router.navigate(['/admin', 'webaudio-list']);
        }
      });
      this.ngxService.stop();

    }
  }

  onFileSelect(event) {
    this.fileupone = event.target.files[0];
    this.filesize = this.fileupone.size;
    this.filetype = this.fileupone.type;

    if (this.filesize > 2000000) {
      this.toastr.error("File Size Should be less than 2 MB");
      return;
    }
    if (this.filetype != 'audio/mpeg') {
      this.toastr.error("File type should be audio");
      return;
    }


  }

  get f() { return this.formContent.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.formContent.value.datafor == 0) {
      if (this.filesize > 2000000) {
        this.toastr.error("File Size Should be less than 2 MB");
        return;
      }
      if (this.filetype != 'audio/mpeg') {
        this.toastr.error("File type should be audio");
        return;
      }
    }


    if (this.formContent.invalid) {
      this.toastr.warning("Form Invalid Something Missing /Invalid");
      return;
    }

    if (this.formContent.value.datafor == 0) {
      if (!this.fileupone) {
        this.toastr.warning('Choose audio file!');
      }
      this.ngxService.start();
      this.WebService.webAudioAdd(this.formContent.value, this.fileupone).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Audio added successfully!");
          this.router.navigate(['/admin', 'webaudio-list']);
        }
        else {
          this.toastr.error(res['message']);
          this.router.navigate(['/admin', 'webaudio-list']);
        }
      });

      this.ngxService.stop();
    }
    if (this.formContent.value.datafor == 1) {
      this.ngxService.start();
      this.WebService.webAudioUpdate(this.formContent.value, this.fileupone).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success(res['message']);
          this.router.navigate(['/admin', 'webaudio-list']);
        }
        else {
          this.toastr.error("No Information Edited/Updated");
          this.router.navigate(['/admin', 'webaudio-list']);
        }
      });

      this.ngxService.stop();
    }
  }
}
