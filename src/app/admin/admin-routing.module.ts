import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AdminComponent } from './admin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { FarmeraddComponent } from './fcofield/farmer/farmeradd/farmeradd.component';
import { FarmerlistComponent } from './fcofield/farmer/farmerlist/farmerlist.component';
import { PlotvisitlistComponent } from './fcofield/plotvisit/plotvisitlist/plotvisitlist.component';
import { PlotvisitaddComponent } from './fcofield/plotvisit/plotvisitadd/plotvisitadd.component';
import { DistributoraddComponent } from './distributor/distributoradd/distributoradd.component';
import { DistributorlistComponent } from './distributor/distributorlist/distributorlist.component';
import { DistributorvisitComponent } from './distributor/distributorvisit/distributorvisit.component';
//All Target Video
import { DistributortargetvideoaddComponent } from './distributor/distributortargetvideo/distributortargetvideoadd/distributortargetvideoadd.component';
import { DistributortargetvideolistComponent } from './distributor/distributortargetvideo/distributortargetvideolist/distributortargetvideolist.component';

//Distributor Meeting
import { FarmermeetinglistComponent } from './distributor/distributormeeting/farmer/farmermeetinglist/farmermeetinglist.component';
import { DistributormeetinglistComponent } from './distributor/distributormeeting/distributor/distributormeetinglist/distributormeetinglist.component';

