import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../notification.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as M from "materialize-css/dist/js/materialize";
declare var $: any;

@Component({
  selector: 'app-send-notifications',
  templateUrl: './send-notifications.component.html',
  styleUrls: ['./send-notifications.component.css']
})
export class SendNotificationsComponent implements OnInit {
  farmers: any = [];
  fscs: any = [];
  bscs: any = [];
  dscs: any = [];
  submitted: boolean = false;
  distributors: any[] = [];
  filtered_distributors: any[] = [];
  notificationForm: FormGroup;
  sendTo: string;
  constructor(
    private ns: NotificationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notificationForm = new FormGroup({
      send_to: new FormControl('', Validators.required),
      ///distributor_id: new FormControl([], Validators.required),
      message: new FormControl('', [Validators.required])
    });
    this.getDistributors();
    this.getFarmers();
    this.formControlValueChanges();
    let elems = document.querySelectorAll('select');
    let instances = M.FormSelect.init(elems);
  }

  get f() { return this.notificationForm.controls; }

  formControlValueChanges() {
    this.notificationForm.get('send_to').valueChanges.subscribe(val => {
      this.sendTo = val;
      this.notificationForm.get('distributor_id').setValue([]);
      if (val != 'farmer') {
        this.filtered_distributors = this.distributors.filter(e=>e.user_type == val);        
      }
      setTimeout(()=>{
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      },2000);
      
      // $('select').formSelect();
    });
  }

  getFarmers() {
    this.ns.getFarmers().subscribe(res => {
      if (res['result']) {
        this.farmers = res['data'];
      }
    });
  }

  getDistributors() {
    this.ns.getDistributors().subscribe(res => {
      if (res['result']) {
        this.distributors = res['data'];
        // this.fscs = res['data'];
        // this.bscs = res['data'];
        // this.dscs = res['data'];
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.notificationForm.invalid) {
      return;
    }
    // console.log(this.orderForm.value);
    this.ns.sendNotification(this.notificationForm.value).subscribe(res => {
      if (res['result']) {
        this.toastr.success('Notifications sent successfully!');
        this.submitted = false;
        this.router.navigate(['/admin', 'notifications']);
      } else {
        this.toastr.error(res['message']);
      }
    });
  }
}
