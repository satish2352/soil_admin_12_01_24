import { Component, OnInit } from '@angular/core';
import { MobileappService } from '../../mobileapp.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-listcrop',
  templateUrl: './listcrop.component.html',
  styleUrls: ['./listcrop.component.css']
})
export class ListcropComponent implements OnInit {

  p: number = 1;
  alllist: any;
  editid: any;
  constructor(public MobileappService: MobileappService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.MobileappService.getMobileAppCropList().subscribe(datalist => {
      this.alllist = datalist['data'];
    });

  }

  deleteCompanyProfile(id) {
    var obj = {
      id: id
    };

    this.MobileappService.getMobileAppCropDelete(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("Crop deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'mobileapp-crop-list'] });
      }
    });
  }

  getForEdit(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'mobileapp-crop-edit', this.editid]);
  }

}
