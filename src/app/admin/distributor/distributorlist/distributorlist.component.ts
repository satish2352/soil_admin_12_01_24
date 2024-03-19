import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../distributor.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HelperService } from '../../../helper.service';
@Component({
  selector: 'app-distributorlist',
  templateUrl: './distributorlist.component.html',
  styleUrls: ['./distributorlist.component.css']
})
export class DistributorlistComponent implements OnInit {
  p: number = 1;
  alllist: any = [];
  formdatanew: any;
  farmerForm: FormGroup;
  id: any;
  id1: any;
  id2: any;
  id3: any;
  alldist: any;
  allcity: any;
  alltaluka: any;
  allstate: any;
  // paginationActive: boolean;
  constructor(public distributorService: DistributorService,
    private HelperService: HelperService,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.farmerForm = new FormGroup({
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      taluka: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    });
    this.formControlValueChanges();

    this.getDistributors();


    // $(document).ready(function () {
    //   setTimeout(() => {
    //     let table = $('#pagedatatable').DataTable({
    //       ordering: true,
    //       lengthChange: false,
    //       showNEntries: false,
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
  // onPageChange(){
  //   this.paginationActive=false;
  // }

  searchText: string = '';

  // Create a function to filter the data based on the search criteria
  applySearchFilter() {
    // If the search text is empty, return the original data
    if (!this.searchText.trim()) {
      return this.alllist;
    }

    // Use the filter method to match the search criteria
    return this.alllist.filter(item =>
      item.fname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.lname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.state.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.district.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.taluka.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.city.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.user_type.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.phone.includes(this.searchText)
      // Add more fields as needed
    );
  }

  // Use the filtered data in your component
  get filteredList() {
    return this.applySearchFilter();
  }

  // ... (your existing component code)
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

    saveAs(data, `dist_${dateString}.xlsx`);

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



      //  1 // "state": "Goa",
      //   2// "district": "North goa",
      //   3// "taluka": "Satari",
      //   4// "city": "Birondem",
      //   5// "id": 150,
      //   5// "user_id": 245,
      //   6// "name": null,
      //   7// "fname": "testing",
      //   8// "mname": "testing",
      //   9// "lname": "testing", 9
      // 10// "email": "testingfast@gmail.com",
      //   10// "phone": "9835428458",
      //  11 // "aadharcard": null,
      //   // "address": "yyyy",
      //   // "pincode": "422101",
      //   // "crop": null,
      //   // "acre": null,
      //   // "password": "12345678", 17
      //   // "visible_password": null,
      //   // "photo": null,
      //   // "is_sms_send": "0",
      //   // "notification": "0",
      //  21 // "user_type": "fsc",
      //  22 // "shop_name": null,
      //   // "total_area": null,
      //   // "other_bussiness": null,
      //   // "is_deleted": "no",
      //   // "active": "yes",
      //  27 // "remember_token": null,
      //   // "otp": 0,
      //   // "is_verified": "0",
      //30   // "occupation": "temp",
      //   // "education": "hhhs",
      //   // "exp_in_agricultural": "temp",
      //   // "other_distributorship": "0",
      //   // "reference_from": "74",
      //   // "shop_location": "jhdh",
      //   // "aadhar_card_image_front": "https:\/\/finalapi.soilchargertechnology.com\/public\/uploads\/distributor\/frontdistributorown\/245_aadhar_card_image_front.jpg",
      //   // "aadhar_card_image_back": "https:\/\/finalapi.soilchargertechnology.com\/public\/uploads\/distributor\/frontdistributorown\/245_aadhar_card_image_back.jpg",
      //   // "pan_card": "https:\/\/finalapi.soilchargertechnology.com\/public\/uploads\/distributor\/frontdistributorown\/245_pan_card.jpg",
      //   // "light_bill": "https:\/\/finalapi.soilchargertechnology.com\/public\/uploads\/distributor\/frontdistributorown\/245_light_bill.jpg",
      //   // "shop_act_image": "https:\/\/finalapi.soilchargertechnology.com\/public\/uploads\/distributor\/frontdistributorown\/245_shop_act_image.jpg",
      //   // "product_purchase_bill": "https:\/\/finalapi.soilchargertechnology.com\/public\/uploads\/distributor\/frontdistributorown\/245_product_purchase_bill.jpg",
      //   // "geolocation": null,
      //  43 // "added_by": "74",
      //   // "devicetoken": null,
      //   // "devicetype": null,
      //   // "devicename": null,
      //   // "deviceid": null,
      //   // "logintime": null,
      //   // "created_by": null,
      //   // "created_on": "2024-03-09 11:11:53",
      //   // "is_block": "no",
      //   // "is_approved": "yes",
      //  53 // "new_user_type": "",
      //   // "new_user_promote": ""




      const tableHeaders = [
        "Name",
        "User Name / Password",
        "Contact Number",//11
        "State",//1
        "District",//2
        "Taluka",//3
         "Village",//4
         "User Type"   //54
        //"Date", //51


      ];
      // const tableRows = this.orders.map(row => Object.values(row));

      // const tableHeaders = Object.keys(this.alllist[0]);
      const tableRows = this.alllist.map(row => Object.values(row));
      const specificData = tableRows.map(row => [row[7] + " " + row[8] + " " + row[9], row[10] + "/" + row[17], row[11], row[0], row[1], row[2], row[3], row[22]]);
      // , row[11], row[51], row[1], , row[2], , row[3], , row[4], row[54],]);

      // Calculate dynamic widths based on content length
      const dynamicWidths = tableHeaders.map(header => ({
        width: 'auto',
        height: 'auto',
        minCellWidth: header.length * 8, // Adjust this multiplier as needed
      }));

      // Set a specific width for the last column
      const specificWidth = [20, 20, 20, 20, 20, 20, 20];

      // Combine the dynamic widths and the specific width
      console.log('Dynamic Widths:', dynamicWidths.map(col => col.minCellWidth));

      // const columnWidths = [...dynamicWidths.map(col => col.minCellWidth), ...specificWidth];
      const columnWidths = ['auto', 'auto', 'auto', 'auto', 'auto', 'auto','auto','auto'];
      // Create the document definition
      const documentDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape', // Set layout to landscape
        pageMargins: [20, 20, 20, 20],
        content: [
          { text: 'Distributor List', style: 'header' },
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
      pdfMake.createPdf(documentDefinition).download('Distributor List.pdf');
    } else {
      console.error('Table element not found.');
    }
  }
  getDistributors() {

    this.formdatanew = this.farmerForm.value;
    this.id = this.formdatanew.state;
    this.id1 = this.formdatanew.district;
    this.id2 = this.formdatanew.taluka;
    this.id3 = this.formdatanew.city;
    // this.id4 = this.formdatanew.dist_id;

    var data = {
      state: this.id,
      district: this.id1,
      taluka: this.id2,
      city: this.id3,
      // dist_id: this.id4,
    }

    this.distributorService.getDistributorList(data).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
        this.alllist.sort((a, b) => b.id - a.id);
      }
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

