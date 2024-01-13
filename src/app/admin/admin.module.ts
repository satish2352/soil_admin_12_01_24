import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderModule } from "ngx-ui-loader";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminsidebarComponent } from './adminsidebar/adminsidebar.component';
import { FarmeraddComponent } from './fcofield/farmer/farmeradd/farmeradd.component';
import { FarmerlistComponent } from './fcofield/farmer/farmerlist/farmerlist.component';
import { PlotvisitlistComponent } from './fcofield/plotvisit/plotvisitlist/plotvisitlist.component';
import { PlotvisitaddComponent } from './fcofield/plotvisit/plotvisitadd/plotvisitadd.component'



import { HttpClientModule } from '@angular/common/http';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DistributoraddComponent } from './distributor/distributoradd/distributoradd.component';
import { DistributorlistComponent } from './distributor/distributorlist/distributorlist.component';
import { DistributorvisitComponent } from './distributor/distributorvisit/distributorvisit.component';
import { DistributortargetvideolistComponent } from './distributor/distributortargetvideo/distributortargetvideolist/distributortargetvideolist.component';
import { DistributortargetvideoaddComponent } from './distributor/distributortargetvideo/distributortargetvideoadd/distributortargetvideoadd.component';
import { FarmermeetinglistComponent } from './distributor/distributormeeting/farmer/farmermeetinglist/farmermeetinglist.component';
import { DistributormeetinglistComponent } from './distributor/distributormeeting/distributor/distributormeetinglist/distributormeetinglist.component';
import { CompanyprofilelistComponent } from './web/companyprofile/companyprofilelist/companyprofilelist.component';
import { CompanyprofileaddComponent } from './web/companyprofile/companyprofileadd/companyprofileadd.component';
//import { from } from 'rxjs';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { AboutuslistComponent } from './web/abutus/aboutuslist/aboutuslist.component';
import { AboutusaddComponent } from './web/abutus/aboutusadd/aboutusadd.component';
import { CoverphotolistComponent } from './web/coverphoto/coverphotolist/coverphotolist.component';
import { CoverphotoaddComponent } from './web/coverphoto/coverphotoadd/coverphotoadd.component';
import { GallaryphotolistComponent } from './web/gallaryphoto/gallaryphotolist/gallaryphotolist.component';
import { GallaryphotoaddComponent } from './web/gallaryphoto/gallaryphotoadd/gallaryphotoadd.component';
import { VisionmissionlistComponent } from './web/visionmission/visionmissionlist/visionmissionlist.component';
import { VisionmissionaddComponent } from './web/visionmission/visionmissionadd/visionmissionadd.component';
import { VideolistComponent } from './web/video/videolist/videolist.component';
import { VideoaddComponent } from './web/video/videoadd/videoadd.component';
import { AudiolistComponent } from './web/audio/audiolist/audiolist.component';
import { AudioaddComponent } from './web/audio/audioadd/audioadd.component';
import { TestimoniallistComponent } from './web/testimonial/testimoniallist/testimoniallist.component';
import { TestimonialaddComponent } from './web/testimonial/testimonialadd/testimonialadd.component';
import { ArticlelistComponent } from './web/blog/article/articlelist/articlelist.component';
import { ArticleaddComponent } from './web/blog/article/articleadd/articleadd.component';
import { SchedulelistComponent } from './web/blog/schedule/schedulelist/schedulelist.component';
import { ScheduleaddComponent } from './web/blog/schedule/scheduleadd/scheduleadd.component';
import { ProductaddComponent } from './product/productadd/productadd.component';
import { ProductlistComponent } from './product/productlist/productlist.component';
import { RedirectselfComponent } from './redirectself/redirectself.component';
import { ProducteditComponent } from './product/productedit/productedit.component';

