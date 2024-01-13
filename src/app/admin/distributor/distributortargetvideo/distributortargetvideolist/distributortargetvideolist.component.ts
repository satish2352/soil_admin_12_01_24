import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../../distributor.service";
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-distributortargetvideolist',
  templateUrl: './distributortargetvideolist.component.html',
  styleUrls: ['./distributortargetvideolist.component.css']
})
export class DistributortargetvideolistComponent implements OnInit {
  p:number=1;
  alllist: any;
  ngxService: any;
  toastr: any;
  constructor(public distributorService: DistributorService, public router: Router) { }

  ngOnInit() {
    this.distributorService.getDistributorVideoList().subscribe(list => {
      this.alllist = list['data'];
    });

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

  // delete(id) {
  //   var obj = {
  //     video_id: id
  //   };

  //   this.distributorService.deleteDistirbutorVideoById(id).subscribe(res => {
  //     if (res['result'] == true) {
  //       location.reload();
  //       // this.router.navigate(['/admin', 'distributorvideo-list']);
  //     }
  //   });
  // }
  deleteItem(event) {
    var obj = {
      video_id: event
        };
    
    let ans = window.confirm('Do you really want to delete this target  video?');
    if (ans) {
      this.distributorService.deleteDistirbutorVideoById(obj).subscribe(res => {
        if (res['result'] == true) {
          alert(`data deleted`);
          location.reload();
         
        } else {
          alert(`data not deleted`);
          // Your code for the default else part goes here
          // For example, you can add a function call or other logic
          // this.handleDeleteError();
        }
      });
    }
  }



  // deleteItem(id) {
  //   var obj = {
  //     id: id
  //   };
  //   // this.ngxService.start();
  //   this.distributorService.deleteDistirbutorVideoById(obj).subscribe(res => {
  //     if (res['result'] == true) {
  //       this.toastr.success("Video deleted successfully!");
  //       this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'distributorvideoall-list'] });
  //     }
  //     if (res['error'] == true) {
  //       this.toastr.error("Something went wrong " + res['message']);
  //     }
  //   });
  //   // this.ngxService.stop();
  // }


  getForEdit(event) {
    var obj = {
      video_id: event
    };
    this.distributorService.getByDistirbutorVideoIdForEdit(obj).subscribe(res => {
      if (res['result'] == true) {
        this.router.navigate(['/admin', 'distributorvideo-add'],{state: res['data']});
      }
    });
  }


}
