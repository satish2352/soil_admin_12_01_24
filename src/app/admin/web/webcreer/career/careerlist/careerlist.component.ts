import { Component, OnInit } from '@angular/core';
import { WebService } from "../../../web.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-careerlist',
  templateUrl: './careerlist.component.html',
  styleUrls: ['./careerlist.component.css']
})
export class CareerlistComponent implements OnInit {
  p: number = 1;
  alllist: any = [];
  editid: any;
  constructor(public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.webService.webCareerList().subscribe(datalist => {
      if (datalist['result'] == true) {
        this.alllist = datalist['data'];
      }
    });
    this.ngxService.stop();
  }


  // deleteItem(id) {
  //   var obj = {
  //     id: id
  //   };
  //   this.ngxService.start();
  //   this.webService.webVideoDelete(obj).subscribe(res => {
  //     if (res['result'] == true) {
  //       this.toastr.success("Video deleted successfully!");
  //       this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'webvideo-list'] });
  //     }
  //     if (res['error'] == true) {
  //       this.toastr.error("Something went wrong " + res['message']);
  //     }
  //   });
  //   this.ngxService.stop();
  // }

  getForEdit(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'webcareername-edit', this.editid]);
  }
}

