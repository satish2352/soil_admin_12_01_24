import { Component, OnInit } from '@angular/core';
import { FcofieldService } from "../../fcofield.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/helper.service';
import { DistributorService } from 'src/app/admin/distributor/distributor.service';
declare var $: any;
@Component({
  selector: 'app-plotvisitlist',
  templateUrl: './plotvisitlist.component.html',
  styleUrls: ['./plotvisitlist.component.css']
})
export class PlotvisitlistComponent implements OnInit {
  p:number=1;
  alllist: any;
  farmerForm: FormGroup;
  allstate: any = [];
  alldist: any = [];
  allcity: any = [];
  alltaluka: any = [];
  formdatanew: any;

  id: any;
  id1: any;
  id2: any;
  id3: any;
  distributordetailsall: any;
  id4: any;
  submitted: boolean = false;

  constructor(public fcofieldService: FcofieldService, 
            public router: Router, 
            private toastr: ToastrService,
            private HelperService:HelperService,
            private distributorService:DistributorService
            ) { }

  ngOnInit(): void {
    this.getPlotVisitList();


    this.HelperService.getState().subscribe((allstate) => {
      this.allstate = allstate['data'];
      setTimeout(() => {
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      }, 1000);

    });
    

    this.farmerForm = new FormGroup({
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      taluka: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      created_disctributor_id: new FormControl('', [Validators.required]),
    });
    this.formControlValueChanges();


    this.distributorService.getDistributorList().subscribe(distributordetailsall => {
      this.distributordetailsall = distributordetailsall['data'];
    });



    $(document).ready(function () {
      setTimeout(() => {
        let table = $('#pagedatatable').DataTable({
          ordering: true,
          lengthChange: false,
          showNEntries: false,

          dom: 'Bfrtip',
        buttons: [
          //'copy', 'csv', 'excel', 'pdf', 'print'
          'excel', 'pdf'
        ]

          
        })
      }, 4000)
    })

    
  }

  getPlotVisitList() {

    var data = {
      state: '',
      district: '',
      taluka: '',
      city:'',
    }

    this.fcofieldService.getPlotVisitList(data).subscribe(list => {
      this.alllist = list['data'];
    });
  }

  delete(id) {
    var obj = {
      visit_id: id
    };
    this.fcofieldService.deletePlotVisit(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success('Plot visit deleted successfully!');
        this.getPlotVisitList();
      }
    });
  }

  getForEdit(event) {
    var obj = {
      visit_id: event
    };
    //console.log(obj);
    this.fcofieldService.getPlotVisitForEdit(obj).subscribe(res => {
      if (res['result'] == true) {
        this.router.navigate(['/admin', 'plotvisit-add'],{state: res['data']});
      }
    });
  }


  formControlValueChanges() {
    this.farmerForm.get('state').valueChanges.subscribe(val => {
      this.HelperService.getDist({ state_id: val }).subscribe((alldist) => {
        this.alldist = alldist['data'];

        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);

        this.getPlotVisitListdata();

      });
    });

    this.farmerForm.get('district').valueChanges.subscribe(val => {
      this.HelperService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
        this.alltaluka = alltaluka['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.getPlotVisitListdata();
      });
    });

    this.farmerForm.get('taluka').valueChanges.subscribe(val => {
      this.HelperService.getCity({ taluka_id: val }).subscribe((allcity) => {
        this.allcity = allcity['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.getPlotVisitListdata();
      });
    });
  }

  getDataByDist()
  {
    this.getPlotVisitListdata();
  }

  getDataByCity()
  {
    this.getPlotVisitListdata();
  }

  get f() {
    return this.farmerForm.controls;
  }


  // onSubmit() {
  //   console.log(this.farmerForm.value);
  //   this.formdatanew = this.farmerForm.value;
  //   this.id = this.formdatanew.state;
  //   this.id1 = this.formdatanew.district;
  //   this.id2 = this.formdatanew.taluka;
  //   this.id3 = this.formdatanew.city;

  //   this.router.navigate(['/admin', 'farmerdash-report', this.id, this.id1, this.id2, this.id3]);
  // }

  
  getPlotVisitListdata() {

    this.formdatanew = this.farmerForm.value;
    this.id = this.formdatanew.state;
    this.id1 = this.formdatanew.district;
    this.id2 = this.formdatanew.taluka;
    this.id3 = this.formdatanew.city;
    this.id4 = this.formdatanew.created_disctributor_id;

    var data = {
      state: this.id,
      district: this.id1,
      taluka: this.id2,
      city: this.id3,
      added_by: this.id4,
    }
    this.fcofieldService.getPlotVisitList(data).subscribe(res => {
      if (res['result']) {
        this.alllist = res['data'];
      }
    });

  }


}
