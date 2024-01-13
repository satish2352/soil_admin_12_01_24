import { Component, OnInit } from '@angular/core';
import { MobileappService } from "../../mobileapp.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-listaddress',
  templateUrl: './listaddress.component.html',
  styleUrls: ['./listaddress.component.css']
})
export class ListaddressComponent implements OnInit {

  p: number = 1;
  alllist: any = [];
  editid: any;
  constructor(public MobileappService: MobileappService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    var obj={ id:1  };
    this.MobileappService.MobileAddressList(obj).subscribe(datalist => {
      if (datalist['result'] == true) {
        this.alllist = datalist['data'];
      }
    });
    this.ngxService.stop();
  }


  getForEdit(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'mobileapp-adress-add', this.editid]);
  }
}


