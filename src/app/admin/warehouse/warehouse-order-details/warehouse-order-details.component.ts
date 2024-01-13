import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-warehouse-order-details',
  templateUrl: './warehouse-order-details.component.html',
  styleUrls: ['./warehouse-order-details.component.css']
})
export class WarehouseOrderDetailsComponent implements OnInit {

  order: any;
  constructor(
    private ws: WarehouseService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    const order_no = this.route.snapshot.paramMap.get('order_no');
    const dist_id = this.route.snapshot.paramMap.get('dist_id');
    this.ws.getOrder(order_no, dist_id).subscribe(res=>{
      if (res['result']) {
        this.order = res['data'][0];
      }
    });
  }

}
