import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-aboutuslist',
  templateUrl: './aboutuslist.component.html',
  styleUrls: ['./aboutuslist.component.css']
})
export class AboutuslistComponent implements OnInit {
  p: number = 1;
  alllist: any;
  editid: any;
  constructor(public webService: WebService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.webService.getAboutUsList().subscribe(datalist => {
      this.alllist = datalist['data'];
      this.alllist.sort((a, b) => b.id - a.id);
    });

  }


  deleteCompanyProfile(id) {
    var obj = {
      id: id
    };

    this.webService.deleteAboutUs(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("About us deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'aboutus-list'] });
      }
    });
  }

  getForEdit(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'aboutus-edit', this.editid]);
  }


}
