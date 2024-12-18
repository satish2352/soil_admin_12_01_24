import { Component, OnInit } from '@angular/core';
import { WebService } from '../../web.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DistributorService } from '../../../distributor/distributor.service';
import * as XLSX from 'xlsx';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import * as html2pdf from 'html2pdf.js';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HelperService } from 'src/app/helper.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { log } from 'console';
declare let $: any;
@Component({
  selector: 'app-careerdistributorlist',
  templateUrl: './careerdistributorlist.component.html',
  styleUrls: ['./careerdistributorlist.component.css'],
})
export class CareerdistributorlistComponent implements OnInit {
  p: number = 1;
  alllist: any = [];
  editid: any;
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
  distributor: any;
  filteredDistributor: any;
  dataNew: any;
  constructor(
    public webService: WebService,
    public router: Router,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    public distributorService: DistributorService,
    private HelperService: HelperService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();

    var obj = {};

    this.webService.webCareerDistList(obj).subscribe((datalist) => {
      if (datalist['result'] == true) {
        this.alllist = datalist['data'];
      }
    });
    this.ngxService.stop();

    this.farmerForm = new FormGroup({
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      taluka: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      created_disctributor_id: new FormControl('', [Validators.required]),
    });
    this.formControlValueChanges();

    this.HelperService.getState().subscribe((allstate) => {
      this.allstate = allstate['data'];
      setTimeout(() => {
        let elems = document.querySelectorAll('select');
        let instances = M.FormSelect.init(elems);
      }, 1000);
    });
    this.fetchDistributorList();
    this.subscribeToFormChanges();
    // this.fetchDistributorList();

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

  // exportToExcel(): void {
  //   const date = new Date();
  //   const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
  //     .toString()
  //     .padStart(2, '0')}-${date
  //       .getDate()
  //       .toString()
  //       .padStart(2, '0')}_${date
  //         .getHours()
  //         .toString()
  //         .padStart(2, '0')}-${date
  //           .getMinutes()
  //           .toString()
  //           .padStart(2, '0')}-${date
  //             .getSeconds()
  //             .toString()
  //             .padStart(2, '0')}`;
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.alllist);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //   // saveAs(data, 'contacts.xlsx');

