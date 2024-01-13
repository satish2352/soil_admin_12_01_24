import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service'
import { HelperService } from 'src/app/helper.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
declare var $: any;
@Component({
  selector: 'app-dashboard-v1',
  templateUrl: './dashboard-v1.component.html',
  styleUrls: ['./dashboard-v1.component.css']
})
export class DashboardV1Component implements OnInit {
  p: number = 1;
  submitted: boolean = false;
  lat = 19.0760;
  lng = 72.8777;
  allagencylist: any;

  farmerForm: FormGroup;
  distForm: FormGroup
  allstate: any = [];
  alldist: any = [];
  allcity: any = [];
  alltaluka: any = [];

  name = 'Angular';
  webdash_farmer_count_all = [];
  webdash_dist_count_all = [];
  //view: any[] = [500, 200];
  view: any[] = [400, 150];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Parameter';
  showYAxisLabel = true;
  yAxisLabel = 'Count';

  colorScheme = {
    domain: ['#13D876', '#11E5C2', '#F10080', '#5E2390', '#1E86DF']
  };
  id: any;
  formdatanew: any;
  id1: any;
  id2: any;
  id3: any;
  id4: any;
  farmer_count: any;
  distributor_count: any;
  fsc_count: any;
  bsc_count: any;
  dsc_count: any;
  order_count: any;
  product_count: any;
  distributor_type: any;
  product_count_productwise: any;

  constructor(private DashboardService: DashboardService,
    private HelperService: HelperService,
    private toastr: ToastrService,
    private router: Router,) {
  }

  ngOnInit(): void {


    $(document).ready(function () {
      setTimeout(() => {
        let table = $('#pagedatatable').DataTable({
          ordering: true,
          lengthChange: false,
          showNEntries: false,

          // dom: 'Bfrtip',

        })
      }, 4000)
    })

    this.getAgency();
    this.distributor_type = this.HelperService.getDistributorTypeList();
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
    });
    this.formControlValueChanges();

    this.distForm = new FormGroup({
      statenew: new FormControl('', [Validators.required]),
      districtnew: new FormControl('', [Validators.required]),
      talukanew: new FormControl('', [Validators.required]),
      citynew: new FormControl('', [Validators.required]),
      dist_type: new FormControl('', [Validators.required]),
    });
    this.formControlValueChangesNew();

    $('select').formSelect();
    this.farmerGrapdata();
    this.distGrapdata();
    this.dashboarddata();

  }


  dashboarddata() {
    this.DashboardService.dashboarddata().subscribe(res => {
      if (res['result']) {
        this.farmer_count = res['farmer_count'];
        this.distributor_count = res['distributor_count'];
        this.product_count = res['product_count'];
        this.order_count = res['order_count'];
        this.dsc_count = res['dsc_count'];
        this.bsc_count = res['bsc_count'];
        this.fsc_count = res['fsc_count'];
        this.product_count_productwise = res['product_count_productwise'];
      }
    });
  }

  farmerGrapdata() {
    this.id = '';
    this.id1 = '';
    this.id2 = '';
    this.id3 = '';
    this.id4 = '';

    this.webdash_farmer_count_all = [];
    this.formdatanew = this.farmerForm.value;
    this.id = this.formdatanew.state;
    this.id1 = this.formdatanew.district;
    this.id2 = this.formdatanew.taluka;
    this.id3 = this.formdatanew.city;

    var data = {
      state: this.id,
      district: this.id1,
      taluka: this.id2,
      city: this.id3,
    }
    this.DashboardService.webdash_farmer_count(data).subscribe(res => {
      if (res['result']) {
        var resnew = JSON.parse(res['data']);
        resnew.map(x => {
          this.webdash_farmer_count_all.push(x);
        });
        this.webdash_farmer_count_all = [...this.webdash_farmer_count_all];
      }
    });

  }

  distGrapdata() {

    this.id = '';
    this.id1 = '';
    this.id2 = '';
    this.id3 = '';
    this.id4 = '';
    this.formdatanew = ''

    this.webdash_dist_count_all = [];
    this.formdatanew = this.distForm.value;
    this.id = this.formdatanew.statenew;
    this.id1 = this.formdatanew.districtnew;
    this.id2 = this.formdatanew.talukanew;
    this.id3 = this.formdatanew.citynew;
    this.id4 = this.formdatanew.dist_type;

    var data = {
      dist_type: this.id4,
      state: this.id,
      district: this.id1,
      taluka: this.id2,
      city: this.id3,
    }
    this.DashboardService.webdash_dist_count(data).subscribe(res => {
      if (res['result']) {
        var resnew = JSON.parse(res['data']);
        resnew.map(x => {
          this.webdash_dist_count_all.push(x);
        });
        this.webdash_dist_count_all = [...this.webdash_dist_count_all];
      }
    });

  }
  getAgency() {
    this.DashboardService.getAgency().subscribe(res => {
      if (res['result']) {
        console.log(res['result']);
        this.allagencylist = res['data'];
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

        this.farmerGrapdata();

      });
    });

    this.farmerForm.get('district').valueChanges.subscribe(val => {
      this.HelperService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
        this.alltaluka = alltaluka['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.farmerGrapdata();
      });
    });

    this.farmerForm.get('taluka').valueChanges.subscribe(val => {
      this.HelperService.getCity({ taluka_id: val }).subscribe((allcity) => {
        this.allcity = allcity['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.farmerGrapdata();
      });
    });
  }

  getDataByCityFarmer() {
    this.farmerGrapdata();
  }

  get f() {
    return this.farmerForm.controls;
  }


  onSubmit() {
    console.log(this.farmerForm.value);
    this.formdatanew = this.farmerForm.value;
    this.id = this.formdatanew.state;
    this.id1 = this.formdatanew.district;
    this.id2 = this.formdatanew.taluka;
    this.id3 = this.formdatanew.city;

    this.router.navigate(['/admin', 'farmerdash-report', this.id, this.id1, this.id2, this.id3]);
  }


  formControlValueChangesNew() {
    this.distForm.get('statenew').valueChanges.subscribe(val => {
      this.HelperService.getDist({ state_id: val }).subscribe((alldist) => {
        this.alldist = alldist['data'];

        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);

        this.distGrapdata();

      });
    });



    // this.distForm.get('dist_type').valueChanges.{

    // }
    //     this.distGrapdata();
    // });


    this.distForm.get('districtnew').valueChanges.subscribe(val => {
      this.HelperService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
        this.alltaluka = alltaluka['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.distGrapdata();
      });
    });

    this.distForm.get('talukanew').valueChanges.subscribe(val => {
      this.HelperService.getCity({ taluka_id: val }).subscribe((allcity) => {
        this.allcity = allcity['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.distGrapdata();
      });
    });


    //this.distForm.get('citynew').valueChanges.


  }

  selectDist(val) {
    console.log(val);

    alert(val.target.value);
    this.distGrapdata();
  }

  getDataByCityDist() {
    this.distGrapdata();
  }

  get ff() {
    return this.distForm.controls;
  }


  onSubmitDist() {
    this.formdatanew = this.distForm.value;
    this.id = this.formdatanew.statenew;
    this.id1 = this.formdatanew.districtnew;
    this.id2 = this.formdatanew.talukanew;
    this.id3 = this.formdatanew.citynew;
    this.id4 = this.formdatanew.dist_type;

    this.router.navigate(['/admin', 'distdash-report', this.id, this.id1, this.id2, this.id3, this.id4]);
  }




}
