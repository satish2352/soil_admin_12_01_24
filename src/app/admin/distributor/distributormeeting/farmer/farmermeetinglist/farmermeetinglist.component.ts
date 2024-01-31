import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../../../distributor.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/helper.service';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import * as html2pdf from 'html2pdf.js';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

declare var $: any;
@Component({
  selector: 'app-farmermeetinglist',
  templateUrl: './farmermeetinglist.component.html',
  styleUrls: ['./farmermeetinglist.component.css']
})
export class FarmermeetinglistComponent implements OnInit {
  p: number = 1;
  alllist: any;
  allstate: any = [];
  alldist: any = [];
  allcity: any = [];
  alltaluka: any = [];
  formdatanew: any;
  farmerForm: FormGroup;
  id: any;
  id1: any;
  id2: any;
  id3: any;
  id4: any;
  data: any = '';
  data1: any;
  distributordetailsall: any;
  dataNew:any;

  constructor(public distributorService: DistributorService,
    public router: Router,
    private toastr: ToastrService,
    private HelperService: HelperService) { }

  ngOnInit(): void {

    this.getdistributor();
      setTimeout(() => {
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      }, 1000);
      
    this.getdata();


    this.farmerForm = new FormGroup({
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      taluka: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      dist_id: new FormControl('', [Validators.required]),
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
  // getDataByDist() {
  //   // Assuming you have a form group named 'yourForm' and a form control named 'dist_id'
  //   const selectedUserId = this.farmerForm.get('dist_id').value;
  //   console.log('Selected Distributor:', selectedUserId);
  // }

  getdata() {

    this.distributorService.getFarmerMeetingList(this.data).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
        // console.log(this.alllist);

      } else {
        this.alllist = [];
      }
      
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

        this.getFarmerMeetingListdata();

      });
    });

    this.farmerForm.get('district').valueChanges.subscribe(val => {
      this.HelperService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
        this.alltaluka = alltaluka['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.getFarmerMeetingListdata();
      });
    });

    this.farmerForm.get('taluka').valueChanges.subscribe(val => {
      this.HelperService.getCity({ taluka_id: val }).subscribe((allcity) => {
        this.allcity = allcity['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.getFarmerMeetingListdata();
      });
    });
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
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.alllist);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // saveAs(data, 'contacts.xlsx');

    saveAs(data, `farmer_${dateString}.xlsx`);

  }
  async exportToPdf() {
    // Get the HTML table element by ID
    const tableElement = document.getElementById('exportTable');

    if (tableElement) {
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

      const tableHeaders = Object.keys(this.alllist[0]);
      const tableRows = this.alllist.map(row => Object.values(row));

      // Calculate dynamic widths based on content length
      const dynamicWidths = tableHeaders.map(header => ({
        width: 'auto',
        minCellWidth: header.length * 3, // Adjust this multiplier as needed
      }));

      // Set a specific width for the last column
      const specificWidth = [10, 10, 20, 20, 20, 20, 20];

      // Combine the dynamic widths and the specific width
      console.log('Dynamic Widths:', dynamicWidths.map(col => col.minCellWidth));

      const columnWidths = [...dynamicWidths.map(col => col.minCellWidth), ...specificWidth];

      // Create the document definition
      const documentDefinition = {
        pageSize: 'A4',
        pageMargins: [20, 20, 20, 20],
        content: [
          { text: 'Export Table', style: 'header' },
          {
            table: {
              headerRows: 1,
              widths: columnWidths,
              body: [tableHeaders, ...tableRows],
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
      pdfMake.createPdf(documentDefinition).download('Farmer_meeting.pdf');
    } else {
      console.error('Table element not found.');
    }
  }


  getFarmerMeetingListdata() {

    this.formdatanew = this.farmerForm.value;
    this.id = this.formdatanew.state;
    this.id1 = this.formdatanew.district;
    this.id2 = this.formdatanew.taluka;
    this.id3 = this.formdatanew.city;
    this.id4 = this.formdatanew.dist_id;

    var data = {
      state: this.id,
      district: this.id1,
      taluka: this.id2,
      city: this.id3,
      dist_id: this.id4,
    }

    this.distributorService.getFarmerMeetingList(data).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = '';
        this.alllist = list['data'];
      } else {
        this.alllist =[];
      }

      if (list['error'] == true) {
        this.toastr.error("Something went wrong " + list['message']);
      }
    });

  }
  getdistributor() {
    var dataNew = {
      
    }
    
    this.distributorService.getDistributorList(dataNew).subscribe((data) => {
      this.distributordetailsall = data['data'];
      console.log('this.distributordetailsall', this.distributordetailsall);
    })
  }

  getDataByDist() {
    this.formdatanew = this.farmerForm.value;
    this.id = this.formdatanew.state;
    this.id1 = this.formdatanew.district;
    this.id2 = this.formdatanew.taluka;
    this.id3 = this.formdatanew.city;
    this.id4 = this.formdatanew.dist_id;

    var data = {
      state: this.id,
      district: this.id1,
      taluka: this.id2,
      city: this.id3,
      dist_id: this.id4,
    }

    this.distributorService.getFarmerMeetingList(data).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];

      } else {
        this.alllist = [];
      }
    });
  }



}