import { AgencyListComponent } from './agency/agency-list/agency-list.component';
import { MyOrdersComponent } from './orders/my-orders/my-orders.component';
import { WarehouseOrdersComponent } from './warehouse/warehouse-orders/warehouse-orders.component';
import { WarehouseOrderDetailsComponent } from './warehouse/warehouse-order-details/warehouse-order-details.component';
import { EditAgencyComponent } from './agency/edit-agency/edit-agency.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DashboardV1Component } from './dashboard/dashboard-v1/dashboard-v1.component';
import { ComplaintsComponent } from './distributor/complaints/complaints.component';
import { MessagesComponent } from './distributor/messages/messages.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { SendNotificationsComponent } from './notifications/send-notifications/send-notifications.component';
import { SalesreportComponent } from './report/salesreport/salesreport.component';
import { DistsalesreportComponent } from './report/distsalesreport/distsalesreport.component';
import { OrderreportComponent } from './report/orderreport/orderreport.component';
import { OrdernotdispatchedComponent } from './report/ordernotdispatched/ordernotdispatched.component';
import { OrderdispatchedComponent } from './report/orderdispatched/orderdispatched.component';
import { DistributorvideoaddComponent } from './distributor/distributorvideo/distributorvideoadd/distributorvideoadd.component';
import { DistributorvideolistComponent } from './distributor/distributorvideo/distributorvideolist/distributorvideolist.component';
import { BannerbraddComponent } from './upload/bannerbr/bannerbradd/bannerbradd.component';
import { BannerbrlistComponent } from './upload/bannerbr/bannerbrlist/bannerbrlist.component';
import { DistributorviewComponent } from './distributor/distributorview/distributorview.component';
import { FamerviewComponent } from './fcofield/farmer/famerview/famerview.component';
import { SctresultlistComponent } from './distributor/sctresult/sctresultlist/sctresultlist.component';
import { SctresultviewComponent } from './distributor/sctresult/sctresultview/sctresultview.component';
import { MlmlistComponent } from './mlm/mlmlist/mlmlist.component';

import { AgmCoreModule } from '@agm/core';
import { AddagencyComponent } from './agency/addagency/addagency.component';

import { NgxChartsModule} from '@swimlane/ngx-charts';
import { FarmerdashboardreportComponent } from './dashboard/report/farmerdashboardreport/farmerdashboardreport.component';
import { DistributordashboardreportComponent } from './dashboard/report/distributordashboardreport/distributordashboardreport.component';
import { CountaddComponent } from './web/count/countadd/countadd.component';
import { CountlistComponent } from './web/count/countlist/countlist.component';
import { InterenshiplistComponent } from './web/webcreer/interenshiplist/interenshiplist.component';
import { JoblistComponent } from './web/webcreer/joblist/joblist.component';
import { CareeraddComponent } from './web/webcreer/career/careeradd/careeradd.component';
import { CareerlistComponent } from './web/webcreer/career/careerlist/careerlist.component';
import { CareerdistributorlistComponent } from './web/webcreer/careerdistributorlist/careerdistributorlist.component';
import { ProductinfolistComponent } from './web/product/productinfolist/productinfolist.component';
import { ProductinfoaddComponent } from './web/product/productinfoadd/productinfoadd.component';
import { DistributoraddspecificComponent } from './distributor/distributoraddspecific/distributoraddspecific.component';
import { MarqueeaddComponent } from './web/marquee/marqueeadd/marqueeadd.component';
import { MarqueelistComponent } from './web/marquee/marqueelist/marqueelist.component';
import { InterenshipviewComponent } from './web/webcreer/interenshipview/interenshipview.component';
import { InterenshipupdateComponent } from './web/webcreer/interenshipupdate/interenshipupdate.component';
import { DistviewComponent } from './web/webcreer/dist/distview/distview.component';
import { DistupdateComponent } from './web/webcreer/dist/distupdate/distupdate.component';
import { JobviewComponent } from './web/webcreer/job/jobview/jobview.component';
import { JobupdateComponent } from './web/webcreer/job/jobupdate/jobupdate.component';
import { BloglistallComponent } from './web/bloglist/bloglistall/bloglistall.component';
import { BloglistallreplyComponent } from './web/bloglistreply/bloglistallreply/bloglistallreply.component';
import { BloglistallviewComponent } from './web/bloglistreply/bloglistallview/bloglistallview.component';
import { WebenqlistComponent } from './web/webenq/webenqlist/webenqlist.component';
import { WebenqviewComponent } from './web/webenq/webenqview/webenqview.component';
import { DistupdatenewComponent } from './web/webcreer/dist/distupdatenew/distupdatenew.component';
import { AddaddressComponent } from './mobileapp/address/addaddress/addaddress.component';
import { AddcropComponent } from './mobileapp/crop/addcrop/addcrop.component';
import { EditcropComponent } from './mobileapp/crop/editcrop/editcrop.component';
import { ListcropComponent } from './mobileapp/crop/listcrop/listcrop.component';
import { ListaddressComponent } from './mobileapp/address/listaddress/listaddress.component';
import { PrinciplelistComponent } from './web/principle/principlelist/principlelist.component';
import { PrincipleaddComponent } from './web/principle/principleadd/principleadd.component';
import { DistributorvideoviwedComponent } from './distributor/distributorvideoviwed/distributorvideoviwed.component';
import { MessageviewComponent } from './mobileapp/messageview/messageview.component';
import { ComplaintviewComponent } from './mobileapp/complaintview/complaintview.component';
import { YoutubesuscriberviewComponent } from './mobileapp/youtubesuscriberview/youtubesuscriberview.component';
import { DisttocompreportComponent } from './report/disttocompreport/disttocompreport.component';
import { ViewOrderComponent } from './orders/view-order/view-order.component';

