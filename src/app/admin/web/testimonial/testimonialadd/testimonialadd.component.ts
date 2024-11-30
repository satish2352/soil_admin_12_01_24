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
import { HelperService } from '../../../../helper.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as M from 'materialize-css/dist/js/materialize';
declare var $: any;
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-testimonialadd',
  templateUrl: './testimonialadd.component.html',
  styleUrls: ['./testimonialadd.component.css'],
})
export class TestimonialaddComponent implements OnInit {
  submitted: boolean = false;
  formContent: FormGroup;
  allstate: any;
  editdata: any;
  photoview: any = 'assets/img/placeholder-image.png';
  showphoto: any;
  fileupone: File = null;
  fileuptwo: File = null;
  languageall: any;
  languageedit: any;
  filesizeone: any;
  filetypeone: any;
  filetypepresent: boolean = false;
  filetypes: Array<string> = [
    'image/png',
    'image/PNG',
    'image/JPG',
    'image/jpg',
    'image/JPEG',
    'image/jpg',
  ];
  constructor(
    public WebService: WebService,
    public http: HttpClient,
    private fb: FormBuilder,
    public router: Router,
    private location: Location,
    private toastr: ToastrService,
    private helperService: HelperService,
    private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.languageall = this.helperService.getLanguageList();
    setTimeout(() => {
      let elems = document.querySelectorAll('select');
      let instances = M.FormSelect.init(elems);
    }, 1000);
    this.formContent = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [
        Validators.required,
        this.contentLengthValidator(100),
      ]),
      language: new FormControl('', [Validators.required]),
      photo_one: new FormControl(''),
      datafor: new FormControl(0),
      id: new FormControl(0),
    });

    this.route.params.subscribe((params: Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    });

    if (this.editdata) {
      // this.formContent.removeControl('photo_one');
      var obj = { id: this.editdata };
      this.ngxService.start();
      this.WebService.webTestimonialsEdit(obj).subscribe((res) => {
        if (res['result'] == true) {
          this.languageedit = res['data'][0].language;
          this.photoview = res['data'][0].photopath;
          this.showphoto = true;
          this.formContent.patchValue({
            title: res['data'][0].title,
            content: res['data'][0].content,
            language: res['data'][0].language,
            datafor: 1,
            id: res['data'][0].id,
          });
          setTimeout(() => {
            M.updateTextFields();
          }, 1000);
          setTimeout(() => {
            let elems = document.querySelectorAll('select');
            let instances = M.FormSelect.init(elems);
          }, 1000);
        }
        if (res['error'] == true) {
          this.toastr.error('Something went wrong ' + res['message']);
          this.router.navigate(['/admin', 'testimonials-list']);
        }
      });
      this.ngxService.stop();
    }
  }

  contentLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      return value.length >= minLength
        ? { minLength: { value: control.value } }
        : null;
    };
  }

  // onFileSelect(event) {

  //   this.fileupone = event.target.files[0];
  //   console.log("this.fileupone = " + this.fileupone);

  //   var reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = (event) => {
  //     this.photoview = reader.result;
  //   };

  //   this.filesizeone = this.fileupone.size;
  //   this.filetypeone = this.fileupone.type;

  //   if (this.filesizeone > 1000000) {
  //     this.toastr.error("File Size Should be less than 1 MB");
  //   }

  //   this.filetypes.forEach(element => {
  //     if (element == this.filetypeone) {
  //       this.filetypepresent = true;
  //     }

  //   });
  //   if (this.filetypepresent != true) {
  //     this.toastr.error("File type should be png");
  //     return;
  //   }
  // }

  onFileSelect(event) {
    this.fileupone = event.target.files[0];
    var reader = new FileReader();

    reader.readAsDataURL(this.fileupone);
    reader.onload = (event) => {
      // Display image preview
      // this.farmerphotoview = reader.result;

      // Create an Image object
      let img = new Image();
      img.onload = () => {
        // Check image dimensions
        if (img.width >= 140 || img.height >= 175) {
          this.toastr.error(
            'Image dimensions should be 175x140 pixels  or less than this value'
          );
          this.fileupone = null; // Clear the file input
          // this.farmerphotoview = 'assets/img/placeholder-image.png'; // Reset image preview
          return;
        }

        // If dimensions are correct, continue with file validation
        this.filesizeone = this.fileupone.size;
        this.filetypeone = this.fileupone.type;

        if (this.filesizeone > 1000000) {
          this.toastr.error('File Size Should be less than 1 MB');
          return;
        }

        // if (!this.filetypes.includes(this.filetypeone)) {
        //   this.toastr.error('File type should be png');
        //   this.fileupone = null; // Clear the file input
        //   // this.farmerphotoview = 'assets/img/placeholder-image.png'; // Reset image preview
        //   return;
        // }

        this.filetypes.forEach((element) => {
          if (element == this.filetypeone) {
            this.filetypepresent = true;
          }
        });
        if(!this.editdata) {
          if (this.filetypepresent != true) {
            this.toastr.error('File type should be png');
            return;
          }
        };
      }
      img.src = reader.result as string;
    };
  }

  get f() {
    return this.formContent.controls;
  }

  onSubmit() {
    if(!this.editdata) {
      if (this.filesizeone > 1000000) {
        this.toastr.error('File Size Should be less than 1 MB');
        return;
      }

      this.filetypes.forEach((element) => {
        if (element == this.filetypeone) {
          this.filetypepresent = true;
        }
      });
    
      if (this.filetypepresent != true) {
        this.toastr.error('File type should be png');
        return;
      }
    } 
    

    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.warning('Form Invalid Something Missing /Invalid');
      return;
    }

    if (this.formContent.value.datafor == 0) {
      if (!this.fileupone) {
        this.toastr.warning('Please choose testimonial photo!');
        return;
      }
      this.ngxService.start();
      this.WebService.webTestimonialsAdd(
        this.formContent.value,
        this.fileupone
      ).subscribe((res) => {
        if (res['result'] == true) {
          this.toastr.success('Testimonial added successfully!');
          this.router.navigate(['/admin', 'testimonials-list']);
        } else {
          this.toastr.error(res['message']);
          this.router.navigate(['/admin', 'testimonials-list']);
        }
      });
      this.ngxService.stop();
    }

    if (this.formContent.value.datafor == 1) {
      this.ngxService.start();
      this.WebService.webTestimonialsUpdate(
        this.formContent.value,
        this.fileupone
      ).subscribe((res) => {
        if (res['result'] == true) {
          this.toastr.success('Testimonial updated successfully!');
          this.router.navigate(['/admin', 'testimonials-list']);
        } else {
          this.toastr.error('No Information Edited/Updated');
          this.router.navigate(['/admin', 'testimonials-list']);
        }
      });
      this.ngxService.stop();
    }
  }
}
