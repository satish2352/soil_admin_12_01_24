import { Component, OnInit } from '@angular/core';
import { FcofieldService } from '../../fcofield.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/helper.service';
import { DistributorService } from 'src/app/admin/distributor/distributor.service';
// import { NgLocalization } from '@angular/common';
// import { ResourceLoader } from '@angular/compiler';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


import 'jspdf-autotable';
import { saveAs } from 'file-saver';



declare var $: any;
@Component({
  selector: 'app-farmerlist',
  templateUrl: './farmerlist.component.html',
  styleUrls: ['./farmerlist.component.css'],
})
export class FarmerlistComponent implements OnInit {
  p: number = 1;
  allfarmerlist: any;

  farmerForm: FormGroup;
  allstate: any = [];
  alldist: any = [];
  allcity: any = [];
  alltaluka: any = [];
  formdatanew: any;
  submitted: boolean = false;

  id: any;
  id1: any;
  id2: any;
  id3: any;
  dataNew:any;

  distributordetailsall: any;
  id4: any;
  id5: any;

  constructor(
    public fcofieldService: FcofieldService,
    public router: Router,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    private HelperService: HelperService,
    private distributorService: DistributorService
  ) { }

  ngOnInit(): void {
    // $('#pageDataTable').DataTable();
    // console.log(localStorage.getItem('token'));
    this.getFarmerList();

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
    var dataNew = {
      
    }
    
    this.distributorService.getDistributorList(dataNew).subscribe(distributordetailsall => {
      this.distributordetailsall = distributordetailsall['data'];
    });


    // $(document).ready(function () {
    //   setTimeout(() => {
    //     let table = $('#pagedatatable').DataTable({
    //       ordering: true,
    //       lengthChange: true,
    //       showNEntries: false,
    //     })
    //   }, 4000)
    // })

  }

  getFarmerList() {

    var data = {
      state: '',
      district: '',
      taluka: '',
      city: '',
    }

    this.fcofieldService.getFarmerList(data).subscribe((farmerlist) => {
      this.ngxService.start();
      this.allfarmerlist = farmerlist['data'];
      this.ngxService.stop();
    });
  }

  deleteFarmer(id) {
    var obj = {
      user_id: id,
    };

    this.fcofieldService.deleteFarmer(obj).subscribe((res) => {
      if (res['result'] == true) {
        this.toastr.success('Farmer deleted successfully!');
        this.getFarmerList();
      }
    });
  }

  getFarmerForEdit(event) {
    var obj = {
      user_id: event,
    };
    //console.log(obj);
    this.fcofieldService.getFarmerForEdit(obj).subscribe((res) => {
      if (res['result'] == true) {
        this.router.navigate(['/admin', 'farmer-add'], { state: res['data'] });
      }
    });
  }

  getFarmerForView(event) {
    var obj = {
      user_id: event,
    };
    //console.log(obj);
    this.fcofieldService.getFarmerForEdit(obj).subscribe((res) => {
      if (res['result'] == true) {
        this.router.navigate(['/admin', 'farmer-view'], { state: res['data'] });
      }
    });
  }




  ///////////////////////////////////////////////////////////////////////////////////////

  formControlValueChanges() {
    this.farmerForm.get('state').valueChanges.subscribe(val => {
      this.HelperService.getDist({ state_id: val }).subscribe((alldist) => {
        this.alldist = alldist['data'];

        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);

        this.farmerListdata();

      });
    });

