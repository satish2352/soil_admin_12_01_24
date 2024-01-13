import { Component, OnInit } from '@angular/core';
import { HelperService } from "../../helper.service";
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  submitted: boolean = false;
  adminLoginForm: FormGroup;
  apidata:any;
  constructor(private router: Router,public helperService: HelperService,public http: HttpClient,private fb: FormBuilder) { }

  ngOnInit(): void {

    this.adminLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),

    });
  }

  get f() { return this.adminLoginForm.controls;}

  onSubmit() {
    this.submitted = true;
    if (this.adminLoginForm.invalid) {
       console.log('Form Invalid');
      return;
    }

    // console.log(this.adminLoginForm.value);
    this.helperService.adminLogin(this.adminLoginForm.value).subscribe(res=>{

      if (res['token']) {
        localStorage.setItem('token',res['token']);
        this.router.navigate(['/admin','farmer-list']);
      }
    });


  //   this.http.post('http://sumagotest.in/soilfinal/api/auth/login',this.adminLoginForm.value).subscribe(res=>{
  //    if (res['access_token']== 'bearer') {
  //      alert("login");
  //      this.router.navigate(['/farmer-list']);
  //    }
  //  });


    this.adminLoginForm.reset({
      email: '',
      password: '',
    });
    this.submitted = false;
  }


}
