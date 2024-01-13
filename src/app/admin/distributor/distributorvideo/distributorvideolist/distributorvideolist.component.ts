import { Component, OnInit } from '@angular/core';
import {DistributorvideoService} from "../distributorvideo.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { from } from 'rxjs';
declare let $: any;
@Component({
  selector: 'app-distributorvideolist',
  templateUrl: './distributorvideolist.component.html',
  styleUrls: ['./distributorvideolist.component.css']
})
export class DistributorvideolistComponent implements OnInit{

  p: number = 1;
  alllist: any = [];
  editid: any;
  constructor(public DistributorvideoService:DistributorvideoService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.DistributorvideoService.DistributorVideoList().subscribe(datalist => {
      if (datalist['result'] == true) {
        this.alllist = datalist['data'];
        this.alllist.sort((a,b)=>b.id-a.id)
      }
    });
    this.ngxService.stop();

    
  //   $(document).ready(function () {
  //     setTimeout(() => {
  //       let table = $('#pagedatatable').DataTable({
  //         ordering: true,
  //         lengthChange: false,
  //         showNEntries: false,
  //       })
  //     }, 4000)
  //   })
  // }
  }

  deleteItem(id) {
    var obj = {
      id: id
    };
    this.ngxService.start();
    this.DistributorvideoService.DistributorVideoDelete(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("Video deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'distributorvideoall-list'] });
      }
      if (res['error'] == true) {
        this.toastr.error("Something went wrong " + res['message']);
      }
    });
    this.ngxService.stop();
  }

  getForEdit(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'distributorvideoadd-edit', this.editid]);
  }
}

