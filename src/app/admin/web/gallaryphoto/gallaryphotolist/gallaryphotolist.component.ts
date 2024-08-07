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
  alllist: any[] = [];
  filteredList: any[] = [];
  searchText: string = '';

  constructor(
    public webService: WebService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.webService.getGallaryPhotoList().subscribe(datalist => {
      this.alllist = datalist['data'];
      this.filteredList = this.alllist; // Initialize the filteredList
      this.alllist.sort((a, b) => b.id - a.id);
    });
  }

  applySearchFilter(): void {
    if (!this.searchText.trim()) {
      this.filteredList = this.alllist;
    } else {
      this.filteredList = this.alllist.filter(item =>
        item.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.content.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  deleteCompanyProfile(id: number): void {
    var obj = { id: id };

    this.webService.deleteGallaryPhoto(obj).subscribe(res => {
      if (res['result'] === true) {
        this.toastr.success("Gallery photo deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'gallaryphoto-list'] });
      }
    });
  }

  getForEdit(event: number): void {
    this.router.navigate(['/admin', 'gallaryphoto-edit', event]);
  }
}
