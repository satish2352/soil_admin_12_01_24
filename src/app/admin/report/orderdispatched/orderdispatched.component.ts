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
  selector: 'app-orderdispatched',
  templateUrl: './orderdispatched.component.html',
  styleUrls: ['./orderdispatched.component.css']
})
export class OrderdispatchedComponent implements OnInit {
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
    this.getOrderDispatched();
    this.formContent = new FormGroup({
      datefrom: new FormControl('', [Validators.required]),
      dateto: new FormControl('', [Validators.required])
    });
  }

  getOrderDispatched() {
    this.os.getOrderDispatched(null).subscribe(res => {
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


    this.os.getOrderDispatched(this.formContent.value).subscribe(res => {
      if (res['result']) {
        this.orders = res['data'];
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

  saveAs(data, `dispatch_${dateString}.xlsx`);

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

    


   0 // "id": 1,
   1 // "order_no": "202402201708419317",
    2// "order_date": "2024-02-20",
   3 // "order_created_by": "bsc",
    4// "created_disctributor_id": 73,
    5// "order_cerated_for": "distributor",
   6 // "order_cerated_for_id": 78,
    7// "created_disctributor_amount": "595.0",
   8 // "dispatched_to_created_disctributor_by_warehouse": "no",
   9 // "forwarded_fsc_amount": null,
   10 // "forwarded_bsc_id": 0,
   11 // "forwarded_bsc_amount": "105",
   12 // "dispatched_to_forwarded_bsc_by_warehouse": "no",
    13// "forwarded_dsc_id": 70,
   14 // "forwarded_dsc_amount": null,
   15 // "dispatched_to_forwarded_dsc_amount_by_warehouse": "no",
   16 // "account_approved": "yes",
   17 // "forward_to_warehouse": "yes",
   18 // "remark": null,
    19// "entry_by": "distributor",
    20// "order_dispatched": "yes",
   21 // "order_dispatched_date": "2024-02-20",
    22// "is_order_confirm_from_bsc": "yes",
  23  // "date_confirm_from_bsc": "2024-02-20 08:56:09",
   24 // "is_order_confirm_from_dsc": "yes",
    25// "date_confirm_from_dsc": "0000-00-00 00:00:00",
    // "is_order_confirm_from_dist": "no",
    // "date_confirm_from_dist": "0000-00-00 00:00:00",
    // "is_order_final_confirm": "yes",
   29 // "payment_mode": "online",
    // "address_one": "adress 1",
    // "address_two": "address teo",
    // "is_deleted": "no",
    // "created_at": "2024-02-20 08:55:17",
    // "updated_at": "2024-02-20 08:56:09",
   35 // "fname": "sarangi",
   36 // "mname": "manohar",
   37 // "lname": "mane"

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
      pageMargins: [20, 20, 20, 20],
      pageOrientation: 'landscape', // Set layout to landscape
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
    pdfMake.createPdf(documentDefinition).download('dispatch_.pdf');
  } else {
    console.error('Table element not found.');
  }
}
}
