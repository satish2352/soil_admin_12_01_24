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
  selector: 'app-farmerdashboardreport',
  templateUrl: './farmerdashboardreport.component.html',
  styleUrls: ['./farmerdashboardreport.component.css']
})
export class FarmerdashboardreportComponent implements OnInit {
  p: number = 1;
  allfarmerlist: any;
  id: any;
  id1: number;
  id2: number;
  id3: number;

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

    var data = {
      state: this.id,
      district: this.id1,
      taluka: this.id2,
      city: this.id3,
    }

    this.DashboardService.getFarmersDashReport(data).subscribe(res => {
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
                  'Email' : farmer.email ,
                  'Phone' : farmer.phone ,
                  'Aadhar Card' : farmer.aadharcard ,
                  'State' : farmer.state ,
                  'District' : farmer.district ,
                  'Taluka' : farmer.taluka ,
                  'City' : farmer.city ,
                  'Address' : farmer.address ,
                  'Pincode' : farmer.pincode ,
                  'Crop' : farmer.crop ,
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


}
