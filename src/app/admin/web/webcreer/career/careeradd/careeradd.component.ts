import { Component, OnInit } from '@angular/core';
import { WebService } from "../../../web.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as M from "materialize-css/dist/js/materialize";
import { HelperService } from 'src/app/helper.service';
declare var $: any;
@Component({
  selector: 'app-careeradd',
  templateUrl: './careeradd.component.html',
  styleUrls: ['./careeradd.component.css']
})
export class CareeraddComponent implements OnInit {

  submitted: boolean = false;
  formContent: FormGroup;
  allstate: any;
  editdata: number;
  certificatephotoview: any = "assets/img/placeholder-image.png";
  jobmenuphotoview: any = "assets/img/placeholder-image.png";
  dsitmenuphotoview: any = "assets/img/placeholder-image.png";
  internshipmenuphoto: any = "assets/img/placeholder-image.png";

  showphoto: any;
  fileup: File = null;
  filesize: any;
  filetype: any;
  filetypepresent: boolean = false;
  filetypes: Array<string> = ['image/png', 'image/PNG'];
  gallaryforall: { id: string; name: string; }[];
  dsitmenuphoto: any;
  jobmenuphoto: any;
  certificatephoto: any;

  constructor(public WebService: WebService,
    public http: HttpClient, private fb: FormBuilder,
    public router: Router, private location: Location,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private helperService: HelperService) {

  }
  ngOnInit(): void {
    this.gallaryforall = this.helperService.getGallaryforAllList();
    setTimeout(() => {
      let elems = document.querySelectorAll('select');
      let instances = M.FormSelect.init(elems);
    }, 1000);
    console.log(this.gallaryforall);
    this.formContent = new FormGroup({
      enternshipmenuname: new FormControl('', [Validators.required]),
      distmenuname: new FormControl('', [Validators.required]),
      jobmenuname: new FormControl('', [Validators.required]),
      photo_one: new FormControl(''),
      datafor: new FormControl(0),
      id: new FormControl(0),
      //gallaryfor: new FormControl('', [Validators.required]),
    });

    this.route.params.subscribe((param: Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    });
    if (this.editdata) {
      // this.formContent.removeControl('photo_one');
      var obj = { id: this.editdata };
      this.WebService.webCareerGet(obj).subscribe(res => {
        if (res['result'] == true) {
          console.log(res['result']);
          this.internshipmenuphoto = res['data'][0].internshipmenuphoto;
          this.dsitmenuphotoview = res['data'][0].dsitmenuphotoview;
          this.jobmenuphotoview = res['data'][0].jobmenuphotoview;
          this.certificatephotoview = res['data'][0].certificatephotoview;
          this.showphoto = true;
          this.formContent.patchValue({
            enternshipmenuname: res['data'][0].enternshipmenuname,
            distmenuname: res['data'][0].distmenuname,
            jobmenuname: res['data'][0].jobmenuname,
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

  internshipmenuphoto_event(event) {

    this.internshipmenuphoto = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      //this.farmerphotoview = reader.result;
    };

    this.filesize = this.internshipmenuphoto.size;
    this.filetype = this.internshipmenuphoto.type;

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

  
  dsitmenuphoto_event(event) {

    this.dsitmenuphoto = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      //this.farmerphotoview = reader.result;
    };

    this.filesize = this.dsitmenuphoto.size;
    this.filetype = this.dsitmenuphoto.type;

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

  jobmenuphotoview_event(event) {

    this.jobmenuphoto = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      //this.farmerphotoview = reader.result;
    };

    this.filesize = this.jobmenuphoto.size;
    this.filetype = this.jobmenuphoto.type;

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

  certificatephotoview_event(event) {

    this.certificatephoto = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      //this.farmerphotoview = reader.result;
    };

    this.filesize = this.certificatephoto.size;
    this.filetype = this.certificatephoto.type;

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
    // if (this.filesize > 1000000) {
    //   this.toastr.error("File Size Should be less than 1 MB");
    //   return;
    // }

    // this.filetypes.forEach(element => {
    //   if (element == this.filetype) {
    //     this.filetypepresent = true;
    //   }

    // });
    // if (this.filetypepresent != true) {
    //   this.toastr.error("File type should be png");
    //   return;
    // }

    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.warning("Form Invalid Something Missing /Invalid");
      return;
    }

    // if (this.formContent.value.datafor == 0) {
    //   if (!this.fileup) {
    //     this.toastr.warning("Please choose gallary photo!");
    //     return;
    //   }
    //   this.WebService.addGallaryPhoto(this.formContent.value, this.fileup).subscribe(res => {
    //     if (res['result'] == true) {
    //       this.toastr.success("Career menu name and logo added successfully!");
    //       this.router.navigate(['/admin', 'webcareername-list']);
    //     }
    //   });
    // }
    if (this.formContent.value.datafor == 1) {
      this.WebService.updateCareerMenu(this.formContent.value, this.internshipmenuphoto,this.dsitmenuphoto,this.jobmenuphoto,this.certificatephoto).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Career menu name and logo updated successfully!");
          this.router.navigate(['/admin', 'webcareername-list']);
        }
        else {
          this.toastr.success(res['message']);
          this.router.navigate(['/admin', 'webcareername-list']);
        }
      });
    }
  }
}
