import { Component, OnInit } from '@angular/core';
import { DistributorService } from "../distributor.service";
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-distributorlistnew',
  templateUrl: './distributorlistnew.component.html',
  styleUrls: ['./distributorlistnew.component.css']
})
export class DistributorlistnewComponent implements OnInit {
  p:number=1;
  alllist:any = [];
  formdatanew: any;
  farmerForm: any;
  id: any;
  id1: any;
  id2: any;
  id3: any;
  HelperService: any;
  alldist: any;
  allcity: any;
  alltaluka: any;
  allstate: any;
  constructor(public distributorService:DistributorService,
    public router:Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
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
    
        const tableHeaders = Object.keys(this.alllist[0]);
        const tableRows = this.alllist.map(row => Object.values(row));
    
        // Calculate dynamic widths based on content length
        const dynamicWidths = tableHeaders.map(header => ({
          width: 'auto',
          height:'auto',
          minCellWidth: header.length * 8, // Adjust this multiplier as needed
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
        pdfMake.createPdf(documentDefinition).download('dist.pdf');
      } else {
        console.error('Table element not found.');
      }
    }
  getDistributors() {
    this.distributorService.getDistributorListNewArrival().subscribe(list => {
      if(list['result']==true) {
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

    this.distributorService.getDistributorList().subscribe(list => {
      if (list['result'] == true) {
        this.alllist = '';
        this.alllist = list['data'];
      } else {
        this.alllist =[];
      }

      if (list['error'] == true) {
        this.toastr.error("Something went wrong " + list['message']);
      }
    });

  }
  getdata() {

    this.distributorService.getDistributorListNewArrival().subscribe(list => {
      if (list['result'] == true) {
        this.alllist = list['data'];
        // console.log(this.alllist);

      } else {
        this.alllist = [];
      }
      
      // this.getFarmerMeetingListdata();

      // if (list['error'] == true) {
      //   this.toastr.error("Something went wrong " + list['message']);
      // }
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

    this.distributorService.getDistributorList().subscribe(list => {
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

    this.distributorService.deleteById(obj).subscribe(res=>{
      if (res['result']== true) {
        this.getDistributors();
      }
     });
  }

  getForEdit(event) {
    var obj = {
      id: event
    };

    this.distributorService.getByIdForEdit(obj).subscribe(res=>{
      if (res['result']== true) {
        this.router.navigate(['/admin','distributor-add'], { state: res['data'] });
      }
     });
  }

  getForView(event) {
    var obj = {
      id: event
    };

    this.distributorService.getByIdForEdit(obj).subscribe(res=>{
      if (res['result']== true) {
        this.router.navigate(['/admin','distributor-view'], { state: res['data'] });
      }
     });
  }


  setStatus(event, id) {
    var obj = {
      id: id
    };
    if (event.target.checked) {
      this.distributorService.unblockDistributor(obj).subscribe(res=>{
        if (res['result']) {
          this.toastr.success('Distributor unblocked successfully!');
        } else {
          this.toastr.error(res['message']);
        }
      });
    } else {
      this.distributorService.blockDistributor(obj).subscribe(res=>{
        if (res['result']) {
          this.toastr.success('Distributor blocked successfully!');
        } else {
          this.toastr.error(res['message']);
        }
      });
    }
  }


  

  setUserPramotion(event, user_id,user_type) {
    var obj = {
      user_id: user_id,
      user_type:user_type
    };
      this.distributorService.promoteDistributor(obj).subscribe(res=>{
        if (res['result']) {
          this.toastr.success('Distributor promoted successfully!');
          if (res['result']==true)
          {
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
      this.distributorService.demoteDistributor(obj).subscribe(res=>{
        if (res['result']) {
          this.toastr.success('Distributor demoted successfully!');
          if (res['result']==true)
          {
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


}
