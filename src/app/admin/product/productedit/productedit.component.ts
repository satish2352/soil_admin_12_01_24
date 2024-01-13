import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web/web.service";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../../../helper.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css']
})
export class ProducteditComponent implements OnInit {

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
  unitedit: any;
  count_user_click: number = 1;
  photopath_one: any;
  unitsall: { id: string; name: string; }[];
  photoaddedcount: number;
  photopaththree: any;
  photopathtwo: any;
  photopathfive: any;
  photopathone: any;
  constructor(public WebService: WebService,
    public http: HttpClient, private fb: FormBuilder,
    public router: Router, private location: Location,
    private toastr: ToastrService,
    private helperService: HelperService,
    private ngxService: NgxUiLoaderService,
    private route:ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.editdata = history.state;
    this.unitsall = this.helperService.getUnitList();
    this.formContent = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      quantity_unit: new FormControl('', [Validators.required]),
      farmer_price: new FormControl('', [Validators.required]),
      old_price: new FormControl('', [Validators.required]),
      dsc_price: new FormControl('', [Validators.required]),
      bsc_price: new FormControl('', [Validators.required]),
      fsc_price: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
      datafor: new FormControl('0'),
      id: new FormControl('0'),

      // photoDetailsImage: new FormArray([
      //   new FormGroup({
      //     photo_one: new FormControl('', [Validators.required]),
      //   })
      // ]),

    });

    this.route.params.subscribe((params:Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    })
    if (this.editdata) {
      //this.formContent.removeControl('photo_one');
      var obj = { id: this.editdata };
      this.WebService.webProductEdit(obj).subscribe(res => {
        if (res['result'] == true) {
          this.showphoto = true;
          this.photopathone=res['data'][0].photopathone;
          this.photopathtwo=res['data'][0].photopathtwo;
          this.photopaththree=res['data'][0].photopaththree;
          this.photopathtwo=res['data'][0].photopathfour;
          this.photopathfive=res['data'][0].photopathfive;
         // this.photopath_one = res['data'][0].photopath;
          this.unitedit=res['data'][0].quantity_unit;
          this.formContent.patchValue({
            title: res['data'][0].title,
            content: res['data'][0].content,
            quantity: res['data'][0].quantity,
            //quantity_unit: res['data'][0].quantity_unit,
            farmer_price: res['data'][0].farmer_price,
            old_price: res['data'][0].old_price,
            dsc_price: res['data'][0].dsc_price,
            bsc_price: res['data'][0].bsc_price,
            fsc_price: res['data'][0].fsc_price,
            link: res['data'][0].link,
            datafor: 1,
            id: res['data'][0].id,
          });
        }
      });
    }
  }

  get validatedata() { return this.formContent.controls; }
  get photo() { return this.formContent.get('photoDetails') as FormArray }

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
        photo_one: new FormControl('', [Validators.required]),
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
  }
  get f() { return this.formContent.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.error("Form Invalid Something Missing /Invalid");
      return;
    }
    console.log(this.formContent.value);

     // this.ngxService.start();
      this.WebService.webProductUpdate(this.formContent.value, this.fileupone,this.fileuptwo,this.fileupthree,this.fileupfour,this.fileupfive).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Information Added");
          this.router.navigate(['/admin', 'product-list']);
        }
        else {
          this.toastr.error("No Information Added");
          this.router.navigate(['/admin', 'product-list']);
        }
      });

  }

}
