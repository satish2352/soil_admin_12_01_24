import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DistributorService } from '../distributor.service';
declare let $: any;
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  p:number=1;
  messages: any = [];
  constructor(private route: ActivatedRoute, private ds: DistributorService) { }

  ngOnInit(): void {
    this.getDistributorMessages();

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

  getDistributorMessages() {
    const dist_id = this.route.snapshot.paramMap.get('dist_id');
    this.ds.getDistributorMessages(dist_id).subscribe(res=>{
      if (res['result']) {
        this.messages = res['data'];
      }
    });
  }

}
