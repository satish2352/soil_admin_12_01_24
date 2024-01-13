import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../../distributor.service";
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../../../../helper.service';
declare var $: any;
@Component({
  selector: 'app-distributortargetvideoadd',
  templateUrl: './distributortargetvideoadd.component.html',
  styleUrls: ['./distributortargetvideoadd.component.css']
})
export class DistributortargetvideoaddComponent implements OnInit {

  submitted: boolean = false;
  distributortargetvideoForm: FormGroup;
  video_to: any;
  videodetailsall: any;
  to_whom_showall:any=[];
  editdata: any;
  constructor(public distributorService: DistributorService, 
    public http: HttpClient, private fb: FormBuilder, 
    public router: Router, private location: Location,
    private toastr: ToastrService,
    private helperService:HelperService) {
    //this.router.getCurrentNavigation().extras.state
  }

  ngOnInit(): void {
    this.editdata = history.state;

    // this.distributorService.getDistributorList().subscribe(distributordetailsall => {
    //   this.distributordetailsall = distributordetailsall['data'];
    // });

    this.distributorService.getVideoDetailsAll().subscribe(videodetailsall => {
      this.videodetailsall = videodetailsall['data'];
    });

    this.to_whom_showall=this.helperService.getBSCDSCList();
    setTimeout(() => {
      let elems = document.querySelectorAll('select');
      let instances = M.FormSelect.init(elems);
    }, 1000);

    this.distributortargetvideoForm = new FormGroup({
      target_vedio_id: new FormControl('', [Validators.required]),
      to_whom_show: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      datafor: new FormControl('0'),
      video_id: new FormControl('0')

    });

    $('select').formSelect();

    console.log(this.editdata[0]);
    if (this.location.getState()) {
      const editdatanew = this.editdata[0];
      this.distributortargetvideoForm.patchValue({
        target_vedio_id: editdatanew.target_vedio_id,
        //dist_id: editdatanew.dist_id,
        date: editdatanew.date,
        datafor: 1,
        video_id: editdatanew.id
      });

    }

  }

  get f() { return this.distributortargetvideoForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.distributortargetvideoForm.invalid) {
      console.log('Form Invalid');
      return;
    }
    console.log(this.distributortargetvideoForm.value);
    if (this.distributortargetvideoForm.value.datafor == '0') {
      this.distributorService.addDistirbutorTargetVideo(this.distributortargetvideoForm.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Distirbutor Video Added");
          this.router.navigate(['/admin', 'distributorvideo-list']);
        }
      });
    }
    else {
      this.distributorService.updateDistirbutorTargetVideo(this.distributortargetvideoForm.value).subscribe(res => {
        if (res['result'] == true) {
          this.toastr.success("Distirbutor Video Updated");
          this.router.navigate(['/admin', 'distributorvideo-list']);
        }
      });


    }

  }



}