        this.getListdata();

      });
    });

    this.farmerForm.get('district').valueChanges.subscribe(val => {
      this.HelperService.getTaluka({ dist_id: val }).subscribe((alltaluka) => {
        this.alltaluka = alltaluka['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.getListdata();
      });
    });

    this.farmerForm.get('taluka').valueChanges.subscribe(val => {
      this.HelperService.getCity({ taluka_id: val }).subscribe((allcity) => {
        this.allcity = allcity['data'];
        setTimeout(() => {
          let elems = document.querySelectorAll('select');
          let instances = M.FormSelect.init(elems);
        }, 1000);
        this.getListdata();
      });
    });

    this.farmerForm.get('city').valueChanges.subscribe(val => {
      this.getListdata();
    });
  }


  getListdata() {

    this.formdatanew = this.farmerForm.value;
    this.id = this.formdatanew.state;
    this.id1 = this.formdatanew.district;
    this.id2 = this.formdatanew.taluka;
    this.id3 = this.formdatanew.city;
    // this.id4 = this.formdatanew.dist_id;

    var data = {
      state: this.id,
      district: this.id1,
      taluka: this.id2,
      city: this.id3,
      // dist_id: this.id4,
    }

    this.distributorService.getDistributorList(data).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = '';
        this.alllist = list['data'];
      } else {
        this.alllist = [];
      }

      if (list['error'] == true) {
        this.toastr.error("Something went wrong " + list['message']);
      }
    });

  }



  getDataByDist() {
    this.formdatanew = this.farmerForm.value;
    this.id = this.formdatanew.state;
    this.id1 = this.formdatanew.district;
    this.id2 = this.formdatanew.taluka;
    this.id3 = this.formdatanew.city;
    // this.id4 = this.formdatanew.dist_id;

    var data = {
      state: this.id,
      district: this.id1,
      taluka: this.id2,
      city: this.id3,
      // dist_id: this.id4,
    }

    this.distributorService.getDistributorList(data).subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];

      } else {
        this.alllist = [];
      }
    });
  }


  delete(id) {
    var obj = {
      id: id
    };

    this.distributorService.deleteById(obj).subscribe(res => {
      if (res['result'] == true) {
        this.getDistributors();
      }
    });
  }

  getForEdit(event) {
    var obj = {
      id: event
    };

    this.distributorService.getByIdForEdit(obj).subscribe(res => {
      if (res['result'] == true) {
        this.router.navigate(['/admin', 'distributor-add'], { state: res['data'] });
      }
    });
  }

  getForView(event) {
    var obj = {
      id: event
    };

    this.distributorService.getByIdForEdit(obj).subscribe(res => {
      if (res['result'] == true) {
        this.router.navigate(['/admin', 'distributor-view'], { state: res['data'] });
      }
    });
  }


  setStatus(event, id) {
    var obj = {
      id: id
    };
    if (event.target.checked) {
      this.distributorService.unblockDistributor(obj).subscribe(res => {
        if (res['result']) {
          this.toastr.success('Distributor unblocked successfully!');
        } else {
          this.toastr.error(res['message']);
        }
      });
    } else {
      this.distributorService.blockDistributor(obj).subscribe(res => {
        if (res['result']) {
          this.toastr.success('Distributor blocked successfully!');
        } else {
          this.toastr.error(res['message']);
        }
      });
    }
  }




  setUserPramotion(event, user_id, user_type) {
    var obj = {
      user_id: user_id,
      user_type: user_type
    };
    this.distributorService.promoteDistributor(obj).subscribe(res => {
      if (res['result']) {
        this.toastr.success('Distributor promoted successfully!');
        if (res['result'] == true) {
          // setInterval(function(){
          this.getDistributors();
          // }, 5000);

        }

      } else {
        this.toastr.error(res['message']);
      }
    });



  }

  demoteDistributor(event, user_id) {
    var obj = {
      user_id: user_id
    };
    this.distributorService.demoteDistributor(obj).subscribe(res => {
      if (res['result']) {
        this.toastr.success('Distributor demoted successfully!');
        if (res['result'] == true) {
          // setInterval(function(){
          this.getDistributors();
          // }, 8000);
        }

      } else {
        this.toastr.error(res['message']);
      }
    });



  }

  showComplaints(id) {
    this.router.navigate(['/admin', 'distributor-complaints', id]);
  }

  showMessages(id) {
    this.router.navigate(['/admin', 'distributor-messages', id]);
  }


  pramoteDemoteMannually(user_type, user_id) {
    var obj = {
      user_type: user_type.target.value,
      user_id: user_id,
    };

    if (obj) {
      this.distributorService.pramoteDemoteMannually(obj).subscribe(list => {
        if (list['result'] == true) {
          this.getDistributors();
          setTimeout(() => {
            let elems = document.querySelectorAll('select');
            let instances = M.FormSelect.init(elems);
          }, 2000);
        }
      });
    }

  }


}
