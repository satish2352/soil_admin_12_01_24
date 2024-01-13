import { Component, OnInit } from '@angular/core'
import { WebService } from '../../web.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-productinfolist',
  templateUrl: './productinfolist.component.html',
  styleUrls: ['./productinfolist.component.css'],
})
export class ProductinfolistComponent implements OnInit {
  p: number = 1
  alllist: any
  editid: any
  constructor(
    public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}


  ngOnInit(): void {
    this.webService.webProductInfoList().subscribe((datalist) => {
      this.alllist = datalist['data']
      this.alllist.sort((a,b)=>b.id - a.id)
    })
  }

  sanitizeHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  deleteCompanyProfile(id) {
    if (confirm('Are you sure to delete ')) {
      var obj = {
        id: id,
      }

      this.webService.webProductInfoDelete(obj).subscribe((res) => {
        if (res['result'] == true) {
          this.toastr.success('Product us deleted successfully!')
          this.router.navigate(['/admin', 'redirectself'], {
            state: ['/admin', 'webproductinfo-list'],
          })
        }
      })
    }
  }

  getForEdit(event) {
    this.editid = event
    this.router.navigate(['/admin', 'webproductinfo-edit', this.editid])
  }
}
