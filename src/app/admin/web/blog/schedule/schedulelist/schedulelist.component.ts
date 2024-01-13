import { Component, OnInit } from '@angular/core';
import { WebService } from "../../../web.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-schedulelist',
  templateUrl: './schedulelist.component.html',
  styleUrls: ['./schedulelist.component.css']
})
export class SchedulelistComponent implements OnInit {
  p: number = 1;
  alllist: any;
  editid: any;
  constructor(public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.webService.webBlogScheduleList().subscribe(datalist => {
      if (datalist['result'] == true) {
        this.alllist = datalist['data'];
      }
    });
    this.ngxService.stop();
  }

  deleteItem(id) {
    var obj = {
      id: id
    };
    this.ngxService.start();
    this.webService.webBlogScheduleDelete(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("Blog schedule deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'blogschedule-list'] });
      }
      if (res['error'] == true) {
        this.toastr.error("Something went wrong " + res['message']);
      }
    });
    this.ngxService.stop();
  }

  getForEdit(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'blogschedule-edit', this.editid]);
  }
}

