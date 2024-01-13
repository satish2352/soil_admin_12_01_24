import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-testimoniallist',
  templateUrl: './testimoniallist.component.html',
  styleUrls: ['./testimoniallist.component.css']
})
export class TestimoniallistComponent implements OnInit {
  p: number = 1;
  alllist: any = [];
  editid: any;

  constructor(public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.webService.webTestimonialsList().subscribe(datalist => {
      if (datalist['result'] == true) {
        this.alllist = datalist['data'];
        this.alllist.sort((a, b) => b.id - a.id);
      }
    });
    this.ngxService.stop();
  }


  deleteItem(id) {
    var obj = {
      id: id
    };
    this.ngxService.start();
    this.webService.webTestimonialsDelete(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("Testimonial deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'testimonials-list'] });
      }
      if (res['error'] == true) {
        this.toastr.error("Something went wrong " + res['message']);
      }
    });
    this.ngxService.stop();
  }

  getForEdit(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'testimonials-edit',this.editid]);
  }
}

