import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../../distributor.service";
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-sctresultlist',
  templateUrl: './sctresultlist.component.html',
  styleUrls: ['./sctresultlist.component.css']
})
export class SctresultlistComponent implements OnInit {

  p:number=1;
  alllist:any = [];
  constructor(public distributorService:DistributorService,
    public router:Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSctresultslist();


    $(document).ready(function () {
      setTimeout(() => {
        let table = $('#pagedatatable').DataTable({
          ordering: true,
          lengthChange: false,
          showNEntries: false,
        })
      }, 4000)
    })

  }

  getSctresultslist() {
    this.distributorService.getSctresultslist().subscribe(list => {
      if(list['result']==true) {
        this.alllist = list['data'];
      }
    });
  }

 
  getForEdit(event) {
    var obj = {
      id: event
    };

    this.distributorService.getByIdForEdit(obj).subscribe(res=>{
      if (res['result']== true) {
        this.router.navigate(['/admin','distributor-add'], { state: res['data'] });
      }
     });
  }

  getForView(event) {
    var obj = {
      id: event
    };

    this.distributorService.getSctresultsview(obj).subscribe(res=>{
      if (res['result']== true) {
        this.router.navigate(['/admin','sctresult-view'], { state: res['data'] });
      }
     });
  }


  setStatus(event, id) {
    var obj = {
      id: id
    };
    if (event.target.checked) {
      this.distributorService.unblockDistributor(obj).subscribe(res=>{
        if (res['result']) {
          this.toastr.success('Distributor unblocked successfully!');
        } else {
          this.toastr.error(res['message']);
        }
      });
    } else {
      this.distributorService.blockDistributor(obj).subscribe(res=>{
        if (res['result']) {
          this.toastr.success('Distributor blocked successfully!');
        } else {
          this.toastr.error(res['message']);
        }
      });
    }
  }



}

