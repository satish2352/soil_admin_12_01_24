import { Component, OnInit } from '@angular/core';
import { WebService } from "../../../web.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../../../../../helper.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as M from "materialize-css/dist/js/materialize";
declare var $: any;

@Component({
  selector: 'app-articleadd',
  templateUrl: './articleadd.component.html',
  styleUrls: ['./articleadd.component.css']
})
export class ArticleaddComponent implements OnInit {

  submitted: boolean = false;
  formContent: FormGroup;
  allstate: any;
  editdata: number;
  photoviewone: any = "assets/img/placeholder-image.png";
  photoviewtwo: any = "assets/img/placeholder-image.png";
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.languageall = this.helperService.getLanguageList();
    setTimeout(()=>{
      let elems = document.querySelectorAll('select');
      let instances = M.FormSelect.init(elems);
    },1000);
    this.formContent = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      photo_one: new FormControl(''),
      photo_two: new FormControl(''),
      language: new FormControl('', [Validators.required]),
      datafor: new FormControl('0'),
      id: new FormControl('0')
    });

    this.route.params.subscribe((params: Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    });

    if (this.editdata) {
      // this.formContent.removeControl('photo_one');
      // this.formContent.removeControl('photo_two');
      var obj = { id: this.editdata   };
      this.ngxService.start();
      this.WebService.webBlogArticleForEdit(obj).subscribe(res => {
        if (res['result'] == true)
        {
          this.languageedit = res['data'][0].language;
          this.photoviewone = res['data'][0].photopathone;
          this.photoviewtwo = res['data'][0].photopathtwo;
          this.showphoto = true;
          this.formContent.patchValue({
            title: res['data'][0].title,
            content: res['data'][0].content,
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
          this.router.navigate(['/admin', 'blogarticle-lsit'], { state: res['data'] });
        }
      });
      this.ngxService.stop();
    }

  }

  onFileSelect(event, type) {
    if (type === 'one') {
      this.fileupone = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.photoviewone = reader.result;
      };
    }
    else {
      this.fileuptwo = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.photoviewtwo = reader.result;
      };
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
      if (!this.fileupone && !this.fileuptwo) {
        this.toastr.warning('Choose blog article photos!');
        return;
      }
      this.ngxService.start();
      this.WebService.webBlogArticleAdd(this.formContent.value, this.fileupone, this.fileuptwo).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Blog article added successfully!");
          this.router.navigate(['/admin', 'blogarticle-list']);
        }
        else {
          this.toastr.error(res['message']);
          this.router.navigate(['/admin', 'blogarticle-list']);
        }
      });
      this.ngxService.stop();
    }

    if (this.formContent.value.datafor == 1) {
      this.ngxService.start();
      this.WebService.webBlogArticleUpdate(this.formContent.value, this.fileupone, this.fileuptwo).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Blog article updated successfully!");
          this.router.navigate(['/admin', 'blogarticle-list']);
        }
        else {
          this.toastr.error(res['message']);
          this.router.navigate(['/admin', 'blogarticle-list']);
        }
      });
      this.ngxService.stop();
    }
  }
}
