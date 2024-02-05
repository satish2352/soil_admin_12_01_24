import { Component, OnInit } from '@angular/core';
import { MobileappService } from "./../mobileapp.service";
import {Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-complaintview',
  templateUrl: './complaintview.component.html',
  styleUrls: ['./complaintview.component.css']
})
export class ComplaintviewComponent implements OnInit {
  
    alllist:any;
    p:number = 1;
    farmerForm: FormGroup;
    constructor(public mobileappService:MobileappService,public router:Router) { }
  
    ngOnInit(): void {
      // this.mobileappService.getMobileAppHetComplaintList().subscribe(list => {
      //   this.alllist = list['data'];
      //   this.alllist.sort((a,b)=>b.id-a.id)
      // });

      var data ={}
    this.getListdata(data)
   

    
    
    setTimeout(() => {
      let elems = document.querySelectorAll('msg_status');
      let instances = M.FormSelect.init(elems);
    }, 1000);



  this.farmerForm = new FormGroup({
    msg_status: new FormControl('', [Validators.required]),
  });
  this.formControlValueChanges();
  
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


    formControlValueChanges() {
      this.farmerForm.get('msg_status').valueChanges.subscribe(val => {
        let data ={
          'msg_status':val
        }
        this.getListdata(data);
      });
    }


    getListdata(data) {
      this.mobileappService.getMobileAppHetComplaintList(data).subscribe(list => {
        this.alllist = [];
        this.alllist = list['data'];
        // this.alllist.sort((a,b)=> b.id - a.id)
      });
  
    }

    editMessege(id) {
      this.router.navigate(['/admin', 'mobileapp-complaint-view', id]);
    }
  }
  
  