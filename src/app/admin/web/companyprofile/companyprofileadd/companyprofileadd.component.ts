import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-companyprofileadd',
  templateUrl: './companyprofileadd.component.html',
  styleUrls: ['./companyprofileadd.component.css']
})
export class CompanyprofileaddComponent implements OnInit {
  submitted: boolean = false;
  formContent: FormGroup;
  allstate: any;
  editdata: any;
  farmerphotoview: any = 'assets/img/placeholder-image.png';
  showphoto: any;
  fileup: File = null;
  editId: number;
  filesize: any;
  filetype: any;
  filetypepresent: boolean = false;
  filetypes: Array<string> = ['image/png', 'image/PNG'];
  constructor(public WebService: WebService,
    public http: HttpClient, private fb: FormBuilder,
    public router: Router, private location: Location,
    private toastr: ToastrService,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.formContent = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      photo_one: new FormControl(''),
      datafor: new FormControl('0'),
      id: new FormControl('0')
    });

    this.route.params.subscribe((params: Params) => {
      this.editId = +this.route.snapshot.params['id'];
    })
    if (this.editId) {
      this.formContent.removeControl('photo_one');
      var obj = { id: this.editId };
      this.WebService.getCompanyProfileForEdit(obj).subscribe(res => {
        // console.log(res);
        if (res['result'] == true) {
          this.farmerphotoview = res['data'][0].photopath;
          this.showphoto = true;
          this.formContent.patchValue({
            title: res['data'][0].title,
            content: res['data'][0].content,
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
      this.toastr.warning("Details missing!");
      return;
    }

    if (this.formContent.value.datafor == 0) {
      if (!this.fileup) {
        this.toastr.warning("Please choose company profile photo!");
        return;
      }
      this.WebService.addCompanyProfile(this.formContent.value, this.fileup).subscribe(res => {
        if (res['result']) {
          this.toastr.success("Company profile added successfully!");
          this.router.navigate(['/admin', 'companyprofile-list']);
        }
      });
    }

    if (this.formContent.value.datafor == 1) {
      this.WebService.updateCompanyProfile(this.formContent.value, this.fileup).subscribe(res => {
        if (res['result']) {
          this.toastr.success('Company profile updated successfully!');
          this.router.navigate(['/admin', 'companyprofile-list']);
        }
        else {
          this.toastr.success(res['message']);
          this.router.navigate(['/admin', 'companyprofile-list']);
        }
      });
    }
  }
}
