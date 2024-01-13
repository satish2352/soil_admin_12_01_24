import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-coverphotolist',
  templateUrl: './coverphotolist.component.html',
  styleUrls: ['./coverphotolist.component.css']
})
export class CoverphotolistComponent implements OnInit {
  p: number = 1;
  alllist: any = [];
  editid: any;
  constructor(public webService: WebService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCoverPhotoList();
  }

  getCoverPhotoList() {
    this.webService.getCoverPhotoList().subscribe(datalist => {
      this.alllist = datalist['data'];
      this.alllist.sort((a, b) => b.id - a.id);
    });
  }

  deleteCompanyProfile(id) {
    var obj = {
      id: id
    };

    this.webService.deleteCoverPhoto(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("Cover photo deleted successfully!");
        this.getCoverPhotoList();
      }
    });
  }

  getForEdit(event) {
    this.editid = event
    this.router.navigate(['/admin', 'coverphoto-edit', this.editid]);
  }
}

