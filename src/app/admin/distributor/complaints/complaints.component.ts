import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DistributorService } from '../distributor.service';
declare let $: any;
@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  complaints: any = [];
  p:number=1;
  constructor(private route: ActivatedRoute, private ds: DistributorService) { }

  ngOnInit(): void {
    this.getDistributorComplaints();
    
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

  getDistributorComplaints() {
    const dist_id = this.route.snapshot.paramMap.get('dist_id');
    this.ds.getDistributorComplaints(dist_id).subscribe(res=>{
      if (res['result']) {
        this.complaints = res['data'];
      }
    });
  }

}
