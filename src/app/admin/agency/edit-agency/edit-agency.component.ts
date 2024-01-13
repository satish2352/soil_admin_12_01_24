import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgencyService } from '../agency.service';

@Component({
  selector: 'app-edit-agency',
  templateUrl: './edit-agency.component.html',
  styleUrls: ['./edit-agency.component.css']
})
export class EditAgencyComponent implements OnInit {

  agencyForm: FormGroup;
  distributors: any[] = [];
  fileup: File;
  filepreview: any;
  filesize: any;
  filetype: any;
  filetypepresent: boolean = false;
  filetypes: Array<string> = ['image/png', 'image/PNG'];
  constructor(
    private route: ActivatedRoute,
    private as: AgencyService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.agencyForm = new FormGroup({
      id: new FormControl(''),
      agency_name: new FormControl('', Validators.required),
      lat: new FormControl('', Validators.required),
      lon: new FormControl('', Validators.required),
      agency_under_distributor_id: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      photo_one: new FormControl('')
    });
    this.getDistributors();
    this.getAgency();
  }

  getDistributors() {
    this.as.getDistributors().subscribe(res => {
      if (res['result']) {
        this.distributors = res['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
      }
    });
  }

  getAgency() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.as.getAgency(id).subscribe(res => {
      if (res['result']) {
        this.agencyForm.patchValue(res['data'][0]);
        this.filepreview = res['data'][0]['photopath'];
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
      this.toastr.error("File type should be png/jpg/jpeg/bmp");
      return;
    }

    if (this.agencyForm.invalid) {
      return;
    }
    this.as.updateAgency(this.agencyForm.value, this.fileup).subscribe(res => {
      if (res['result']) {
        this.toastr.success('Agency updated successfully');
        this.router.navigate(['/admin', 'agency-list']);
      } else {
        this.toastr.error(res['message']);
      }
    });
  }

  onFileSelect(event) {
    this.fileup = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.filepreview = reader.result;
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

}