//Web Management
import { CompanyprofileaddComponent } from './web/companyprofile/companyprofileadd/companyprofileadd.component';
import { CompanyprofilelistComponent } from './web/companyprofile/companyprofilelist/companyprofilelist.component';
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
import { ArticlelistComponent } from './web/blog/article/articlelist/articlelist.component';
import { ArticleaddComponent } from './web/blog/article/articleadd/articleadd.component';
import { SchedulelistComponent } from './web/blog/schedule/schedulelist/schedulelist.component';
import { ScheduleaddComponent } from './web/blog/schedule/scheduleadd/scheduleadd.component';
import { TestimonialaddComponent } from './web/testimonial/testimonialadd/testimonialadd.component';
import { TestimoniallistComponent } from './web/testimonial/testimoniallist/testimoniallist.component';
import { ProductlistComponent } from './product/productlist/productlist.component';
import { ProductaddComponent } from './product/productadd/productadd.component';
import { RedirectselfComponent } from './redirectself/redirectself.component';
import { ProducteditComponent } from './product/productedit/productedit.component';
import { AgencyListComponent } from './agency/agency-list/agency-list.component';
//import { AddAgencyComponent } from './agency/add-agency/add-agency.component';
import { MyOrdersComponent } from './orders/my-orders/my-orders.component';
import { WarehouseOrdersComponent } from './warehouse/warehouse-orders/warehouse-orders.component';
import { WarehouseOrderDetailsComponent } from './warehouse/warehouse-order-details/warehouse-order-details.component';
import { EditAgencyComponent } from './agency/edit-agency/edit-agency.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { EditOrderComponent } from './orders/edit-order/edit-order.component';
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
import { BannerbrlistComponent } from './upload/bannerbr/bannerbrlist/bannerbrlist.component';
import { BannerbraddComponent } from './upload/bannerbr/bannerbradd/bannerbradd.component';
import { DistributorviewComponent } from './distributor/distributorview/distributorview.component';
import { FamerviewComponent } from './fcofield/farmer/famerview/famerview.component';
import { SctresultlistComponent } from './distributor/sctresult/sctresultlist/sctresultlist.component';
import { SctresultviewComponent } from './distributor/sctresult/sctresultview/sctresultview.component';
import { MlmlistComponent } from './mlm/mlmlist/mlmlist.component';
import { AddagencyComponent } from './agency/addagency/addagency.component';
import { FarmerdashboardreportComponent } from './dashboard/report/farmerdashboardreport/farmerdashboardreport.component';
import { DistributordashboardreportComponent } from './dashboard/report/distributordashboardreport/distributordashboardreport.component';
import { CountaddComponent } from './web/count/countadd/countadd.component';
import { CountlistComponent } from './web/count/countlist/countlist.component';
import { CareerlistComponent } from './web/webcreer/career/careerlist/careerlist.component';
import { CareeraddComponent } from './web/webcreer/career/careeradd/careeradd.component';
import { JoblistComponent } from './web/webcreer/joblist/joblist.component';
import { InterenshiplistComponent } from './web/webcreer/interenshiplist/interenshiplist.component';
import { CareerdistributorlistComponent } from './web/webcreer/careerdistributorlist/careerdistributorlist.component';
import { ProductinfolistComponent } from './web/product/productinfolist/productinfolist.component';
import { ProductinfoaddComponent } from './web/product/productinfoadd/productinfoadd.component';
import { DistributoraddspecificComponent } from './distributor/distributoraddspecific/distributoraddspecific.component';
import { MarqueelistComponent } from './web/marquee/marqueelist/marqueelist.component';
import { MarqueeaddComponent } from './web/marquee/marqueeadd/marqueeadd.component';
import { InterenshipupdateComponent } from './web/webcreer/interenshipupdate/interenshipupdate.component';
import { InterenshipviewComponent } from './web/webcreer/interenshipview/interenshipview.component';
import { JobupdateComponent } from './web/webcreer/job/jobupdate/jobupdate.component';
import { JobviewComponent } from './web/webcreer/job/jobview/jobview.component';
import { DistviewComponent } from './web/webcreer/dist/distview/distview.component';
import { DistupdateComponent } from './web/webcreer/dist/distupdate/distupdate.component';
import { BloglistallreplyComponent } from './web/bloglistreply/bloglistallreply/bloglistallreply.component';
import { BloglistallviewComponent } from './web/bloglistreply/bloglistallview/bloglistallview.component';
import { WebenqlistComponent } from './web/webenq/webenqlist/webenqlist.component';
import { ListaddressComponent } from './mobileapp/address/listaddress/listaddress.component';
import { AddaddressComponent } from './mobileapp/address/addaddress/addaddress.component';
import { ListcropComponent } from './mobileapp/crop/listcrop/listcrop.component';
import { AddcropComponent } from './mobileapp/crop/addcrop/addcrop.component';
import { EditcropComponent } from './mobileapp/crop/editcrop/editcrop.component';
import { PrinciplelistComponent } from './web/principle/principlelist/principlelist.component';
import { DistributorvideoviwedComponent } from './distributor/distributorvideoviwed/distributorvideoviwed.component';
import { ComplaintviewComponent } from './mobileapp/complaintview/complaintview.component';
import { MessageviewComponent } from './mobileapp/messageview/messageview.component';
import { YoutubesuscriberviewComponent } from './mobileapp/youtubesuscriberview/youtubesuscriberview.component';
import { DisttocompreportComponent } from './report/disttocompreport/disttocompreport.component';
import { ViewOrderComponent } from './orders/view-order/view-order.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardV1Component
      },
      {
        path: 'warehouse-orders',
        component: WarehouseOrdersComponent
      },
      {
        path: 'warehouse-order-details/:order_no/:dist_id',
        component: WarehouseOrderDetailsComponent
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent
      },
      {
        path: 'add-order',
        component: AddOrderComponent
      },
      {
        path: 'order-details/:order_no/:dist_id',
        component: EditOrderComponent
      },
      {
        path:'viewreportsales/:order_no/:dist_id',
        component:ViewOrderComponent
      },
      {
        path: 'agency-list',
        component: AgencyListComponent
      },
      {
        path: 'add-agency',
        component: AddagencyComponent
      },
      {
        path: 'edit-agency/:id',
        component: EditAgencyComponent
      },
      {
        path: 'login',
        component: AdminloginComponent ////////////dashboard
      },
      {
        path: 'farmer-list',
        component: FarmerlistComponent ////////////dashboard
      },
      {
        path: 'farmer-list',
        component: FarmerlistComponent
      },
      {
        path: 'farmer-add',
        component: FarmeraddComponent
      },

      {
        path: 'farmer-view',
        component: FamerviewComponent
      },

      //Distributor Add List
      {
        path: 'distributor-list',
        component: DistributorlistComponent
      },
      {
        path: 'distributor-add',
        component: DistributoraddComponent
      },

      {
        path: 'distributor-addspecific',
        component: DistributoraddspecificComponent
      },

      {
        path: 'distributor-view',
        component: DistributorviewComponent
      },

      {
        path: 'distributor-complaints/:dist_id',
        component: ComplaintsComponent
      },
      {
        path: 'distributor-messages/:dist_id',
        component: MessagesComponent
      },
      //Distributor Target Videos Add List
      {
        path: 'distributorvideo-list',
        component: DistributortargetvideolistComponent
      },
      {
        path: 'distributorvideo-add',
        component: DistributortargetvideoaddComponent
      },
      // All Meeting
      {
        path: 'distributorfarmermeeting-list',
        component: FarmermeetinglistComponent
      },

      {
        path: 'distributordistributormeeting-list',
        component: DistributormeetinglistComponent
      },

      {
        path: 'distributor-visit',
        component: DistributorvisitComponent
      },

      {
        path: 'sctresult-list',
        component: SctresultlistComponent
      },

      {
        path: 'distributor-video-view',
        component: DistributorvideoviwedComponent
      },

      {
        path: 'sctresult-view',
        component: SctresultviewComponent
      },

      {
        path:'mlm-list',
        component:MlmlistComponent
      },

      {
        path: 'plotvisit-list',
        component: PlotvisitlistComponent
      },
      {
        path: 'plotvisit-add',
        component: PlotvisitaddComponent
      },

      //Mobile App Address
      {
        path: 'mobileapp-adress-list',
        component: ListaddressComponent
      },
      {
        path: 'mobileapp-adress-add/:id',
        component: AddaddressComponent
      },

      {
        path: 'mobileapp-messeges-list',
        component: MessageviewComponent
      },

      {
        path: 'mobileapp-complaint-list',
        component: ComplaintviewComponent
      },

      
      {
        path: 'mobileapp-youtube-suscriber-list',
        component: YoutubesuscriberviewComponent
      },

   
      //Mobile App Crop
      {
        path: 'mobileapp-crop-list',
        component: ListcropComponent
      },
      {
        path: 'mobileapp-crop-add',
        component: AddcropComponent
      },

      {
        path: 'mobileapp-crop-edit/:id',
        component: AddcropComponent
      },
     

      //Web Part
      {
        path: 'companyprofile-list',
        component: CompanyprofilelistComponent
      },
      {
        path: 'companyprofile-add',
        component: CompanyprofileaddComponent
      },
      {
        path: 'companyprofile-edit/:id',
        component: CompanyprofileaddComponent
      },


       //Web Part Marquee Tag
       {
        path: 'marquee-list',
        component: MarqueelistComponent
      },
      {
        path: 'marquee-add',
        component: MarqueeaddComponent
      },
      {
        path: 'marquee-edit/:id',
        component: MarqueeaddComponent
      },

      //Blog reply

      {
        path: 'blogreply-list',
        component: BloglistallreplyComponent
      },
      {
        path: 'blogreply-view/:id',
        component: BloglistallviewComponent
      },

      {
        path: 'webenq-list',
        component: WebenqlistComponent
      },
      

      

      //About US
      {
        path: 'aboutus-list',
        component: AboutuslistComponent
      },
      {
        path: 'aboutus-add',
        component: AboutusaddComponent
      },
      {
        path: 'aboutus-edit/:id',
        component: AboutusaddComponent
      },

      //Cover photo
      {
        path: 'coverphoto-list',
        component: CoverphotolistComponent
      },
      {
        path: 'coverphoto-add',
        component: CoverphotoaddComponent
      },
      {
        path: 'coverphoto-edit/:id',
        component: CoverphotoaddComponent
      },
      //Gallary photo
      {
        path: 'gallaryphoto-list',
        component: GallaryphotolistComponent
      },
      {
        path: 'gallaryphoto-add',
        component: GallaryphotoaddComponent
      },
      {
        path: 'gallaryphoto-edit/:id',
        component: GallaryphotoaddComponent
      },
      //Vision Mission
      {
        path: 'visiomission-list',
        component: VisionmissionlistComponent
      },
      {
        path: 'visiomission-add',
        component: VisionmissionaddComponent
      },
      {
        path: 'visiomission-edit/:id',
        component: VisionmissionaddComponent
      },

      //Video
      {
        path: 'webvideo-list',
        component: VideolistComponent
      },
      {
        path: 'webvideo-add',
        component: VideoaddComponent
      },
      {
        path: 'webvideo-edit/:id',
        component: VideoaddComponent
      },

      //Audio
      {
        path: 'webaudio-list',
        component: AudiolistComponent
      },
      {
        path: 'webaudio-add',
        component: AudioaddComponent
      },
      {
        path: 'webaudio-edit/:id',
        component: AudioaddComponent
      },
      //Testimonials
      {
        path: 'testimonials-list',
        component: TestimoniallistComponent
      },
      {
        path: 'testimonials-add',
        component: TestimonialaddComponent
      },
      {
        path: 'testimonials-edit/:id',
        component: TestimonialaddComponent
      },

      //Blog Article
      {
        path: 'blogarticle-list',
        component: ArticlelistComponent
      },
      {
        path: 'blogarticle-add',
        component: ArticleaddComponent
      },
      {
        path: 'blogarticle-edit/:id',
        component: ArticleaddComponent
      },

      //Blog Schedule
      {
        path: 'blogschedule-list',
        component: SchedulelistComponent
      },
      {
        path: 'blogschedule-add',
        component: ScheduleaddComponent
      },
      {
        path: 'blogschedule-edit/:id',
        component: ScheduleaddComponent
      },

      //Product
      {
        path: 'product-list',
        component: ProductlistComponent
      },
      {
        path: 'product-add',
        component: ProductaddComponent
      },
      {
        path: 'product-edit/:id',
        component: ProducteditComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'send-notifications',
        component: SendNotificationsComponent
      },
      {
        path: 'redirectself',
        component: RedirectselfComponent
      },

      // Report
      {
        path:'salesreport',
        component:SalesreportComponent
      },

      {
        path:'disttocompreport',
        component:DisttocompreportComponent
      },

      

      {
        path:'amtpaiddist',
        component:DistsalesreportComponent
      },
      {
        path:'allorder',
        component:OrderreportComponent
      },
      {
        path:'allordernotdispatched',
        component:OrdernotdispatchedComponent
      },
      {
        path:'allorderdispatched',
        component:OrderdispatchedComponent
      },
      {
        path:'distributorvideoall-list',
        component:DistributorvideolistComponent
      },
      {
        path:'distributorvideoadd-list',
        component:DistributorvideoaddComponent
      },
      {
        path: 'distributorvideoadd-edit/:id',
        component: DistributorvideoaddComponent
      },

      {
        path:'bannerbr-list',
        component:BannerbrlistComponent
      },
      {
        path:'bannerbr-add',
        component:BannerbraddComponent
      },
      {
        path: 'bannerbr-edit/:id',
        component: BannerbraddComponent
      },
      {
        path:'farmerdash-report/:id/:id1/:id2/:id3',
        component:FarmerdashboardreportComponent
      },
      {
        path:'distdash-report/:id/:id1/:id2/:id3',
        component:DistributordashboardreportComponent
      },

      {
        path:'webcount-edit/:id',
        component:CountaddComponent
      },


      {
        path:'webcount-list',
        component:CountlistComponent
      },

      {
        path:'webcareername-list',
        component:CareerlistComponent
      },
      {
        path:'webcareername-add',
        component:CareeraddComponent
      },
      {
        path:'webcareername-edit/:id',
        component:CareeraddComponent
      },

      {
        path:'webcareerdist-list',
        component:CareerdistributorlistComponent
      },

      {
        path:'webcareerdist-view',
        component:DistviewComponent
      },
      {
        path:'webcareerdist-update',
        component:DistupdateComponent
      },

      {
        path:'webcareerjob-list',
        component:JoblistComponent
      },

      {
        path:'webcareerjob-view/:id',
        component:JobviewComponent
      },

      {
        path:'webcareerjob-update/:id',
        component:JobupdateComponent
      },

      {
        path:'webcareerinternship-list',
        component:InterenshiplistComponent
      },

      {
        path:'webcareerinternship-view/:id',
        component:InterenshipviewComponent
      },

      {
        path:'webcareerinternship-update/:id',
        component:InterenshipupdateComponent
      },

      {
        path:'webproductinfo-list',
        component:ProductinfolistComponent
      },

      {
        path:'webproductinfo-add',
        component:ProductinfoaddComponent
      },

      {
        path:'webproductinfo-edit/:id',
        component:ProductinfoaddComponent
      },


      {
        path:'principle-list',
        component:PrinciplelistComponent
      },

      {
        path: 'principle-edit/:id',
        component: VisionmissionaddComponent
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
