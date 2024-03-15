import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../report/report.service';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import 'jspdf-autotable';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-ordernotdispatched',
  templateUrl: './ordernotdispatched.component.html',
  styleUrls: ['./ordernotdispatched.component.css']
})
export class OrdernotdispatchedComponent implements OnInit {
  submitted: boolean = false;
  formContent: FormGroup;
  p: number = 1;
  orders: any = [];
  totalamount: any;
  datefrom: any;
  dateto: any;
  totalorder: any;
  constructor(private os: ReportService, private router: Router, private toastr: ToastrService, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.getOrderNotDispatched();
    this.formContent = new FormGroup({
      datefrom: new FormControl('', [Validators.required]),
      dateto: new FormControl('', [Validators.required])
    });
  }

  getOrderNotDispatched() {
    this.os.getOrderNotDispatched(null).subscribe(res => {
      if (res['result']) {
        this.orders = res['data'];
        this.orders.sort((a, b) => b.id - a.id);
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


    this.os.getOrderNotDispatched(this.formContent.value).subscribe(res => {
      if (res['result']) {
        this.orders = res['data'];
        this.orders.sort((a, b) => b.id - a.id);
        this.totalamount = res['totalamount'];
        this.datefrom = res['datefrom'];
        this.dateto = res['dateto'];
        this.totalorder = res['totalorder'];
      }
    });
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

    saveAs(data, `notdispatch_${dateString}.xlsx`);

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

    //  0 "id": 4,
    //   1"order_no": "202402201708419635",
    //   2"order_date": "2024-02-20",
    //   3"order_created_by": "dsc",
    //   4"created_disctributor_id": 70,
    //   5"order_cerated_for": "distributor",
    //   6"order_cerated_for_id": 0,
    //   7"created_disctributor_amount": "1722.0",
    //   8"dispatched_to_created_disctributor_by_warehouse": "no",
    //   9"forwarded_fsc_amount": null,
    //   10"forwarded_bsc_id": 0,
    //   "11forwarded_bsc_amount": null,
    //   12"dispatched_to_forwarded_bsc_by_warehouse": "no",
    //   13"forwarded_dsc_id": 0,
    //  14 "forwarded_dsc_amount": "126",
    //   15"dispatched_to_forwarded_dsc_amount_by_warehouse": "no",
    //   "account_approved": "yes",
    //   "forward_to_warehouse": "no",
    //   "remark": null,
    //   "entry_by": "distributor",
    //   20"order_dispatched": "no",
    //   "order_dispatched_date": null,
    //   "is_order_confirm_from_bsc": "no",
    //   23"date_confirm_from_bsc": "2024-02-20 09:00:46",
    //   "is_order_confirm_from_dsc": "yes",
    //   "date_confirm_from_dsc": "0000-00-00 00:00:00",
    //   "is_order_confirm_from_dist": "yes",
    //   "date_confirm_from_dist": "0000-00-00 00:00:00",
    //   "is_order_final_confirm": "yes",
    //   29"payment_mode": "cod",
    //  30 "address_one": null,
    //   "address_two": null,
    //   "is_deleted": "no",
    //   "created_at": "2024-02-20 09:00:35",
    //   "updated_at": "2024-02-20 09:00:46",
    //  35 "fname": "rohini",
    //   36"mname": "Mahesh",
    //  37 "lname": "gaikwad"
      const tableHeaders = [
        "Order No",
        "From",
        "Date",
        "Amount",
        // "Payment Mode",
        // "Status",
        // "Dispatched Date"
  
      ];
      const tableRows = this.orders.map(row => Object.values(row));
      const specificData = tableRows.map(row => [row[1], row[35]+" "+row[36]+" "+row[37], row[2], row[7]]);
  
      // const tableHeaders = Object.keys(this.orders[0]);
      // const tableRows = this.orders.map(row => Object.values(row));
  
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
      const columnWidths = ['auto', 'auto', 'auto', 'auto'];
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
      pdfMake.createPdf(documentDefinition).download('notdispatch_.pdf');
    } else {
      console.error('Table element not found.');
    }
  }

}
