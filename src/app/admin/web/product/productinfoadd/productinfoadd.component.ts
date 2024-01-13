import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
// import * as M from "materialize-css/dist/js/materialize";
import * as M from 'materialize-css';

import { OrderService } from 'src/app/admin/orders/order.service';
declare var $: any;
@Component({
  selector: 'app-productinfoadd',
  templateUrl: './productinfoadd.component.html',
  styleUrls: ['./productinfoadd.component.css']
})
export class ProductinfoaddComponent implements OnInit {
  products: any = [];
  submitted: boolean = false;
  formContent: FormGroup;
  allstate: any;
  editdata: any;
  farmerphotoview: any = "assets/img/placeholder-image.png";
  showphoto: boolean = false;
  fileup: File = null;
  filesize: any;
  filetype: any;
  filetypepresent: boolean = false;
  filetypes: Array<string> = ['image/png', 'image/PNG'];
  photopath: any;
  constructor(public WebService: WebService,
    public http: HttpClient, private fb: FormBuilder,
    public router: Router, private location: Location,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private os: OrderService,) {

  }
  ngOnInit(): void {


    this.os.getProducts().subscribe(res => {
      if (res['result']) {
        this.products = res['data'];
      }
    });

    setTimeout(() => {
      let elems = document.querySelectorAll('select');
      let instances = M.FormSelect.init(elems);
    }, 1000);


    this.showphoto = false;
    this.formContent = new FormGroup({
      product_id: new FormControl('', [Validators.required]),
      short_description: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required]),
      review_person_name: new FormControl('', [Validators.required]),
      review: new FormControl('', [Validators.required]),
      long_description: new FormControl('', [Validators.required]),
      additional_info: new FormControl('', [Validators.required]),
      photo_one: new FormControl(''),
      datafor: new FormControl('0'),
      id: new FormControl('0')
    });

    this.route.params.subscribe((params: Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    })
    if (this.editdata) {
      this.formContent.removeControl('photo_one');
      var obj = { id: this.editdata };
      this.WebService.webProductInfoEdit(obj).subscribe(res => {
        if (res['result'] == true) {
          //
          this.showphoto = true;
          //this.photopath = res['data'][0].photopath;
          this.farmerphotoview= res['data'][0].photopath,
          this.formContent.patchValue({
            short_description: res['data'][0].short_description,
            rating: res['data'][0].rating,
            review_person_name: res['data'][0].review_person_name,
            review: res['data'][0].review,
            long_description: res['data'][0].long_description,
            additional_info: res['data'][0].additional_info,
            product_id: res['data'][0].product_id,
            datafor: 1,
            id: res['data'][0].id,
            farmerphotoview: res['data'][0].photopath,
          });
          setTimeout(() => {
            M.updateTextFields();
          }, 1000);
          setTimeout(() => {
            let elems = document.querySelectorAll('select');
            let instances = M.FormSelect.init(elems);
          }, 1000);
        }
      });
    }
  }

  onFileSelect(event) {
    this.fileup = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.farmerphotoview = reader.result;
    };

    this.filesize = this.fileup.size;
    this.filetype = this.fileup.type;

    if (this.filesize > 1000000) {
      this.toastr.error("File Size Should be less than 1 MB");
    }

    this.filetypes.forEach(element => {
      if (element == this.filetype) {
        this.filetypepresent = true;
      }

    });
    if (this.filetypepresent != true) {
      this.toastr.error("File type should be png");
      return;
    }
  }
  get f() { return this.formContent.controls; }

  onSubmit() {

    if (this.formContent.value.datafor == 0 || this.fileup != null) {
      if (this.filesize > 1000000) {
        this.toastr.error("File Size Should be less than 1 MB");
        return;
      }

      this.filetypes.forEach(element => {
        if (element == this.filetype) {
          this.filetypepresent = true;
        }

      });
      if (this.filetypepresent != true) {
        this.toastr.error("File type should be png");
        return;
      }
    }

    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.warning("Details missing");
      return;
    }

    if (this.formContent.value.datafor == 0) {
      if (!this.fileup) {
        this.toastr.warning("Please choose photo!");
        return;
      }
      this.WebService.addWebProductInfo(this.formContent.value, this.fileup).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Product added successfully!");
          this.router.navigate(['/admin', 'webproductinfo-list']);
        }
      });
    }
    if (this.formContent.value.datafor == 1) {
      this.WebService.webProductInfoUpdate(this.formContent.value, this.fileup).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success('Product updated successfully!');
          this.router.navigate(['/admin', 'webproductinfo-list']);
        }
        else {
          this.toastr.success(res['message']);
          this.router.navigate(['/admin', 'webproductinfo-list']);
        }
      });
    }
  }
}
