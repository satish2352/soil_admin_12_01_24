import { Component, OnInit } from '@angular/core';
import { MobileappService } from "./../mobileapp.service";
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Params, Router } from '@angular/router';
declare var $: any;
import * as M from "materialize-css/dist/js/materialize";
@Component({
  selector: 'app-messageviewperticular',
  templateUrl: './messageviewperticular.component.html',
  styleUrls: ['./messageviewperticular.component.css']
})

export class MessageviewperticularComponent implements OnInit {

  submitted: boolean = false;
  editdata: any;
  statelist: any;
  dummy: any;
  alllist: any;
  listdata: any;
  formContent: FormGroup;
  resNew:any

  constructor(
    public http: HttpClient,
    private fb: FormBuilder,
    public mobileappService: MobileappService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formContent = new FormGroup({
      id: new FormControl(''),
      date: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
      message_by: new FormControl('', Validators.required),
      msg_status: new FormControl('', Validators.required),
      msg: new FormControl('', Validators.required),
      msg_read: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((params: Params) => {
      this.editdata = +this.route.snapshot.params['id'];
    });
    if (this.editdata) {
      var obj = { messageid: this.editdata };
      this.ngxService.start();
      this.mobileappService.GetMessege(obj).subscribe(res => {
        this.resNew = res['data']
        if (res) {
          this.formContent.patchValue({
            date: this.resNew.date,
            subject: this.resNew.subject,
            message: this.resNew.message,
            message_by: this.resNew.fname+" "+this.resNew.mname+" "+this.resNew.lname,
            msg_status: this.resNew.msg_status,
            msg: this.resNew.msg,
            id: this.resNew.id,
            msg_read: this.resNew.msg_read,
            document: this.resNew.document
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
          this.toastr.error("Something went wrong " + res['message']);
          this.router.navigate(['/admin', 'mobileapp-adress-list']);
        }
      });
      this.ngxService.stop();
    }
  }

  get f() { return this.formContent.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.warning("Missing some contents/Invalid");
      return;
    }

    this.mobileappService.UpdateMessege(this.formContent.value).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("Messege updated successfully!");
        this.router.navigate(['/admin', 'mobileapp-messeges-list']);
      }
    });

  }

}





