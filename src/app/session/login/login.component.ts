import { Component, OnInit } from '@angular/core';
import { HelperService } from "../../helper.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  adminLoginForm: FormGroup;
  apidata: any;
  constructor(private router: Router, public helperService: HelperService,
    public http: HttpClient, private fb: FormBuilder,
    private permissionsService: NgxPermissionsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.adminLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),

    });
  }

  get f() { return this.adminLoginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.adminLoginForm.invalid) {
      // this.toastr.error("Some Contents Missing/Invalid");
      return;
    }

    // console.log(this.adminLoginForm.value);
    this.helperService.adminLogin(this.adminLoginForm.value).subscribe(res => {
      if (res['status']) {
        this.toastr.success("Logged in successfully!");
        localStorage.setItem('token', res['token']);
        localStorage.setItem('userrole', res['data']['user_type']);
        localStorage.setItem('user', JSON.stringify(res['data']));
        this.permissionsService.loadPermissions([res['data']['user_type']])
        this.router.navigate(['/admin', 'dashboard']);
      }
      else {
        this.toastr.error("Invalid credentials!");
      }
      this.adminLoginForm.reset({
        email: '',
        password: '',
      });
      this.submitted = false;
    });
  }


}

