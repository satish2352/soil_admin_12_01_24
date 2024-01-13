import { Component, OnInit } from '@angular/core'
import { WebService } from '../../web.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-companyprofilelist',
  templateUrl: './companyprofilelist.component.html',
  styleUrls: ['./companyprofilelist.component.css'],
})
export class CompanyprofilelistComponent implements OnInit {
  p: number = 1
  alllist: any
  editid: any
  constructor(
    public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    // $('#pageDataTable').DataTable();
    // console.log(localStorage.getItem('token'));

    this.webService.getCompanyGetList().subscribe((datalist) => {
      this.alllist = datalist['data']
      this.alllist.sort((a, b) => b.id - a.id);
    })
  }

  deleteCompanyProfile(id) {
    if (confirm('Are you sure to delete ')) {
      var obj = {
        id: id,
      }

      this.webService.deleteCompanyProfile(obj).subscribe((res) => {
        if (res['result'] == true) {
          this.toastr.success('Company profile deleted successfully!')
          this.router.navigate(['/admin', 'redirectself'], {
            state: ['/admin', 'companyprofile-list'],
          })
        }
      })
    }
  }

  getForEdit(event) {
    this.editid = event
    this.router.navigate(['/admin', 'companyprofile-edit', this.editid])
  }

  // getForEdit(event) {
  //   var obj = {
  //     id: event
  //   };
  //   this.webService.getCompanyProfileForEdit(obj).subscribe(res => {
  //     if (res['result'] == true) {
  //       this.router.navigate(['/admin', 'companyprofile-add',this.id], { state: res['data'] });
  //     }
  //   });
  // }
}
