import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../../distributor.service";
import { Router } from '@angular/router';
declare var $: any;
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-distributortargetvideoseenbydist',
  templateUrl: './distributortargetvideoseenbydist.component.html',
  styleUrls: ['./distributortargetvideoseenbydist.component.css']
})
export class DistributortargetvideoseenbydistComponent implements OnInit {
  p: number = 1;
  alllist: any;
  ngxService: any;
  toastr: any;
  alldistributor = [];
  farmerForm: FormGroup;
  constructor(public distributorService: DistributorService, public router: Router) {

    this.farmerForm = new FormGroup({
      created_by: new FormControl('', [Validators.required]),
    });
    
   }

  ngOnInit() {

    let newval = {
      'dist_id': ''
    }
    this.getDistributorVideoSeenList(newval);
    this.getDistributorList()
    this.formControlValueChanges();
  }


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
        }
      });
    }
  }

  getDistributorVideoSeenList(newval) {
    this.distributorService.getDistributorVideoSeenList(newval).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
      } else {
        this.alllist = [];
      }
    });
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
        this.router.navigate(['/admin', 'distributorvideo-add'], { state: res['data'] });
      }
    });
  }

  getDistributorList() {
    var dataNew = {
    }
    this.distributorService.getDistributorList(dataNew).subscribe((data) => {
      this.alldistributor = data['data'];
      setTimeout(() => {
        let elems = document.querySelectorAll('#created_by');
        let instances = M.FormSelect.init(elems);
      }, 1000);
    })
  }



  formControlValueChanges() {
    this.farmerForm.get('created_by').valueChanges.subscribe(val => {
      let apidata = {
        "dist_id": val
      }
      this.distributorService.getDistributorVideoSeenList(apidata).subscribe(list => {
        if (list['result'] == true) {
          this.alllist = list['data'];
        }
      });
    });
  }

}
