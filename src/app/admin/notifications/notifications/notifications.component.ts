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
  searchText: string = '';
  filteredList: any[] = [];
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
      this.filteredList = this.notifications; // Initialize filteredList
      this.notifications.sort((a,b)=>b.id-a.id)
      this.ngxService.stop();
      
    });
  }

    
  applySearchFilter(): void {
    if (!this.searchText.trim()) {
      this.filteredList = this.notifications;
    } else {
      this.filteredList = this.notifications.filter(item => {
        const searchTextLower = this.searchText.toLowerCase();
        
        return (
          (item.user_type && item.user_type.toLowerCase().includes(searchTextLower)) ||
          (item.dfname && item.dfname.toLowerCase().includes(searchTextLower)) ||
          (item.dmname && item.dmname.toLowerCase().includes(searchTextLower)) ||
          (item.dlname && item.dlname.toLowerCase().includes(searchTextLower)) ||
          (item.message && item.message.toLowerCase().includes(searchTextLower)) ||
          (item.notification_time && item.notification_time.toLowerCase().includes(searchTextLower))
        );
      });

    }
  }

}
