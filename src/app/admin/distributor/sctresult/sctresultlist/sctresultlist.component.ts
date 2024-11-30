import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../../distributor.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-sctresultlist',
  templateUrl: './sctresultlist.component.html',
  styleUrls: ['./sctresultlist.component.css']
})
export class SctresultlistComponent implements OnInit {

  p: number = 1;
  alllist: any = [];
  alldistributor = [];
  farmerForm: FormGroup;
  constructor(public distributorService: DistributorService,
    public router: Router,
    private toastr: ToastrService) {

    this.farmerForm = new FormGroup({
      created_by: new FormControl('', [Validators.required]),
    });

  }
  
  isValidPhotopath(path: string): boolean {
    return /\d/.test(path); // Check if the path contains any digits
  }
  

  ngOnInit(): void {
    let newval = {
      'dist_id':''
    }
    this.getSctresultslist(newval);
    this.getDistributorList()


    $(document).ready(function () {
      setTimeout(() => {
        let table = $('#pagedatatable').DataTable({
          ordering: true,
          lengthChange: false,
          showNEntries: false,
        })
      }, 4000)
    })
    this.formControlValueChanges();

    setTimeout(() => {
      let elems = document.querySelectorAll('msg_status');
      let instances = M.FormSelect.init(elems);
    }, 1000);

  }

  getSctresultslist(newval) {
    this.distributorService.getSctresultslist(newval).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
      }
    });
  }


  getForEdit(event) {
    var obj = {
      id: event
    };

    this.distributorService.getByIdForEdit(obj).subscribe(res => {
      if (res['result'] == true) {
        this.router.navigate(['/admin', 'distributor-add'], { state: res['data'] });
      }
    });
  }

  getForView(event) {
    var obj = {
      id: event
    };

    this.distributorService.getSctresultsview(obj).subscribe(res => {
      if (res['result'] == true) {
        this.router.navigate(['/admin', 'sctresult-view'], { state: res['data'] });
      }
    });
  }



  formControlValueChanges() {
    this.farmerForm.get('created_by').valueChanges.subscribe(val => {
      let apidata = {
        "dist_id": val
      }
      this.distributorService.getSctresultslist(apidata).subscribe(list => {
        if (list['result'] == true) {
          this.alllist = list['data'];
        }
      });
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


}

