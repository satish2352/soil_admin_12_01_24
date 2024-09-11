import { Component, OnInit } from '@angular/core';
import { WebService } from '../../web.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as M from 'materialize-css/dist/js/materialize';
declare var $: any;

@Component({
  selector: 'app-coverphotoadd',
  templateUrl: './coverphotoadd.component.html',
  styleUrls: ['./coverphotoadd.component.css'],
})
export class CoverphotoaddComponent implements OnInit {
  submitted: boolean = false;
  formContent: FormGroup;
  allstate: any;
  farmerphotoview: any = 'assets/img/placeholder-image.png';
  showphoto: any;
  fileup: File = null;
  editId: number;
  filesize: any;
  filetype: any;
  filetypepresent: boolean = false;
  filetypes: Array<string> = ['image/png', 'image/PNG'];

  constructor(
    public WebService: WebService,
    public http: HttpClient,
    private fb: FormBuilder,
    public router: Router,
    private location: Location,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.formContent = new FormGroup({
      title: new FormControl('coverphoto', [Validators.required]),
      content: new FormControl('coverphoto', [Validators.required]),
      datafor: new FormControl('0'),
      id: new FormControl('0'),
    });

    this.route.params.subscribe((params: Params) => {
      this.editId = +this.route.snapshot.params['id'];
    });
    if (this.editId) {
      var obj = { id: this.editId };
      this.WebService.getCoverPhotoEdit(obj).subscribe((res) => {
        if (res['result'] == true) {
          this.farmerphotoview = res['data'][0].photopath;
          this.showphoto = true;
          this.formContent.patchValue({
            title: res['data'][0].title,
            content: res['data'][0].content,
            datafor: 1,
            id: res['data'][0].id,
          });
          setTimeout(() => {
            M.updateTextFields();
          }, 1000);
        }
      });
    }
  }

  // onFileSelect(event) {

  //   this.fileup = event.target.files[0];
  //   var reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = (event) => {
  //     this.farmerphotoview = reader.result;
  //   };
  //   this.filesize = this.fileup.size;
  //   this.filetype = this.fileup.type;

  //   if (this.filesize > 5000000) {
  //     this.toastr.error("File Size Should be less than 5 MB");
  //   }

  //   this.filetypes.forEach(element => {
  //     if (element == this.filetype) {
  //       this.filetypepresent = true;
  //     }

  //   });
  //   if (this.filetypepresent != true) {
  //     this.toastr.error("File type should be png");
  //     return;
  //   }
  // }

  onFileSelect(event) {
    this.fileup = event.target.files[0];
    var reader = new FileReader();

    reader.readAsDataURL(this.fileup);
    reader.onload = (event) => {
      // Display image preview
      this.farmerphotoview = reader.result;

      // Create an Image object
      let img = new Image();
      img.onload = () => {
        // Check image dimensions
        if (img.width >= 800 || img.height >= 682) {
          this.toastr.error('Image dimensions should be 800x682 pixels  or less than this value');
          this.fileup = null; // Clear the file input
          this.farmerphotoview = 'assets/img/placeholder-image.png'; // Reset image preview
          return;
        }

        // If dimensions are correct, continue with file validation
        this.filesize = this.fileup.size;
        this.filetype = this.fileup.type;

        if (this.filesize > 5000000) {
          this.toastr.error('File Size Should be less than 5 MB');
          return;
        }

        if (!this.filetypes.includes(this.filetype)) {
          this.toastr.error('File type should be png');
          this.fileup = null; // Clear the file input
          this.farmerphotoview = 'assets/img/placeholder-image.png'; // Reset image preview
          return;
        }
      };
      img.src = reader.result as string;
    };
  }

  get f() {
    return this.formContent.controls;
  }

  onSubmit() {
    if (this.filesize > 5500000) {
      this.toastr.error('File Size Should be less than 5 MB');
      return;
    }

    this.filetypes.forEach((element) => {
      if (element == this.filetype) {
        this.filetypepresent = true;
      }
    });
    if (this.filetypepresent != true) {
      this.toastr.error('File type should be png');
      return;
    }

    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.error('Form Invalid Something Missing /Invalid');
      return;
    }

    if (this.formContent.value.datafor == 0) {
      if (!this.fileup) {
        this.toastr.warning('Please choose cover photo!');
        return;
      }
      this.WebService.addCoverPhoto(
        this.formContent.value,
        this.fileup
      ).subscribe((res) => {
        if (res['result'] == true) {
          this.toastr.success('Cover photo added successfully!');
          this.router.navigate(['/admin', 'coverphoto-list']);
        }
      });
    }
    if (this.formContent.value.datafor == 1) {
      this.WebService.updateCoverPhoto(
        this.formContent.value,
        this.fileup
      ).subscribe((res) => {
        if (res['result'] == true) {
          this.toastr.success('Cover photo updated successfully!');
          this.router.navigate(['/admin', 'coverphoto-list']);
        } else {
          this.toastr.success(res['message']);
          this.router.navigate(['/admin', 'coverphoto-list']);
        }
      });
    }
  }
}
