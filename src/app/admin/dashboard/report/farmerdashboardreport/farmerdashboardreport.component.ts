import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service'
@Component({
  selector: 'app-farmerdashboardreport',
  templateUrl: './farmerdashboardreport.component.html',
  styleUrls: ['./farmerdashboardreport.component.css']
})
export class FarmerdashboardreportComponent implements OnInit {
  p: number = 1;
  allfarmerlist: any;
  id: any;
  id1: number;
  id2: number;
  id3: number;

  constructor(
    private router: Router,
    private DashboardService: DashboardService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.getFarmers();
  }

  getFarmers() {

    this.id = +this.route.snapshot.paramMap.get('id');
    this.id1 = +this.route.snapshot.paramMap.get('id1');
    this.id2 = +this.route.snapshot.paramMap.get('id2');
    this.id3 = +this.route.snapshot.paramMap.get('id3');

    var data = {
      state: this.id,
      district: this.id1,
      taluka: this.id2,
      city: this.id3,
    }

    this.DashboardService.getFarmersDashReport(data).subscribe(res => {
      if (res['result']) {
        this.allfarmerlist = res['data'];
        console.log(this.allfarmerlist);
        // setTimeout(() => {
        //   let elems = document.querySelectorAll('select');
        //   let instances = M.FormSelect.init(elems);
        // }, 1000);
      }
    });
  }


}
