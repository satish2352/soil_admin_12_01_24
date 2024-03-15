import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../order.service';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import 'jspdf-autotable';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  p: number = 1;
  orders: any = [];
  constructor(private os: OrderService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.os.getOrders().subscribe(res => {
      if (res['result']) {
        this.orders = res['data'];
      }
    });
  }

  editOrder(order_no, created_disctributor_id) {
    this.router.navigate(['/admin', 'order-details', order_no, created_disctributor_id]);
  }

  verifyOrder(order_no, created_disctributor_id) {
    this.os.verifyOrder(order_no, created_disctributor_id).subscribe(res => {
      if (res['result']) {
        this.toastr.success('Order verified successfully!');
        this.getOrders();
      } else {
        this.toastr.success(res['message']);
      }
    });
  }

  forwardOrder(order_no, created_disctributor_id) {
    this.os.forwardOrder(order_no, created_disctributor_id).subscribe(res => {
      if (res['result']) {
        this.toastr.success('Order forwared successfully!');
        this.getOrders();
      } else {
        this.toastr.success(res['message']);
      }
    });
  }

  deleteOrder(order_no, created_disctributor_id) {
    this.os.deleteOrder(order_no, created_disctributor_id).subscribe(res => {
      if (res['result']) {
        this.toastr.success('Order deleted successfully!');
        this.getOrders();
      } else {
        this.toastr.success(res['message']);
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

    saveAs(data, `allorder_${dateString}.xlsx`);

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
        "Order No",
        "From",
        "Date",
        "Amount",
        "	Payment Mode",
        "Status"

      ];
      // const tableRows = this.allfarmerlist.map(row => Object.values(row));
      const tableRows = this.orders.map(row => Object.values(row));
      const specificData = tableRows.map(row => [row[1], row[35] + " " + row[36] + " " + row[37], row[2], row[7], row[29], row[20],]);

      // const tableHeaders = Object.keys(this.orders[0]);

      // Calculate dynamic widths based on content length
      const dynamicWidths = tableHeaders.map(header => ({
        width: 'auto',
        minCellWidth: header.length * 10, // Adjust this multiplier as needed
      }));

      // Set a specific width for the last column
      const specificWidth = [20, 20, 20, 20, 20, 20, 20];
      const columnWidths = ['auto', 'auto', 'auto', 'auto', 'auto', 'auto']; // Adjust width for column 3 (index 2) as 100

      // Combine the dynamic widths and the specific width
      console.log('Dynamic Widths:', dynamicWidths.map(col => col.minCellWidth));


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
      pdfMake.createPdf(documentDefinition).download('allorder_.pdf');
    } else {
      console.error('Table element not found.');
    }
  }
}
