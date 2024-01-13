import { Component, OnInit } from '@angular/core'
import { WebService } from '../../web.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-visionmissionlist',
  templateUrl: './visionmissionlist.component.html',
  styleUrls: ['./visionmissionlist.component.css'],
})
export class VisionmissionlistComponent implements OnInit {
  p: number = 1
  alllist: any
  editdata: any
  constructor(
    public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.webService.getVisionMissionList().subscribe((datalist) => {
      this.alllist = datalist['data']
    })
  }

  deleteCompanyProfile(id) {
    if (confirm('Are you sure to delete ')) {
      var obj = {
        id: id,
      }
      this.webService.deleteVisionMission(obj).subscribe((res) => {
        if (res['result'] == true) {
          this.toastr.success('Record deleted successfully!')
          this.router.navigate(['/admin', 'redirectself'], {
            state: ['/admin', 'visiomission-list'],
          })
        }
      })
    }
  }

  getForEdit(event) {
    this.editdata = event
    this.router.navigate(['/admin', 'visiomission-edit', this.editdata])
  }
}
