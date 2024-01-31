import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DistributorService } from 'src/app/admin/distributor/distributor.service';

import { ReportService } from '../../report/report.service';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import 'jspdf-autotable';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.component.html',
  styleUrls: ['./salesreport.component.css']
})
export class SalesreportComponent implements OnInit,AfterViewInit {
  submitted: boolean = false;
  formContent: FormGroup;
  p: number = 1;
  orders: any = [];
  totalamount: any;
  datefrom: any;
  dateto: any;
  disctributor_id: any;
  distributordetailsall: any;
  totalorder: any;
  data: any;
  selectedDistributor: any;
  dataNew:any;

  constructor(private distributorService: DistributorService, private os: ReportService, private router: Router, private toastr: ToastrService, private fb: FormBuilder,) { }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    
    this.formContent = new FormGroup({
      datefrom: new FormControl('', [Validators.required]),
      dateto: new FormControl('', [Validators.required]),
      dist_id: new FormControl('',[])
    });
    var dataNew = {
      
    }
    
    this.distributorService.getDistributorList(dataNew).subscribe(distributordetailsall => {
      this.distributordetailsall = distributordetailsall['data'];
    });
    this.getOrders();
    // this.getdistributor();

    setTimeout(() => {
      let elems = document.querySelectorAll('select');
      let instances = M.FormSelect.init(elems);
    }, 1000);

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
    // Assuming you have a form group named 'yourForm' and a form control named 'dist_id'
    const selectedUserId = this.formContent.get('dist_id').value;
    console.log('Selected Distributor:', selectedUserId);

    
    this.os.getOrders(this.formContent.value).subscribe(res => {
      if (res['result']) {
        this.orders = res['data'];
        this.totalamount = res['totalamount'];
        this.datefrom = res['datefrom'];
        this.dateto = res['dateto'];
        this.totalorder = res['totalorder'];
      }
    });
  }
  

  getOrders() {
    this.os.getOrders(null).subscribe(res => {
      if (res['result']) {
        this.orders = res['data'];
        this.totalamount = res['totalamount'];
        this.datefrom = res['datefrom'];
        this.dateto = res['dateto'];
        this.totalorder = res['totalorder'];

      }
    });
  }

  get f() { return this.formContent.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.warning("Select Date");
      return;
    }


    this.os.getOrders(this.formContent.value).subscribe(res => {
      if (res['result']) {
        this.orders = res['data'];
        this.totalamount = res['totalamount'];
        this.datefrom = res['datefrom'];
        this.dateto = res['dateto'];
        this.totalorder = res['totalorder'];
      }
    });
  }


  // Define a variable to keep track of the current sorting column and direction
  sortColumn: string = '';
  sortDirection: string = 'asc'; // or 'desc'

  // Function to handle sorting
  sortTable(column: string) {
    if (column === this.sortColumn) {
      // If the same column is clicked, reverse the sorting direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a new column is clicked, set the sorting column and direction
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Perform the sorting based on the selected column and direction
    this.orders.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (valA < valB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valA > valB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
  getArrowClass(column: string): string {
    if (column === this.sortColumn) {
      return this.sortDirection === 'asc' ? 'arrow-up' : 'arrow-down';
    }
    return '';
  }

  editOrder(order_no, created_disctributor_id) {
    this.router.navigate(['/admin', 'order-details', order_no, created_disctributor_id]);
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
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.orders);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // saveAs(data, 'contacts.xlsx');

    saveAs(data, `sales_${dateString}.xlsx`);

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

      const tableHeaders = Object.keys(this.orders[0]);
      const tableRows = this.orders.map(row => Object.values(row));

      // Calculate dynamic widths based on content length
      const dynamicWidths = tableHeaders.map(header => ({
        width: 'auto',
        minCellWidth: header.length * 7, // Adjust this multiplier as needed
      }));

      // Set a specific width for the last column
      const specificWidth = [20, 20, 20, 20, 20, 20, 20];

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
      pdfMake.createPdf(documentDefinition).download('sales.pdf');
    } else {
      console.error('Table element not found.');
    }
  }

}


