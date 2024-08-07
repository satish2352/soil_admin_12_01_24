import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service'


import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


import 'jspdf-autotable';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-distributordashboardreport',
  templateUrl: './distributordashboardreport.component.html',
  styleUrls: ['./distributordashboardreport.component.css']
})
export class DistributordashboardreportComponent implements OnInit {
  p: number = 1;
  allfarmerlist: any;
  id: any;
  id1: number;
  id2: number;
  id3: number;
  dist_type: number;

  constructor(
    private router: Router,
    private DashboardService: DashboardService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.getFarmers();
  }

  getFarmers() {

    this.id = +this.route.snapshot.paramMap.get('id');
    this.id1 = +this.route.snapshot.paramMap.get('id1');
    this.id2 = +this.route.snapshot.paramMap.get('id2');
    this.id3 = +this.route.snapshot.paramMap.get('id3');
    this.dist_type = +this.route.snapshot.paramMap.get('id4');

    var data = {
      state: this.id,
      district: this.id1,
      taluka: this.id2,
      city: this.id3,
      dist_type: this.dist_type,
    }

    this.DashboardService.getDistDashReport(data).subscribe(res => {
      if (res['result']) {
        this.allfarmerlist = res['data'];
        console.log(this.allfarmerlist);
        // setTimeout(() => {
        //   let elems = document.querySelectorAll('select');
        //   let instances = M.FormSelect.init(elems);
        // }, 1000);
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


              const updatedFarmerListFinal = []

              const updatedFarmerList = this.allfarmerlist.map(farmer => {
                updatedFarmerListFinal.push( { 
                  'Farmer  Name' : farmer.fname + " " + farmer.mname  + " " +farmer.lname,
                  // 'Distributor  Name' : farmer.dfname + " " + farmer.dmname  + " " +farmer.dlname,
                  'Email' : farmer.email ,
                  'Phone' : farmer.phone ,
                  'State' : farmer.state ,
                  'District' : farmer.district ,
                  'Taluka' : farmer.taluka ,
                  'City' : farmer.city ,
                  'Address' : farmer.address ,
                  'Pincode' : farmer.pincode ,
                });
                return updatedFarmerListFinal;
              });
            

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(updatedFarmerListFinal);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // saveAs(data, 'contacts.xlsx');

    saveAs(data, `farmerlist_${dateString}.xlsx`);

  }

  


  async exportToPdf() {
    console.log(" I am here");
    // Get the HTML table element by ID
    const tableElement = document.getElementById('pagedatatable');

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
        "User Name / Password",
        "Contact Number",//11
        "State",//1
        "District",//2
        "Taluka",//3
        "Village",//4
        "User Type"   //54
      ];


     
      const tableRows = this.allfarmerlist.map(row => Object.values(row));
      const specificData = tableRows.map(row => [row[3] + " " + row[4] + " " + row[5], row[6] + "/" + row[17], row[7], row[9], row[10], row[11], row[12], row[22]]);

      // Calculate dynamic widths based on content length
      const dynamicWidths = tableHeaders.map(header => ({
        width: 'auto',
        height: 'auto',
        minCellWidth: header.length * 8, // Adjust this multiplier as needed
      }));

      // const specificWidth = [15, 15, 15, 15, 15, 15, 15, 15];      
      const specificWidth = ['auto', 65, 95, 95, 95, 95, 'auto', 'auto'];


      const documentDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape', // Set layout to landscape
        pageMargins: [10, 10, 10, 10],
        content: [
          { text: 'Distributor List', style: 'header' },
          {
            table: {
              headerRows: 1,
              widths: specificWidth,
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
      pdfMake.createPdf(documentDefinition).download('Distributor List.pdf');
    } else {
      console.error('Table element not found.');
    }
  }


}
