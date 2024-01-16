import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../distributor.service";
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helper.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-distributorvisit',
  templateUrl: './distributorvisit.component.html',
  styleUrls: ['./distributorvisit.component.css']
})
export class DistributorvisitComponent implements OnInit {

  alllist: any;
  p: number = 1;
  alldist: any;
  allstate: any;
  alltaluka: any;
  allcity: any;
  added_by: any;
  formdatanew: any;

  id: any;
  id1: any;
  id2: any;
  id3: any;
  id4: any;

  farmerForm: FormGroup;
  constructor(
    public distributorService: DistributorService,
    private HelperService: HelperService,
    public router: Router) { }

  ngAfterViewInit(): void {

    $(".paginate_button").hide()
  }

  // ngOnInit(): void {
  //   this.getdist();
  //   this.distributorService.getVisitList().subscribe(list => {
  //     this.alllist = list['data'];
  //     this.alllist.sort((a, b) => b.id - a.id);


  //   });
  //   setTimeout(() => {
  //     let elems = document.querySelectorAll('select');
  //     let instances = M.FormSelect.init(elems);
  //   }, 1000);

  //   // $(document).ready(function () {
  //   //   setTimeout(() => {
  //   //     let table = $('#pagedatatable').DataTable({
  //   //       ordering: true,
  //   //       lengthChange: false,
  //   //       showNEntries: false,
  //   //     })
  //   //   }, 4000)
  //   // })

  // }
  ngOnInit(): void {
    $('select').formSelect();
    this.HelperService.getState().subscribe((allstate) => {
      this.allstate = allstate['data'];
      setTimeout(() => {
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      }, 1000);

    });
    this.getdata();

    // this.distributorService.getVisitList().subscribe(list => {
    //   this.alllist = list['data'];
    //   this.alllist.sort((a, b) => b.id - a.id);
    // });

    this.farmerForm = new FormGroup({
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      taluka: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      added_by: new FormControl('', [Validators.required]),


    });

    this.formControlValueChanges();

    $(document).ready(function () {
      setTimeout(() => {
        let table = $('#pagedatatable').DataTable({
          ordering: true,
          lengthChange: false,
          showNEntries: false,
        })
      }, 4000)
    })

    // $(document).ready(function () {
    //   setTimeout(() => {
    //     let table = $('#pagedatatable').DataTable({
    //       ordering: true,
    //       lengthChange: false,
    //       showNEntries: false,

    //       dom: 'Bfrtip',
    //       buttons: [
    //         //'copy', 'csv', 'excel', 'pdf', 'print'
    //         //*
    //         'excel', 'pdf'

    //       ]


    //     })
    //   }, 4000)
    // })




  }

  getdata() {

    this.formdatanew = this.farmerForm.value;
    this.id = this.formdatanew.state;
    this.id1 = this.formdatanew.district;
    this.id2 = this.formdatanew.taluka;
    this.id3 = this.formdatanew.city;
    this.id4 = this.formdatanew.added_by;

    var data = {
      state: this.id,
      district: this.id1,
      taluka: this.id2,
      city: this.id3,
      added_by: this.id4

    }
    this.distributorService.getVisitList(data).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
        // console.log(this.alllist);

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

        this.getdata();

      });
    });

    this.farmerForm.get('district').valueChanges.subscribe(val => {
      this.HelperService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
        this.alltaluka = alltaluka['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.getdata();
      });
    });

    this.farmerForm.get('taluka').valueChanges.subscribe(val => {
      this.HelperService.getCity({ taluka_id: val }).subscribe((allcity) => {
        this.allcity = allcity['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.getdata();
      });
    });
  }

  getdist() {
    this.distributorService.getDistributorList().subscribe((data) => {
      this.alldist = data['data'];
    })
  }



  getDataByDist(selectedUserId: any) {

    const selectedDistributor = this.alldist.find((d) => d.user_id === selectedUserId);
    console.log('Selected Distributor:', selectedUserId);
    console.log(selectedDistributor);
    this.getdata();
  }

  searchText: string = '';

  // Create a function to filter the data based on the search criteria
  applySearchFilter() {
    // If the search text is empty, return the original data
    if (!this.searchText.trim()) {
      return this.alllist;
    }

    // Use the filter method to match the search criteria
    return this.alllist.filter(item =>
      item.dfname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.dmname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.dlname.toLowerCase().includes(this.searchText.toLowerCase()) ||


      item.ffname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.district.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.created_at.includes(this.searchText)
      // Add more fields as needed
    );
  }

  // Use the filtered data in your component
  get filteredList() {
    return this.applySearchFilter();
  }

}
