import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as M from "materialize-css/dist/js/materialize";
import { HelperService } from 'src/app/helper.service';
declare var $: any;

@Component({
  selector: 'app-gallaryphotoadd',
  templateUrl: './gallaryphotoadd.component.html',
  styleUrls: ['./gallaryphotoadd.component.css']
})
export class GallaryphotoaddComponent implements OnInit {

  submitted: boolean = false;
  formContent: FormGroup;
  allstate: any;
  editdata: number;
  farmerphotoview: any = "assets/img/placeholder-image.png";
  showphoto: any;
  fileup: File = null;
  filesize: any;
  filetype: any;
  filetypepresent: boolean = false;
  filetypes: Array<string> = ['image/png', 'image/PNG'];
  gallaryforall: { id: string; name: string; }[];

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
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      photo_one: new FormControl(''),
      datafor: new FormControl(0),
      id: new FormControl(0),
      gallaryfor:new FormControl('',[Validators.required]),
    });

    this.route.params.subscribe((param: Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    });
    if (this.editdata) {
      // this.formContent.removeControl('photo_one');
      var obj = { id: this.editdata };
      this.WebService.getGallaryPhotoEdit(obj).subscribe(res => {
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

    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.warning("Form Invalid Something Missing /Invalid");
      return;
    }

    if (this.formContent.value.datafor == 0) {
      if (!this.fileup) {
        this.toastr.warning("Please choose gallary photo!");
        return;
      }
      this.WebService.addGallaryPhoto(this.formContent.value, this.fileup).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Gallary photo added successfully!");
          this.router.navigate(['/admin', 'gallaryphoto-list']);
        }
      });
    }
    if (this.formContent.value.datafor == 1) {
      this.WebService.updateGallaryPhoto(this.formContent.value, this.fileup).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Gallary photo updated successfully!");
          this.router.navigate(['/admin', 'gallaryphoto-list']);
        }
        else {
          this.toastr.success(res['message']);
          this.router.navigate(['/admin', 'gallaryphoto-list']);
        }
      });
    }
  }
}
