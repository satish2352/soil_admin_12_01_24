
import { Component, OnInit } from '@angular/core';
import { BannerbrService } from "../bannerbr.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-bannerbrlist',
  templateUrl: './bannerbrlist.component.html',
  styleUrls: ['./bannerbrlist.component.css']
})
export class BannerbrlistComponent implements OnInit {

  p: number = 1;
  alllist: any = [];
  editid: any;

  constructor(public BannerbrService: BannerbrService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.BannerbrService.webbrochurelist().subscribe(datalist => {
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
    this.BannerbrService.webbrochuredelete(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("Deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'bannerbr-list'] });
      }
      if (res['error'] == true) {
        this.toastr.error("Something went wrong " + res['message']);
      }
    });
    this.ngxService.stop();
  }

  getForEdit(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'bannerbr-edit',this.editid]);
  }
}