    this.farmerForm.get('district').valueChanges.subscribe(val => {
      this.HelperService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
        this.alltaluka = alltaluka['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.farmerListdata();
      });
    });

    this.farmerForm.get('taluka').valueChanges.subscribe(val => {
      this.HelperService.getCity({ taluka_id: val }).subscribe((allcity) => {
        this.allcity = allcity['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.farmerListdata();
      });
    });








  }

  get f() {
    return this.farmerForm.controls;
  }

  getDataByDist() {
    this.farmerListdata();
  }

  getDataByCity() {
    this.farmerListdata();
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


  farmerListdata() {

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
      added_by: this.id4

    }
    this.fcofieldService.getFarmerList(data).subscribe(res => {
      if (res['result']) {
        this.allfarmerlist = res['data'];
      }
    });

    
  }
  
  searchText: string = '';

    // Create a function to filter the data based on the search criteria
    applySearchFilter() {
        // If the search text is empty, return the original data
        if (!this.searchText.trim()) {
            return this.allfarmerlist;
        }

        // Use the filter method to match the search criteria
        return this.allfarmerlist.filter(item =>
            item.sct_farmer_fname.toLowerCase().includes(this.searchText.toLowerCase()) ||
            item.state.toLowerCase().includes(this.searchText.toLowerCase()) ||
            item.district.toLowerCase().includes(this.searchText.toLowerCase()) ||
            item.phone.includes(this.searchText)
            // Add more fields as needed
        );
    }

    // Use the filtered data in your component
    get filteredList() {
        return this.applySearchFilter();
    }
  exportToExcel(): void {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date
        .getDate()
        .toString()
        .padStart(2, '0')}_${date
          .getHours()
          .toString()
          .padStart(2, '0')}-${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}-${date
              .getSeconds()
              .toString()
              .padStart(2, '0')}`;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.allfarmerlist);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // saveAs(data, 'contacts.xlsx');

    saveAs(data, `farmerlist_${dateString}.xlsx`);

  }
  async exportToPdf() {
    // Get the HTML table element by ID
    const tableElement = document.getElementById('exportTable');
  
    if (tableElement) {

      const tableHeaders = [  
      "Farmer  Name",
      "Distributor Name",
      // "Dist Middle Name",
      // "Dist Last  Name",
      "Aadhar Card",
      "Email",
      "Phone",
      "State",
      "District",
      "Taluka",
      "City",
      // "Address",
      // "Pincode",
      // "Crop",
      ];

      // Function to get all rows including those in hidden pages
      const getAllTableRows = async () => {
        const allRows = [];
        const totalRows = tableElement.querySelectorAll('tbody tr');
  
        for (let i = 0; i < totalRows.length; i++) {
          const row = totalRows[i];
          const rowData = Array.from(row.children).map(cell => cell.textContent);
        
          allRows.push(rowData);
        }
        
        return allRows;
      };
  
      // const tableHeaders = Object.keys(this.allfarmerlist[0]);
      const tableRows = this.allfarmerlist.map(row => Object.values(row));
      const specificData = tableRows.map(row => [row[1], row[4]+" "+row[5]+" "+row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13]]);
        // , row[15]]); // For example, extracting data from columns 1, 3, and 6
      console.log(tableRows);
      // Calculate dynamic widths based on content length
      const dynamicWidths = tableHeaders.map(header => ({
        width: 'auto',
        minCellWidth: header.length * 10, // Adjust this multiplier as needed
      }));
  
      // Set a specific width for the last column
      const specificWidth = [20, 20, 20, 20, 20, 20, 20];
  
      // Combine the dynamic widths and the specific width
      console.log('Dynamic Widths:', dynamicWidths.map(col => col.minCellWidth));

      // Adjust width for specific columns
      const columnWidths = ['auto', 'auto' ,'auto', 100, 'auto', 'auto', 'auto', 'auto', 'auto']; // Adjust width for column 3 (index 2) as 100
  
  
      // Create the document definition
      const documentDefinition = {
        pageSize: 'A4',
        pageMargins: [20, 20, 20, 20],
        pageOrientation: 'landscape', // Set layout to landscape
        content: [
          { text: 'Farmer List', style: 'header' },
          {
            table: {
              headerRows: 1,
              widths: columnWidths, // Set width for each column
              body: [tableHeaders, ...specificData],
              layout: 'lightHorizontalLines',
            },
          },
        ],
        styles: {
          header: {
            fontSize: 12,
            bold: true,
            margin: [0, 0, 0, 10],
          },
        },
      };
  
      // Generate the PDF
      pdfMake.createPdf(documentDefinition).download('farmerlist.pdf');
    } else {
      console.error('Table element not found.');
    }
  }



}
