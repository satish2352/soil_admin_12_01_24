import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../report/report.service';
import { OrderService } from '../../orders/order.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-orderreport',
  templateUrl: './orderreport.component.html',
  styleUrls: ['./orderreport.component.css']
})
export class OrderreportComponent implements OnInit {
  submitted: boolean = false;
  formContent: FormGroup;
  p: number = 1;
  orders: any = [];
  totalamount: any;
  datefrom: any;
  dateto: any;
  totalorder: any;


  constructor(private os: OrderService,private datePipe: DatePipe, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOrders();
    this.formContent = new FormGroup({
          datefrom: new FormControl('', [Validators.required]),
          dateto: new FormControl('', [Validators.required])
        });
  }

  getOrders() {
    this.os.getOrders().subscribe(res=>{
      if (res['result']) {
        this.orders = res['data'];
        this.orders.sort((a, b) => b.id - a.id);
      }
    });
  }
onSubmit() {
    this.submitted = true;
    if (this.formContent.invalid) {
      this.toastr.warning("Select Date");
      return;
    }


    this.os.getOrders().subscribe(res => {
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

  verifyOrder(order_no, created_disctributor_id) {
    this.os.verifyOrder(order_no, created_disctributor_id).subscribe(res=>{
      if (res['result']) {
        this.toastr.success('Order verified successfully!');
        this.getOrders();
      } else {
        this.toastr.success(res['message']);
      }
    });
  }

  forwardOrder(order_no, created_disctributor_id) {
    this.os.forwardOrder(order_no, created_disctributor_id).subscribe(res=>{
      if (res['result']) {
        this.toastr.success('Order forwared successfully!');
        this.getOrders();
      } else {
        this.toastr.success(res['message']);
      }
    });
  }

  deleteOrder(order_no, created_disctributor_id) {
    this.os.deleteOrder(order_no, created_disctributor_id).subscribe(res=>{
      if (res['result']) {
        this.toastr.success('Order deleted successfully!');
        this.getOrders();
      } else {
        this.toastr.success(res['message']);
      }
    });
  }

  // submitted: boolean = false;
  // formContent: FormGroup;
  // p: number = 1;
  // orders: any = [];
  // totalamount: any;
  // datefrom: any;
  // dateto: any;
  // totalorder: any;
  // constructor(private os: ReportService, private router: Router, private toastr: ToastrService, private fb: FormBuilder,) { }

  
  // ngOnInit(): void {
  //   this.getAllOrders();
  //   this.formContent = new FormGroup({
  //     datefrom: new FormControl('', [Validators.required]),
  //     dateto: new FormControl('', [Validators.required])
  //   });
  // }

  // getAllOrders() {
  //   this.os.getAllOrders(null).subscribe(res => {
  //     if (res['result']) {
  //       this.orders = res['data'];
  //       console.log(this.orders);
        
  //       this.totalamount = res['totalamount'];
  //       this.datefrom = res['datefrom'];
  //       this.dateto = res['dateto'];
  //       this.totalorder = res['totalorder'];
  //     }
  //   });
  // }

  // get f() { return this.formContent.controls; }
  // onSubmit() {
  //   this.submitted = true;
  //   if (this.formContent.invalid) {
  //     this.toastr.warning("Select Date");
  //     return;
  //   }


  //   this.os.getAllOrders(this.formContent.value).subscribe(res => {
  //     if (res['result']) {
  //       this.orders = res['data'];
  //       this.totalamount = res['totalamount'];
  //       this.datefrom = res['datefrom'];
  //       this.dateto = res['dateto'];
  //       this.totalorder = res['totalorder'];
  //     }
  //   });
  // }

  // editOrder(order_no, created_disctributor_id) {
  //   this.router.navigate(['/admin', 'order-details', order_no, created_disctributor_id]);
  // }
  // verifyOrder(order_no, created_disctributor_id) {
  //   this.os.verifyOrder(order_no, created_disctributor_id).subscribe(res=>{
  //     if (res['result']) {
  //       this.toastr.success('Order verified successfully!');
  //       this.getAllOrders();
  //     } else {
  //       this.toastr.success(res['message']);
  //     }
  //   });
  // }

  // forwardOrder(order_no, created_disctributor_id) {
  //   this.os.forwardOrder(order_no, created_disctributor_id).subscribe(res=>{
  //     if (res['result']) {
  //       this.toastr.success('Order forwared successfully!');
  //       this.getOrders();
  //     } else {
  //       this.toastr.success(res['message']);
  //     }
  //   });
  // }

  // deleteOrder(order_no, created_disctributor_id) {
  //   this.os.deleteOrder(order_no, created_disctributor_id).subscribe(res=>{
  //     if (res['result']) {
  //       this.toastr.success('Order deleted successfully!');
  //       this.getOrders();
  //     } else {
  //       this.toastr.success(res['message']);
  //     }
  //   });
  // }

}
