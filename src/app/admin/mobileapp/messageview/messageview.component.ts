import { Component, OnInit } from '@angular/core';
import { MobileappService } from "./../mobileapp.service";
import {Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-messageview',
  templateUrl: './messageview.component.html',
  styleUrls: ['./messageview.component.css']
})
export class MessageviewComponent implements OnInit {

  alllist:any;
  p:number = 1;
  farmerForm: FormGroup;
  constructor(public mobileappService:MobileappService,public router:Router) { }

  ngOnInit(): void {
    var data ={}
    this.getListdata(data)
   

    // $(document).ready(function () {
    //   setTimeout(() => {
    //     let table = $('#pagedatatable').DataTable({
    //       ordering: true,
    //       lengthChange: false,
    //       showNEntries: false,
    //     })
    //   }, 4000)
    // })

    this.farmerForm = new FormGroup({
      msg_status: new FormControl('', [Validators.required]),
    });
    this.formControlValueChanges();
    
  }

  editMessege(id) {
    this.router.navigate(['/admin', 'mobileapp-messeges-view', id]);
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
    this.mobileappService.getMobileAppHetMessegesList(data).subscribe(list => {
      this.alllist = list['data'];
      // this.alllist.sort((a,b)=> b.id - a.id)
    });

  }



}