@NgModule({
  declarations: [AdminComponent, SidebarComponent, AdminsidebarComponent, FarmeraddComponent, FarmerlistComponent, PlotvisitlistComponent, AdminloginComponent, DistributoraddComponent, DistributorlistComponent, DistributorvisitComponent, DistributortargetvideolistComponent, DistributortargetvideoaddComponent, FarmermeetinglistComponent, DistributormeetinglistComponent, PlotvisitaddComponent, CompanyprofilelistComponent, CompanyprofileaddComponent, AboutuslistComponent, AboutusaddComponent, CoverphotolistComponent, CoverphotoaddComponent, GallaryphotolistComponent, GallaryphotoaddComponent, VisionmissionlistComponent, VisionmissionaddComponent, VideolistComponent, VideoaddComponent, AudiolistComponent, AudioaddComponent, TestimoniallistComponent, TestimonialaddComponent, ArticlelistComponent, ArticleaddComponent, SchedulelistComponent, ScheduleaddComponent, ProductaddComponent, ProductlistComponent, RedirectselfComponent, ProducteditComponent, AgencyListComponent, MyOrdersComponent, WarehouseOrdersComponent, WarehouseOrderDetailsComponent, EditAgencyComponent, AddOrderComponent, EditOrderComponent, DashboardV1Component, ComplaintsComponent, MessagesComponent, NotificationsComponent, SendNotificationsComponent, SalesreportComponent, DistsalesreportComponent, OrderreportComponent, OrdernotdispatchedComponent, OrderdispatchedComponent, DistributorvideoaddComponent, DistributorvideolistComponent, BannerbraddComponent, BannerbrlistComponent, DistributorviewComponent, FamerviewComponent, SctresultlistComponent, SctresultviewComponent, MlmlistComponent, AddagencyComponent, FarmerdashboardreportComponent, DistributordashboardreportComponent, CountaddComponent, CountlistComponent, InterenshiplistComponent, JoblistComponent, CareeraddComponent, CareerlistComponent, CareerdistributorlistComponent, ProductinfolistComponent, ProductinfoaddComponent, DistributoraddspecificComponent, MarqueeaddComponent, MarqueelistComponent, InterenshipviewComponent, InterenshipupdateComponent, DistviewComponent, DistupdateComponent, JobviewComponent, JobupdateComponent, BloglistallComponent, BloglistallreplyComponent, BloglistallviewComponent, WebenqlistComponent, WebenqviewComponent, DistupdatenewComponent, AddaddressComponent, AddcropComponent, EditcropComponent, ListcropComponent, ListaddressComponent, PrinciplelistComponent, PrincipleaddComponent, DistributorvideoviwedComponent, MessageviewComponent, ComplaintviewComponent, YoutubesuscriberviewComponent, DisttocompreportComponent, ViewOrderComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    
    HttpClientModule,
    NgxPaginationModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    NgxChartsModule,



    NgxPermissionsModule.forChild({
      rolesIsolate: false,
      permissionsIsolate: false,
      configurationIsolate: false
    }),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdpq_DETv3oRGNzpTn-BdFSIwHvOgyQAU'
    })
  ],
  providers: [],
  bootstrap: [AdminloginComponent]
})
export class AdminModule {


}