  //   saveAs(data, `career_${dateString}.xlsx`);

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
  //       pdf.save(`career_${dateString}.pdf`);
  //     });
  //   }
  // }
  exportToExcel(): void {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}_${date
      .getHours()
      .toString()
      .padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}-${date
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

    // Create a copy of alllist and add sr.no
    const modifiedList = this.alllist.map((item, index) => ({
      ...item,
      'sr.no': index + 1,
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(modifiedList);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(data, `career_${dateString}.xlsx`);
  }

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
  //     pdfMake.createPdf(documentDefinition).download('Career_dist.pdf');
  //   } else {
  //     console.error('Table element not found.');
  //   }
  // }
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
          const rowData = Array.from(row.children).map(
            (cell) => cell.textContent
          );
          allRows.push(rowData);
        }

        return allRows;
      };

      //   "id": 16,
      //   "list_data_status": "0",
      //   "list_data_read": "n",
      //   3"fname": "Nand",
      //   "mname": "Sh",
      //  5 "lname": "Wagh",
      //   6"email": "nandonlinework8954@gmail.com",
      //   7"phone": "7840904957",
      //   8"alternate_mobile": "9898989899",
      //   "state": "Bihar",
      //   "district": "Begusarai",
      //   "taluka": "Chandragiri",
      //   "city": "Dungra",
      //   "password": "434343",
      //   "visible_password": null,
      //   "user_type": "fsc",
      //   "is_deleted": "no",
      //   "active": "no",
      //   "remember_token": null,
      //   "is_verified": "0",
      //   "aadhar_card_image_front": "https:\/\/finalapi.soilchargertechnology.com\/public\/uploads\/distributor\/frontdistributorown\/16_aadhar_card_image_front.PNG",
      //   "aadhar_card_image_back": "https:\/\/finalapi.soilchargertechnology.com\/public\/uploads\/distributor\/frontdistributorown\/16_aadhar_card_image_back.PNG",
      //   "pan_card": "https:\/\/finalapi.soilchargertechnology.com\/public\/uploads\/distributor\/frontdistributorown\/16_pan_card.PNG",
      //   "light_bill": "https:\/\/finalapi.soilchargertechnology.com\/public\/uploads\/distributor\/frontdistributorown\/16_light_bill.PNG",
      //   "shop_act_image": "https:\/\/finalapi.soilchargertechnology.com\/public\/uploads\/distributor\/frontdistributorown\/16_shop_act_image.PNG",
      //   "product_purchase_bill": "https:\/\/finalapi.soilchargertechnology.com\/public\/uploads\/distributor\/frontdistributorown\/16_product_purchase_bill.PNG",
      //   "business_address": "Shree niwas, plot no 41\nsuyog colony, sakora road",
      //   "business_state": "109502",
      //   "business_district": "137301",
      //   "business_tuluka": "137737",
      //   "business_village": "62298",
      //   "where_open_shop": "3",
      //   "used_sct": "no",
      //   "why_want_take_distributorship": "gghh",
      //   "distributorship_exerience": "hghb",
      //   "experience_farm_garder": "hgj",
      //   "goal": "bbj",
      //   "geolocation": null,
      //   "added_by": "superadmin",
      //   "devicetoken": null,
      //   "devicetype": null,
      //   "devicename": null,
      //   "deviceid": null,
      //   "logintime": null,
      //   "created_by": null,
      //   "created_on": "2021-11-27 13:09:44",
      //   "updated_on": null

      const tableHeaders = [
        'Name', //789
        'Email',
        'Phone',
        'Contact Number', //11
        'State', //1
        'District', //2
        'Taluka', //3
        'Village', //4
        'Date', //51
      ];
      const tableRows = this.alllist.map((row) => Object.values(row));
      const specificData = tableRows.map((row) => [
        row[3] + ' ' + row[4] + ' ' + row[5],
        row[6],
        row[7],
        row[8],
        row[9],
        row[10],
        row[11],
        row[12],
        row[45],
      ]);
      // , row[0], row[1], row[2], row[3], row[4], row[52]]);

      // const tableHeaders = Object.keys(this.alllist[0]);
      // const tableRows = this.alllist.map(row => Object.values(row));

      // Calculate dynamic widths based on content length
      const dynamicWidths = tableHeaders.map((header) => ({
        width: 'auto',
        minCellWidth: header.length * 7, // Adjust this multiplier as needed
      }));

      // Set a specific width for the last column
      const specificWidth = [20, 20, 20, 20, 20, 20, 20];

      // Combine the dynamic widths and the specific width
      console.log(
        'Dynamic Widths:',
        dynamicWidths.map((col) => col.minCellWidth)
      );
      const columnWidths = [
        'auto',
        'auto',
        'auto',
        'auto',
        45,
        45,
        45,
        45,
        'auto',
      ]; //, 'auto', 'auto', 'auto','auto', 'auto', 'auto'
      // const columnWidths = [...dynamicWidths.map(col => col.minCellWidth), ...specificWidth];

      // Create the document definition
      const documentDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [20, 20, 20, 20],
        content: [
          { text: 'Career Distributor', style: 'header' },
          {
            table: {
              headerRows: 1,
              widths: columnWidths,
              heights: 50,
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
      pdfMake.createPdf(documentDefinition).download('career_dist.pdf');
    } else {
      console.error('Table element not found.');
    }
  }

  deleteItem(id) {
    var obj = {
      id: id,
    };
    this.ngxService.start();
    this.webService.webVideoDelete(obj).subscribe((res) => {
      if (res['result'] == true) {
        this.toastr.success('Video deleted successfully!');
        this.router.navigate(['/admin', 'redirectself'], {
          state: ['/admin', 'webvideo-list'],
        });
      }
      if (res['error'] == true) {
        this.toastr.error('Something went wrong ' + res['message']);
      }
    });
    this.ngxService.stop();
  }

  getForView(event) {
    // this.distributorService.webFrontGetByIdForEdit(obj).subscribe(res=>{
    //   if (res['result']== true) {
    this.router.navigate(['/admin', 'webcareerdist-view', event]);
    //   }
    //  });
  }

  isValidPhotopath(path: string): boolean {
    return /\d/.test(path); // Check if the path contains any digits
  }

  getForUpdate(event) {
    var obj = {
      id: event,
    };

    this.distributorService.webFrontGetByIdForEdit(obj).subscribe((res) => {
      if (res['result'] == true) {
        this.router.navigate(['/admin', 'webcareerdist-update'], {
          state: res['data'],
        });
      }
    });
  }

  formControlValueChanges() {
    this.farmerForm.get('state').valueChanges.subscribe((val) => {
      this.HelperService.getDist({ state_id: val }).subscribe((alldist) => {
        this.alldist = alldist['data'];

        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);

        this.getCareerDistributorListdata();
      });
    });

    this.farmerForm.get('district').valueChanges.subscribe((val) => {
      this.HelperService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
        this.alltaluka = alltaluka['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.getCareerDistributorListdata();
      });
    });

    this.farmerForm.get('taluka').valueChanges.subscribe((val) => {
      this.HelperService.getCity({ taluka_id: val }).subscribe((allcity) => {
        this.allcity = allcity['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.getCareerDistributorListdata();
      });
    });

    // this.distributorService.getDistributorList().subscribe((allsitributor)=>{
    //   this.distributor =allsitributor['data']
    //   setTimeout(() => {
    //     let elems = document.querySelectorAll('select');
    //     let instances = M.FormSelect.init(elems);
    //   }, 1000);
    //   this.getCareerDistributorListdata();
    // });
  }
  subscribeToFormChanges(): void {
    this.farmerForm
      .get('created_disctributor_id')
      .valueChanges.subscribe((val) => {
        // Filter the data based on the selected distributor id
        this.filterDataByDistributor(val);
      });
  }

  fetchDistributorList(): void {
    var dataNew = {};

    this.distributorService.getDistributorList(dataNew).subscribe(
      (response) => {
        this.distributor = response['data'];
        this.filteredDistributor = this.distributor; // Initialize the filtered list
      },
      (error) => {
        console.error('Error fetching distributor list:', error);
      }
    );
  }

  filterDataByDistributor(selectedDistributorId: any): void {
    // Filter the data based on the selected distributor id
    if (selectedDistributorId) {
      this.filteredDistributor = this.distributor.filter(
        (dist) => dist.user_id === selectedDistributorId
      );
    } else {
      // If no distributor is selected, show all data
      this.filteredDistributor = this.distributor;
    }
  }

  getCareerDistributorListdata() {
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
      added_by: this.id4,
    };

    this.webService.webCareerDistList(data).subscribe((datalist) => {
      if (datalist['result'] == true) {
        this.alllist = datalist['data'];
      }

      if (datalist['error'] == true) {
        this.toastr.error('Something went wrong ' + datalist['message']);
      }
    });
  }
}
