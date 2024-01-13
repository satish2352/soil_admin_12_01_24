import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../distributor.service";
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-distributorvisit',
  templateUrl: './distributorvisit.component.html',
  styleUrls: ['./distributorvisit.component.css']
})
export class DistributorvisitComponent implements OnInit {

  alllist:any;
  p:number = 1;
  alldist: any;
  HelperService: any;
  allstate: any;
  farmerForm: any;
  alltaluka: any;
  allcity: any;
  constructor(public distributorService:DistributorService,public router:Router) { }

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

    this.getdata();



      this.distributorService.getVisitList().subscribe(list => {
        this.alllist = list['data'];
        this.alllist.sort((a, b) => b.id - a.id);
  
      
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


    this.HelperService.getState().subscribe((allstate) => {
      this.allstate = allstate['data'];
      setTimeout(() => {
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      }, 1000);

    });


  }
  
  getdata(){
      
    this.distributorService.getVisitList().subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
        // console.log(this.alllist);
        
      }
      this.getdist();
      setTimeout(() => {
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      }, 1000);
      // this.getFarmerMeetingListdata();
   
      // if (list['error'] == true) {
      //   this.toastr.error("Something went wrong " + list['message']);
      // }
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
    });}

  getdist(){
    this.distributorService.getDistributorList().subscribe((data)=>{
      this.alldist  = data['data'];
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
