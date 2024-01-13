import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-gallaryphotolist',
  templateUrl: './gallaryphotolist.component.html',
  styleUrls: ['./gallaryphotolist.component.css']
})
export class GallaryphotolistComponent implements OnInit {
  p: number = 1;
  alllist: any;
  id: any;
  constructor(public webService: WebService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.webService.getGallaryPhotoList().subscribe(datalist => {
      this.alllist = datalist['data'];
      this.alllist.sort((a, b) => b.id - a.id);
    });
  }


  deleteCompanyProfile(id) {
    var obj = {
      id: id
    };

    this.webService.deleteGallaryPhoto(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("Gallary photo deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'gallaryphoto-list'] });
      }
    });
  }

  getForEdit(event) {
    this.id = event;
    this.router.navigate(['/admin', 'gallaryphoto-edit', this.id]);
  }
}

