import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web/web.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare let $: any;
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  p: number = 1;
  alllist: any = [];
  editid: any;
  constructor(public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.getProducts();

    

  // $(document).ready(function () {
  //     setTimeout(() => {
  //       let table = $('#pagedatatable').DataTable({
  //         ordering: true,
  //         lengthChange: false,
  //         pageLength: 5,
  //         showNEntries: false,

  //       //   dom: 'Bfrtip',
  //       // buttons: [
  //       //   //'copy', 'csv', 'excel', 'pdf', 'print'
  //       //   'excel', 'pdf'
  //       // ]

          
  //       })
  //     }, 4000)
  //   })

  }

  getProducts() {
    this.ngxService.start();
    this.webService.webProductList().subscribe(datalist => {
      if (datalist['result'] == true) {
        this.alllist = datalist['data'];
        this.alllist.sort((a,b)=>b.id - a.id)
      }
      if (datalist['error'] == true) {
        this.toastr.error("Something went wrong " + datalist['message']);
      }
    });
    this.ngxService.stop();
  }


  deleteItem(id) {
    if(confirm("Are you sure want to delete")) {
    var obj = {
      id: id
    };
    this.ngxService.start();
    this.webService.webProductDelete(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("Product deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'product-list'] });
      }
      if (res['error'] == true) {
        this.toastr.error("Something went wrong " + res['message']);
      }
    });
    this.ngxService.stop();
  }
}

  getForEdit(event) {
    // this.editid = event;
    // this.router.navigate(['/admin', 'product-edit', this.editid]);
    var obj = {
      id: event
    };

    this.webService.webProductEdit(obj).subscribe(res=>{
      if (res['result']== true) {
        this.router.navigate(['/admin','product-add'], { state: res['data'] });
      }
     });
  }
}

