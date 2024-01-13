import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AgencyService } from '../agency.service';
declare let $: any;
@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.css']
})
export class AgencyListComponent implements OnInit {

  p: number = 1;
  allagencylist:any = [];

  constructor(
    private as: AgencyService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAgencyList();

    // $(document).ready(function () {
    //   setTimeout(() => {
    //     let table = $('#pagedatatable').DataTable({
    //       ordering: true,
    //       lengthChange: false,
    //       showNEntries: false,
    //     })
    //   }, 4000)
    // })

    
  }

  getAgencyList() {
    this.as.getAgencyList().subscribe(res=>{
      if (res['result']) {
        this.ngxService.start();
        this.allagencylist = res['data'];
        this.ngxService.stop();
      }

    });
  }


  editAgency(id) {
    this.router.navigate(['/admin', 'edit-agency', id]);
  }
  deleteagency(id) {
    let ans = window.confirm('Do you really want to delete this agency?');
    if (ans) {
      this.as.deleteAgency(id).subscribe(res => {
        if (res['result'] == true) {
          alert(`data deleted`);
          this.getAgencyList();
        } else {
          alert(`data not deleted`);
          // Your code for the default else part goes here
          // For example, you can add a function call or other logic
          this.handleDeleteError();
        }
      });
    }
  }
  
  // Add a function for the default else part
  handleDeleteError() {
    // Your code for handling the case where data is not deleted
    // For example, you can display an error message or perform other actions
    console.log("Data not deleted - handleDeleteError");
  }
  

  // deleteagency(id) {
  //   let ans = window.confirm('Do you really want to delete this agency?');
  //   if (ans) {
  //     this.as.deleteAgency(id).subscribe(res=>{
  //       if (res['data']) {
  //         this.toastr.success('Agency deleted successfully!');
  //         console.log("data deleted");
          
  //         this.getAgencyList();
  //       } else {
  //         this.toastr.error(res['message']);
  //       }
  //     });
  //   }
  // }

  
 

//   deleteAgency(id: number) {
//     const confirmation = confirm('Are you sure you want to delete this category?');
//     if (confirmation) {
//       this.as.deleteAgency(id).subscribe(
//         (res) =>
//         if (res['result']) {
//                   this.toastr.success('Agency deleted successfully!');
//                   this.getAgencyList();
//                 } else {
//                   this.toastr.error(res['message']);
//                 }
//               }
//             )}
// }
}