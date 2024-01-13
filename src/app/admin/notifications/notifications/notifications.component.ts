import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  p: number = 1;
  notifications: any = [];
  constructor(private ns: NotificationService, 
    public router: Router,  
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.ns.getNotifications().subscribe((res) => {
      this.ngxService.start();
      this.notifications = res['data'];
      this.notifications.sort((a,b)=>b.id-a.id)
      this.ngxService.stop();
    });
  }

}
