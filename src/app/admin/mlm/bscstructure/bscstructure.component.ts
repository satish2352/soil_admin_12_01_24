import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MlmService } from '../mlm.service';

@Component({
  selector: 'app-bscstructure',
  templateUrl: './bscstructure.component.html',
  styleUrls: ['./bscstructure.component.css']
})
  export class BSCStructureComponent implements OnInit {


    p: number = 1;
    alllist: any = [];
    alllist_fsc: any = [];
    alllist_bsc: any = [];
    constructor(public mlmService: MlmService,
      public router: Router,
      private toastr: ToastrService) { }
  
    ngOnInit(): void {
      this.getDistributors();
  
  
      $(document).ready(function () {
        $('.collapsible').collapsible();
        $('.modal').modal();
      });
  
    }
  
    async getDistributors() {
  
      try {
        const list =
          this.mlmService.getDistributorListForManual().subscribe(list => {
            if (list['result'] == true) {
              this.alllist = list['data'];
              $('.collapsible').collapsible();
            }
          });
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
  
    async getBscUnderDSC(id) {
      var obj = {
        'added_by': id
      };
  
      try {
        const list = await this.mlmService.getBscUnderDSC(obj).toPromise();
        if (list['result'] === true) {
          this.alllist_bsc = list['data'];
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
  
    async getFscUnderBsc(id) {
      var obj = {
        'added_by': id
      };
  
      try {
        const list = await this.mlmService.getFscUnderBsc(obj).toPromise();
        if (list['result'] === true) {
          this.alllist_fsc = list['data'];
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
  
  
  
  
    delete(id) {
      var obj = {
        id: id
      };
  
      this.mlmService.deleteById(obj).subscribe(res => {
        if (res['result'] == true) {
          this.getDistributors();
        }
      });
    }
  
    getForEdit(event) {
      var obj = {
        id: event
      };
  
      this.mlmService.getByIdForEdit(obj).subscribe(res => {
        if (res['result'] == true) {
          this.router.navigate(['/admin', 'distributor-add'], { state: res['data'] });
        }
      });
    }
  
  
    getExcelReport() {
      var obj = {
        id: event
      };
  
      this.mlmService.getExcelSCTStrucutr().subscribe(res => {
        if (res['result'] == true) {
          const fileUrl = res['data'];
          var preview = document.getElementById("hiddenLink"); //getElementById instead of querySelectorAll
          preview.setAttribute("href", fileUrl);
          document.getElementById("hiddenLink").click();
        }
      });
    }
  
    getForView(event) {
      var obj = {
        id: event
      };
  
      this.mlmService.getByIdForEdit(obj).subscribe(res => {
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
        this.mlmService.unblockDistributor(obj).subscribe(res => {
          if (res['result']) {
            this.toastr.success('Distributor unblocked successfully!');
          } else {
            this.toastr.error(res['message']);
          }
        });
      } else {
        this.mlmService.blockDistributor(obj).subscribe(res => {
          if (res['result']) {
            this.toastr.success('Distributor blocked successfully!');
          } else {
            this.toastr.error(res['message']);
          }
        });
      }
    }
  
  
    showComplaints(id) {
      this.router.navigate(['/admin', 'distributor-complaints', id]);
    }
  
    showMessages(id) {
      this.router.navigate(['/admin', 'distributor-messages', id]);
    }
  
  
  }