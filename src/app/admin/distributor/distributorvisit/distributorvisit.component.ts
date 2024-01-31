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
  allstate: any = [];
  alldist: any = [];
  alldistributor: any = [];
  allcity: any = [];
  alltaluka: any = [];
  added_by: any = [];
  formdatanew: any;

  state: any;
  district: any;
  taluka: any;
  city: any;
  dataNew: any;

  farmerForm: FormGroup;
  constructor(
    public distributorService: DistributorService,
    private HelperService: HelperService,
    public router: Router) {
    this.farmerForm = new FormGroup({
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      taluka: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      added_by: new FormControl('', [Validators.required]),
    });


  }
  ngOnInit(): void {
    this.getdata({});
    this.getDistributorList();
    

    
    this.HelperService.getState().subscribe((allstate) => {
      this.allstate = allstate['data'];
      setTimeout(() => {
        let elems = document.querySelectorAll('#selectState');
        let instances = M.FormSelect.init(elems);
      }, 1000);
      // this.formControlValueChanges();
    });

    this.farmerForm.valueChanges.subscribe((newval) => {
      this.getdata(newval)
    });
    this.formControlValueChanges();
  
  }

  getdata(data) {
  //  let data = {
  //     state: this.farmerForm.value.state,
  //     district: this.farmerForm.value.district,
  //     taluka: this.farmerForm.value.taluka,
  //     city: this.farmerForm.value.city,
  //     added_by: this.farmerForm.value.added_by

  //   }
    this.distributorService.getVisitList(data).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
        // console.log(this.alllist);
        // setTimeout(() => {
        //   let elems = document.querySelectorAll('#selectState');
        //   let instances = M.FormSelect.init(elems);
        // }, 1000);

        // setTimeout(() => {
        //   let elems = document.querySelectorAll('#added_by');
        //   let instances = M.FormSelect.init(elems);
        // }, 1000);


        // setTimeout(() => {
        //   let elems = document.querySelectorAll('#selectTal');
        //   let instances = M.FormSelect.init(elems);
        // }, 1000);


        // setTimeout(() => {
        //   let elems = document.querySelectorAll('#selectDist');
        //   let instances = M.FormSelect.init(elems);
        // }, 1000);


        // setTimeout(() => {
        //   let elems = document.querySelectorAll('#selectCity');
        //   let instances = M.FormSelect.init(elems);
        // }, 1000);


      }
    });
  }

  formControlValueChanges() {
    this.farmerForm.get('state').valueChanges.subscribe(val => {
      console.log("state ",val);
      
      this.HelperService.getDist({ state_id: val }).subscribe((alldist) => {
        this.alldist = alldist['data'];

        setTimeout(() => {
          let elems = document.querySelectorAll('#selectDist');
          let instances = M.FormSelect.init(elems);
        }, 1000);

        // this.getdata();

      });
    });

    this.farmerForm.get('district').valueChanges.subscribe(val => {
      console.log("district ",val);
      this.HelperService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
        this.alltaluka = alltaluka['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('#selectTal');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        // this.getdata();
      });
    });

    this.farmerForm.get('taluka').valueChanges.subscribe(val => {
      console.log("taluka ",val);
      this.HelperService.getCity({ taluka_id: val }).subscribe((allcity) => {
        this.allcity = allcity['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('#selectCity');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        // this.getdata();
      });
    });

    this.farmerForm.get('city').valueChanges.subscribe(val => {
      console.log("city ",val);

      // setTimeout(() => {
      //   let elems = document.querySelectorAll('#selectCity');
      //   let instances = M.FormSelect.init(elems);
      // }, 1000);
      // this.getdata();
    });


    this.farmerForm.get('added_by').valueChanges.subscribe(val => {
      console.log("added_by ",val);
      // this.getdata();
    });
  }

  getDistributorList() {
    var dataNew = {
    }
    this.distributorService.getDistributorList(dataNew).subscribe((data) => {
      this.alldistributor = data['data'];
      setTimeout(() => {
        let elems = document.querySelectorAll('#added_by');
        let instances = M.FormSelect.init(elems);
      }, 1000);
    })
  }



  getDataByDist(selectedUserstate: any) {

    const selectedDistributor = this.alldist.find((d) => d.user_state === selectedUserstate);
    console.log('Selected Distributor:', selectedUserstate);
    console.log(selectedDistributor);
    // this.getdata();
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
