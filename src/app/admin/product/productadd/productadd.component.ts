import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web/web.service";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../../../helper.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent implements OnInit {

  submitted: boolean = false;
  formContent: FormGroup;
  allstate: any;
  editdata: any;
  photoview: any;
  showphoto: any;
  fileupone: File = null;
  fileuptwo: File = null;
  fileupthree: File = null;
  fileupfour: File = null;
  fileupfive: File = null;
  fileuponepreview: any = "assets/img/placeholder-image.png";
  fileuptwopreview: any = "assets/img/placeholder-image.png";
  fileupthreepreview: any = "assets/img/placeholder-image.png";
  fileupfourpreview: any = "assets/img/placeholder-image.png";
  fileupfivepreview: any = "assets/img/placeholder-image.png";
  unitsall: any;
  count_user_click: number = 1;
  photoaddedcount: number;
  productdetailsaddedcount: number;

  constructor(public WebService: WebService,
    public http: HttpClient, private fb: FormBuilder,
    public router: Router, private location: Location,
    private toastr: ToastrService,
    private helperService: HelperService,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.editdata = history.state;
    this.unitsall = this.helperService.getUnitList();
    setTimeout(()=>{
      let elems = document.querySelectorAll('select');
      let instances = M.FormSelect.init(elems);
    },1000);
    this.formContent = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      productDetails: new FormArray([
        new FormGroup({
          quantity: new FormControl('', [Validators.required]),
          quantity_unit: new FormControl('', [Validators.required]),
          farmer_price: new FormControl('', [Validators.required]),
          old_price: new FormControl('', [Validators.required]),
          dsc_price: new FormControl('', [Validators.required]),
          bsc_price: new FormControl('', [Validators.required]),
          fsc_price: new FormControl('', [Validators.required]),
        })
      ]),
      photoDetails: new FormArray([
        new FormGroup({
          photo_one: new FormControl(''),
        }),
        new FormGroup({
          photo_one: new FormControl(''),
        }),
        new FormGroup({
          photo_one: new FormControl(''),
        }),
        new FormGroup({
          photo_one: new FormControl(''),
        }),
        new FormGroup({
          photo_one: new FormControl(''),
        })
      ]),
      link: new FormControl('', [Validators.required]),
      datafor: new FormControl('0'),
      id: new FormControl('0')
    });
    if (this.editdata[0]) {
      (this.editdata[0].photopathone)?(this.fileuponepreview = this.editdata[0].photopathone):"assets/img/placeholder-image.png";
      (this.editdata[0].photopathtwo)?(this.fileuptwopreview = this.editdata[0].photopathtwo):"assets/img/placeholder-image.png";
      (this.editdata[0].photopaththree)?this.fileupthreepreview = this.editdata[0].photopaththree:"assets/img/placeholder-image.png";
      (this.editdata[0].photopathfour)?this.fileupfourpreview = this.editdata[0].photopathfour:"assets/img/placeholder-image.png";
      (this.editdata[0].photopathfive)?this.fileupfivepreview = this.editdata[0].photopathfive:"assets/img/placeholder-image.png";

      this.formContent.patchValue({
        title: this.editdata[0].title,
        content: this.editdata[0].content,
        productDetails: [{
          quantity: this.editdata[0].quantity,
          quantity_unit: this.editdata[0].quantity_unit,
          farmer_price: this.editdata[0].farmer_price,
          old_price: this.editdata[0].old_price,
          dsc_price: this.editdata[0].dsc_price,
          bsc_price: this.editdata[0].bsc_price,
          fsc_price: this.editdata[0].fsc_price,
        }],
        link: this.editdata[0].link,
        datafor: 1,
        id: this.editdata[0].id
      });
      setTimeout(()=>{
        M.updateTextFields();
      },500);
      setTimeout(()=>{
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      },500);
    }
  }

  get d() { return this.formContent.get('productDetails') as FormArray }

  get photo() { return this.formContent.get('photoDetails') as FormArray }

  addMoreDetails() {
    this.productdetailsaddedcount=this.d.length;
    if(this.productdetailsaddedcount>4)
    {
      alert("Can't add above 5 product details");
    }
    else
    {

      this.d.push(new FormGroup({
        quantity: new FormControl('', [Validators.required]),
        quantity_unit: new FormControl('', [Validators.required]),
        farmer_price: new FormControl('', [Validators.required]),
        old_price: new FormControl('', [Validators.required]),
        dsc_price: new FormControl('', [Validators.required]),
        bsc_price: new FormControl('', [Validators.required]),
        fsc_price: new FormControl('', [Validators.required]),
      }));
    }
  }

  deleteDetails(index) {
    this.d.removeAt(index);
  }

  addMorePhoto()
  {
    this.photoaddedcount=this.photo.length;
    if(this.photoaddedcount>4)
    {
      alert("Can't add above 5 product images");
    }
    else
    {
      this.photo.push(new FormGroup({
        photo_one: new FormControl(''),
      }));
    }
  }

  deletePhoto(index) {
    this.photo.removeAt(index);
  }

  onFileSelect(event,val) {
    if(val==0){ this.fileupone = event.target.files[0]; }
    if(val==1){ this.fileuptwo = event.target.files[0]; }
    if(val==2){ this.fileupthree = event.target.files[0]; }
    if(val==3){ this.fileupfour = event.target.files[0]; }
    if(val==4){ this.fileupfive = event.target.files[0]; }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      if (val==0) { this.fileuponepreview = reader.result; }
      if (val==1) { this.fileuptwopreview = reader.result; }
      if (val==2) { this.fileupthreepreview = reader.result; }
      if (val==3) { this.fileupfourpreview = reader.result; }
      if (val==4) { this.fileupfivepreview = reader.result; }
    };
  }
  get f() { return this.formContent.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.error("Form Invalid Something Missing /Invalid");
      return;
    }

    if (this.formContent.value.datafor == 0) {
      if (!this.fileupone && !this.fileuptwo && !this.fileupthree && !this.fileupfour && !this.fileupfive) {
        this.toastr.warning('Add 5 product images!');
        return;
      }
      // this.ngxService.start();
      this.WebService.addProduct(this.formContent.value, this.fileupone,this.fileuptwo,this.fileupthree,this.fileupfour,this.fileupfive).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Product added successfully!");
          this.router.navigate(['/admin', 'product-list']);
        }
        else {
          this.toastr.error(res['message']);
          this.router.navigate(['/admin', 'product-list']);
        }
      });
    } else {
      this.WebService.webProductUpdate(this.formContent.value, this.fileupone,this.fileuptwo,this.fileupthree,this.fileupfour,this.fileupfive).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Product updated successfully!");
          this.router.navigate(['/admin', 'product-list']);
        }
        else {
          this.toastr.error(res['message']);
        }
      });
    }
  }

}
