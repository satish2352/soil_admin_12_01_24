import { Component, OnInit } from '@angular/core';
import { WebService } from "../../../web.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-articlelist',
  templateUrl: './articlelist.component.html',
  styleUrls: ['./articlelist.component.css']
})
export class ArticlelistComponent implements OnInit {
  p: number = 1;
  alllist: any[] = [];
  editid: any;
  searchText: string = '';

  constructor(
    public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.webService.webBlogArticleList().subscribe(datalist => {
      if (datalist['result'] === true) {
        this.alllist = datalist['data'];
        this.alllist.sort((a, b) => b.id - a.id);
      }
      this.ngxService.stop();
    });
  }

  deleteItem(id: number) {
    const obj = { id: id };
    this.ngxService.start();
    this.webService.webBlogArticleDelete(obj).subscribe(res => {
      if (res['result'] === true) {
        this.toastr.success("Blog article deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'blogarticle-list'] });
      } else if (res['error'] === true) {
        this.toastr.error("Something went wrong " + res['message']);
      }
      this.ngxService.stop();
    });
  }

  getForEdit(event: number) {
    this.editid = event;
    this.router.navigate(['/admin', 'blogarticle-edit', this.editid]);
  }

  applySearchFilter() {
    if (!this.searchText.trim()) {
      return this.alllist;
    }
    return this.alllist.filter(item =>
      item.content.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.language.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get filteredList() {
    return this.applySearchFilter();
  }
}
