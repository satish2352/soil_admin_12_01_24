import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
})
export class VideolistComponent implements OnInit {
  p: number = 1;
  alllist: any = [];
  editid: any;
  searchText: string = '';
  filteredList: any[] = [];

  constructor(public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.webService.webVideoList().subscribe(datalist => {
      if (datalist['result'] == true) {
        this.alllist = datalist['data'];
        this.alllist.sort((a, b) => b.id - a.id);
        this.filteredList = this.alllist; // Initialize filteredList
      }
      this.ngxService.stop();
    });
  }

  applySearchFilter(): void {
    if (!this.searchText.trim()) {
      this.filteredList = this.alllist;
    } else {
      this.filteredList = this.alllist.filter(item =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.language.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.url.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.created_at.includes(this.searchText)
      );
    }
  }

  deleteItem(id) {
    var obj = {
      id: id
    };
    this.ngxService.start();
    this.webService.webVideoDelete(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("Video deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'webvideo-list'] });
      }
      if (res['error'] == true) {
        this.toastr.error("Something went wrong " + res['message']);
      }
      this.ngxService.stop();
    });
  }

  getForEdit(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'webvideo-edit', this.editid]);
  }
}
