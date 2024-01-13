import { Component, OnInit } from '@angular/core';
import { MobileappService } from '../../mobileapp.service';
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
  selector: 'app-addaddress',
  templateUrl: './addaddress.component.html',
  styleUrls: ['./addaddress.component.css']
})
export class AddaddressComponent implements OnInit {

  
  submitted: boolean = false;
  formContent: FormGroup;
  allstate: any;
  editdata: any;
  languageall: any = [];
  languageedit: any = [];
  videoforall: { id: string; name: string; }[];

  constructor(public MobileappService: MobileappService,
    public http: HttpClient, private fb: FormBuilder,
    public router: Router, private location: Location,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private helperService: HelperService,
    private route: ActivatedRoute
  ) {  }
  ngOnInit(): void {

    this.formContent = new FormGroup({
      address: new FormControl('', [Validators.required]),
      mobile_one: new FormControl('', [Validators.required]),
      mobile_two: new FormControl('', [Validators.required]),
      email_office: new FormControl('', [Validators.required]),
      email_sales: new FormControl('', [Validators.required]),
      email_careers: new FormControl('', [Validators.required]),
      website_link: new FormControl('', [Validators.required]),
      facebook_link: new FormControl('', [Validators.required]),
      instagram_link: new FormControl('', [Validators.required]),
      twitter_link: new FormControl('', [Validators.required]),
      whatsapp_link: new FormControl('', [Validators.required]),

      datafor: new FormControl(0),
      id: new FormControl(0)
    });

    this.route.params.subscribe((params: Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    });
    if (this.editdata) {
      var obj = { id: this.editdata };
      this.ngxService.start();
      this.MobileappService.MobileAddressList(obj).subscribe(res => {
        if (res['result'] == true) {
          this.formContent.patchValue({
            address: res['data'][0].address,
            mobile_one: res['data'][0].mobile_one,
            mobile_two: res['data'][0].mobile_two,
            email_office: res['data'][0].email_office,
            email_sales:res['data'][0].email_sales,
            email_careers:res['data'][0].email_careers,
            website_link:res['data'][0].website_link,
            facebook_link:res['data'][0].facebook_link,
            instagram_link:res['data'][0].instagram_link,
            twitter_link:res['data'][0].twitter_link,
            whatsapp_link:res['data'][0].whatsapp_link,
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
          this.router.navigate(['/admin', 'mobileapp-adress-list']);
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

  
    if (this.formContent.value.datafor == 1) {
      this.ngxService.start();
      this.MobileappService.MobileAddressUpdate(this.formContent.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Information updated successfully!");
          this.router.navigate(['/admin', 'mobileapp-adress-list']);
        } else {
          this.toastr.error(res['message']);
        }
        this.ngxService.stop();
      });
    }
  }
}

