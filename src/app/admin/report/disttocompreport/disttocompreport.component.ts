import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../report/report.service';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { DistributorService } from '../../distributor/distributor.service';
import { Console } from 'console';


@Component({
  selector: 'app-disttocompreport',
  templateUrl: './disttocompreport.component.html',
  styleUrls: ['./disttocompreport.component.css']
})
export class DisttocompreportComponent implements OnInit {
  submitted: boolean = false;
  formContent: FormGroup;
  p: number = 1;
  orders: any = [];
  totalamount: any;
  datefrom: any;
  dateto: any;
  totalorder: any;
  distributordetailsall: any;
  dataNew: any;
  allfarmerlist: any;

  constructor(private os: ReportService, private distributorService: DistributorService, private router: Router, private toastr: ToastrService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.getOrders();
    this.getdistributor();
    this.formContent = new FormGroup({
      datefrom: new FormControl('', [Validators.required]),
      dateto: new FormControl('', [Validators.required]),
      dist_id: new FormControl('', [])
    });
    setTimeout(() => {
      let elems = document.querySelectorAll('select');
      let instances = M.FormSelect.init(elems);
    }, 1000);
  }
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

  getOrders() {
    this.os.getOrders1(null).subscribe(res => {
      if (res['result']) {
        this.orders = res['data'];
        this.totalamount = res['totalamount'];
        this.datefrom = res['datefrom'];
        this.dateto = res['dateto'];
        this.totalorder = res['totalorder'];
        this.orders.sort((a, b) => b.id - a.id);
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


    this.os.getOrders1(this.formContent.value).subscribe(res => {
      if (res['result']) {
        this.orders = res['data'];
        this.totalamount = res['totalamount'];
        this.datefrom = res['datefrom'];
        this.dateto = res['dateto'];
        this.totalorder = res['totalorder'];
      }
    });
  }

  // editOrder(id) {
  //   this.router.navigate(['/admin', 'viewreportsales', id,]);
  // }
  editOrder(order_no, created_disctributor_id) {
    this.router.navigate(['/admin', 'viewreportsales', order_no, created_disctributor_id]);
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

    saveAs(data, `dist_${dateString}.xlsx`);

  }
  async exportToPdf() {
    // Get the HTML table element by ID
    const tableElement = document.getElementById('exportTable');

    if (tableElement) {

      const tableHeaders = [
        "Order No",
        "From",
        "Date",
        "Amount",
        "District",

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
        //   0"id": 21,
        //  1 "order_no": "202402201708412094",
        //   2"order_date": "2024-02-20",
        //  3 "order_created_by": "dsc",
        //   4"created_disctributor_id": 70,
        //   5"created_disctributor_amount": "2800.0",
        //  6 "dispatched_to_created_disctributor_by_warehouse": "no",
        //   7"forwarded_bsc_id": 0,
        //   8"forwarded_bsc_amount": null,
        //   9"dispatched_to_forwarded_bsc_by_warehouse": "no",
        //   10"forwarded_dsc_id": 0,
        //   11"forwarded_dsc_amount": null,
        //  12 "dispatched_to_forwarded_dsc_amount_by_warehouse": "no",
        //   13"account_approved": "no",
        //   14"forward_to_warehouse": "no",
        //   15"entry_by": "distributor",
        //   16"order_dispatched": "no",
        //   17"order_dispatched_date": null,
        //   18"is_deleted": "no",
        //  19 "created_at": "2024-02-20 06:54:54",
        //  20 "updated_at": "2024-02-20 06:54:54",
        //  21 "district": "Nendwan bk",
        //   22"fname": "rohini",
        //   23"mname": "Mahesh",
        //  24 "lname": "gaikwad"
      };



      // const tableHeaders = Object.keys(this.orders[0]);
      // const tableRows = this.allfarmerlist.map(row => Object.values(row));
      const tableRows = this.orders.map(row => Object.values(row));
      console.log('this.orders')
      console.log(this.orders)
      const specificData = tableRows.map(row => [row[1]
        , row[22] + " " + row[23] + " " + row[24], row[19], row[5], row[21]]);
      console.log(specificData);
      // Calculate dynamic widths based on content length
      const dynamicWidths = tableHeaders.map(header => ({
        width: 'auto',
        minCellWidth: header.length * 10, // Adjust this multiplier as needed
      }));

      // Set a specific width for the last column
      const specificWidth = [20, 20, 20, 20, 20, 20, 20];

      // Combine the dynamic widths and the specific width
      console.log('Dynamic Widths:', dynamicWidths.map(col => col.minCellWidth));

      // const columnWidths = [...dynamicWidths.map(col => col.minCellWidth), ...specificWidth];
      const columnWidths = ['auto','auto','auto','auto','auto']; // Adjust width for column 3 (index 2) as 100
      // Create the document definition
      const documentDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape', // Set layout to landscape
        pageMargins: [20, 20, 20, 20],
        content: [
          { text: 'Export Table', style: 'header' },
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
      pdfMake.createPdf(documentDefinition).download('dist.pdf');
    } else {
      console.error('Table element not found.');
    }
  }
}


