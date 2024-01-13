import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as M from "materialize-css/dist/js/materialize";
declare var $: any;

@Component({
  selector: 'app-visionmissionadd',
  templateUrl: './visionmissionadd.component.html',
  styleUrls: ['./visionmissionadd.component.css']
})
export class VisionmissionaddComponent implements OnInit {

  submitted: boolean = false;
  formContent: FormGroup;
  allstate: any;
  editdata: any;
  farmerphotoview: any = "assets/img/placeholder-image.png";
  showphoto: any;
  fileup: File = null;
  filesize: any;
  filetype: any;
  record_for:any;
  filetypepresent: boolean = false;
  filetypes: Array<string> = ['image/png', 'image/PNG'];

  constructor(public WebService: WebService,
    public http: HttpClient, private fb: FormBuilder,
    public router: Router, private location: Location,
    private toastr: ToastrService,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.editdata = history.state;

    this.formContent = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      record_for: new FormControl('', [Validators.required]),
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
      this.WebService.getVisionMissionEdit(obj).subscribe(res => {
        if (res['result'] == true) {
          this.farmerphotoview = res['data'][0].photopath;
          this.showphoto = true;
          this.formContent.patchValue({
            title: res['data'][0].title,
            content: res['data'][0].content,
            record_for: res['data'][0].record_for,
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
    console.log(this.fileup.name);
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
      console.log(this.filetypepresent);
      this.toastr.error("File type should be png file only");
      return;
    }

    this.fileup = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.farmerphotoview = reader.result;
    };
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
      if (this.formContent.value.datafor != 1 &&  this.fileup.name!='') {
          console.log(this.filetypepresent);
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
        this.toastr.warning("Please choose photo!");
        return;
      }
      this.WebService.addVisionMission(this.formContent.value, this.fileup).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Vision mission added successfully!");
          this.router.navigate(['/admin', 'visiomission-list']);
        }
      });
    }

    if (this.formContent.value.datafor == 1) {
      this.WebService.updateVisionMission(this.formContent.value, this.fileup).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Vision mission updated successfully!");
          this.router.navigate(['/admin', 'visiomission-list']);
        }
        else {
          this.toastr.success(res['message']);
          this.router.navigate(['/admin', 'visiomission-list']);
        }
      });
    }
  }
}
