import { Component, OnInit } from '@angular/core';
import { MobileappService } from "./../mobileapp.service";
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-messageview',
  templateUrl: './messageview.component.html',
  styleUrls: ['./messageview.component.css']
})
export class MessageviewComponent implements OnInit {

  alllist:any;
  p:number = 1;
  constructor(public mobileappService:MobileappService,public router:Router) { }

  ngOnInit(): void {
    this.mobileappService.getMobileAppHetMessegesList().subscribe(list => {
      this.alllist = list['data'];
      this.alllist.sort((a,b)=> b.id - a.id)
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

  editMessege(id) {
    this.router.navigate(['/admin', 'mobileapp-messeges-view', id]);
  }
}

