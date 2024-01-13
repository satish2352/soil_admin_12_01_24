import { Component, OnInit } from '@angular/core'
import { WebService } from '../../web.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-principlelist',
  templateUrl: './principlelist.component.html',
  styleUrls: ['./principlelist.component.css']
})
export class PrinciplelistComponent implements OnInit {

  p: number = 1
  alllist: any
  editdata: any
  constructor(
    public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.webService.getVisionMissionList().subscribe((datalist) => {
      this.alllist = datalist['data']
    })
  }


  getForEdit(event) {
    this.editdata = event
    this.router.navigate(['/admin', 'visiomission-edit', this.editdata])
  }

}
