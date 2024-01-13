import { Component, OnInit } from '@angular/core';
import { MlmService } from "../mlm.service";
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-mlmlist',
  templateUrl: './mlmlist.component.html',
  styleUrls: ['./mlmlist.component.css']
})
export class MlmlistComponent implements OnInit {

 
  p:number=1;
  alllist:any = [];
  alllist_fsc:any=[];
  alllist_bsc:any=[];
  constructor(public mlmService:MlmService,
    public router:Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDistributors();


    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
    
  }

  getDistributors() {
    this.mlmService.getDistributorList().subscribe(list => {
      if(list['result']==true) {
        this.alllist = list['data'];
      }
    });
  }

  getBscUnderDSC(id) {
    var obj={
      'added_by':id
    }
    this.mlmService.getBscUnderDSC(obj).subscribe(list => {
      if(list['result']==true) {
        this.alllist_bsc = list['data'];
      }
    });
  }

  getFscUnderBsc(id) {
    var obj={
      'added_by':id
    }
    this.mlmService.getFscUnderBsc(obj).subscribe(list => {
      if(list['result']==true) {
        this.alllist_fsc = list['data'];
      }
    });
  }

  delete(id) {
    var obj = {
      id: id
    };

    this.mlmService.deleteById(obj).subscribe(res=>{
      if (res['result']== true) {
        this.getDistributors();
      }
     });
  }

  getForEdit(event) {
    var obj = {
      id: event
    };

    this.mlmService.getByIdForEdit(obj).subscribe(res=>{
      if (res['result']== true) {
        this.router.navigate(['/admin','distributor-add'], { state: res['data'] });
      }
     });
  }

  getForView(event) {
    var obj = {
      id: event
    };

    this.mlmService.getByIdForEdit(obj).subscribe(res=>{
      if (res['result']== true) {
        this.router.navigate(['/admin','distributor-view'], { state: res['data'] });
      }
     });
  }


  setStatus(event, id) {
    var obj = {
      id: id
    };
    if (event.target.checked) {
      this.mlmService.unblockDistributor(obj).subscribe(res=>{
        if (res['result']) {
          this.toastr.success('Distributor unblocked successfully!');
        } else {
          this.toastr.error(res['message']);
        }
      });
    } else {
      this.mlmService.blockDistributor(obj).subscribe(res=>{
        if (res['result']) {
          this.toastr.success('Distributor blocked successfully!');
        } else {
          this.toastr.error(res['message']);
        }
      });
    }
  }
  

  showComplaints(id) {
    this.router.navigate(['/admin', 'distributor-complaints', id]);
  }

  showMessages(id) {
    this.router.navigate(['/admin', 'distributor-messages', id]);
  }


}
