import { Component, OnInit } from '@angular/core';
import { WebService } from "../../web.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as XLSX from 'xlsx';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import * as html2pdf from 'html2pdf.js';
// import * as jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
declare let $: any;
@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {
  [x: string]: any;
  p: number = 1;
  alllist: any = [];
  editid: any;
  formContent: FormGroup;
  submitted: boolean;
  datefrom: any;
  dateto: any;
  constructor(public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService
  ) { }


  get f() { return this.formContent.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.warning("Select Date");
      return;
    }
    this.webService.webCareerJobList(this.formContent.value).subscribe(datalist => {
      if (datalist['result'] == true) {
        this.alllist = datalist['data'];
      }
    });

  }
  ngOnInit(): void {
    this.formContent = new FormGroup({
      datefrom: new FormControl('', [Validators.required]),
      dateto: new FormControl('', [Validators.required]),
    });
    this.ngxService.start();
    this.webService.webCareerJobList(null).subscribe(datalist => {
      if (datalist['result'] == true) {
        this.alllist = datalist['data'];
        // this.alllist.sort((a,b)=>b.id - a.id)
      }
    });
    this.ngxService.stop();

    // $(document).ready(function () {
    //   setTimeout(() => {
    //     let table = $('#pagedatatable').DataTable({
    //       ordering: true,
    //       lengthChange: false,
    //       showNEntries: false,

    //       dom: 'Bfrtip',
    //       buttons: [
    //         //'copy', 'csv', 'excel', 'pdf', 'print'
    //         'excel', 'pdf'
    //       ]          
    //     })
    //   }, 4000)
    // })

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

    saveAs(data, `Job_${dateString}.xlsx`);

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
      const tableHeaders = [
        "Name",
        "Email",
        "Contact Number",
        "Qualification",
        "Resume",
        "Address"
      ];
      const tableRows = this.alllist.map(row => Object.values(row));
      const specificData = tableRows.map(row => [row[1], row[2], row[3], row[4], row[10], row[5]]);

      // const tableHeaders = Object.keys(this.alllist[0]);
      // const tableRows = this.alllist.map(row => Object.values(row));

      // Calculate dynamic widths based on content length
      const dynamicWidths = tableHeaders.map(header => ({
        width: 'auto',
        minCellWidth: header.length * 6, // Adjust this multiplier as needed
      }));

      // Set a specific width for the last column
      const specificWidth = [20, 20, 20, 20, 20, 20, 20];

      // Combine the dynamic widths and the specific width
      console.log('Dynamic Widths:', dynamicWidths.map(col => col.minCellWidth));

      // const columnWidths = [...dynamicWidths.map(col => col.minCellWidth), ...specificWidth];
      const columnWidths = ['auto', 150, 70, 'auto', 'auto', 'auto'];
      // Create the document definition
      const documentDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape', // Set layout to landscape
        pageMargins: [20, 20, 20, 20],
        content: [
          { text: 'Table Export Example', style: 'header' },
          {
            table: {
              headerRows: 1,
              widths: columnWidths,
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
      pdfMake.createPdf(documentDefinition).download('Career Job.pdf');
    } else {
      console.error('Table element not found.');
    }
  }
  // exportToPdf() {
  //   // Get the HTML table element by ID
  //   const tableElement = document.getElementById('exportTable');

  //   if (tableElement) {
  //     // Extract table headers and rows from the HTML table
  //     const tableHeaders = Array.from(tableElement.querySelectorAll('thead th')).map((header) => header.textContent);

  //     // Extract and map rows with IDs
  //     const tableRows = Array.from(tableElement.querySelectorAll('tbody tr')).map((row) => {
  //       const id = row.querySelector('id').textContent; // Replace '.id-column' with the actual class or selector for the ID column
  //       return { id: parseInt(id), cells: Array.from(row.children).map((cell) => cell.textContent) };
  //     });

  //     // Sort the rows based on the ID in descending order
  //     tableRows.sort((a, b) => a.id - b.id);

  //     // Create the document definition
  //     const documentDefinition = {
  //       content: [
  //         { text: 'Table Export Example', style: 'header' },
  //         {
  //           table: {
  //             headerRows: 1,
  //             body: [tableHeaders, ...tableRows.map((row) => row.cells)],
  //           },
  //         },
  //       ],
  //       styles: {
  //         header: {
  //           fontSize: 18,
  //           bold: true,
  //           margin: [0, 0, 0, 10],
  //         },
  //       },
  //     };

  //     // Generate the PDF
  //     pdfMake.createPdf(documentDefinition).download('Joblist.pdf');
  //   } else {
  //     console.error('Table element not found.');
  //   }
  // }

  // exportToPdf() {
  //   // Get the HTML table element by ID
  //   const tableElement = document.getElementById('exportTable');

  //   if (tableElement) {
  //     // Extract table headers and rows from the HTML table
  //     const tableHeaders = Array.from(tableElement.querySelectorAll('thead th')).map((header) => header.textContent);
  //     const tableRows = Array.from(tableElement.querySelectorAll('tbody tr')).map((row) =>
  //       Array.from(row.children).map((cell) => cell.textContent)
  //     );

  //     // Create the document definition
  //     const documentDefinition = {
  //       content: [
  //         { text: 'Table Export Example', style: 'header' },
  //         {
  //           table: {
  //             headerRows: 1,
  //             body: [tableHeaders, ...tableRows],
  //           },
  //         },
  //       ],
  //       styles: {
  //         header: {
  //           fontSize: 18,
  //           bold: true,
  //           margin: [0, 0, 0, 10],
  //         },
  //       },
  //     };

  //     // Generate the PDF
  //     pdfMake.createPdf(documentDefinition).download('Joblist.pdf');
  //   } else {
  //     console.error('Table element not found.');
  //   }
  // }
  // exportToPdf(): void {
  //   const date = new Date();
  //   const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
  //     .toString()
  //     .padStart(2, '0')}-${date
  //     .getDate()
  //     .toString()
  //     .padStart(2, '0')}_${date
  //     .getHours()
  //     .toString()
  //     .padStart(2, '0')}-${date
  //     .getMinutes()
  //     .toString()
  //     .padStart(2, '0')}-${date
  //     .getSeconds()
  //     .toString()
  //     .padStart(2, '0')}`;

  //   const element: HTMLElement | null = document.getElementById('exportTable');

  //   if (element) {
  //     html2canvas(element).then((canvas) => {
  //       const pdf = new jsPDF.jsPDF();
  //       const imgData = canvas.toDataURL('image/png');

  //       pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // Adjust size as needed
  //       pdf.save(`Job_${dateString}.pdf`);
  //     });
  //   }
  // }


  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.deleteItem(id);
    }
  }
  

  deleteItem(id) {
    var obj = {
      id: id
    };
    this.ngxService.start();
    this.webService.webCareerJobDelete(obj).subscribe(res => {
      if (res['result'] == true) {
        this.toastr.success("Job deleted successfully!");
        this.router.navigate(['/admin', 'redirectself'], { state: ['/admin', 'webcareerjob-list'] });
      }
      if (res['error'] == true) {
        this.toastr.error("Something went wrong " + res['message']);
      }
    });
    this.ngxService.stop();
  }

  getForEdit(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'webcareerjob-view', this.editid]);
  }

  getForUpdate(event) {
    this.editid = event;
    this.router.navigate(['/admin', 'webcareerjob-update', this.editid]);
  }
}

