import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { NgxPermissionsModule, NgxPermissionsModuleConfig } from 'ngx-permissions';
import {ErrorInterceptor} from './errorinterceptor.interceptor'
import {JwtInterceptor} from './jwt.interceptor'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import {MaterializeModule} from 'materialize-css';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from 'ng2-ckeditor';
import { ForbiddenComponent } from './commonpages/forbidden/forbidden.component';

import { AgmCoreModule } from '@agm/core';

import { NgxChartsModule} from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';

// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
//   bgsType: SPINNER.fadingCircle,
//   hasProgressBar: true
// };

import { FilterPipe } from './filter.pipe';
import { BehaviorSubject } from 'rxjs';


const ngxUiLoaderConfig: NgxUiLoaderConfig =
{
  "bgsColor": "#2e8b57",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "rectangle-bounce-pulse-out-rapid",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#2e8b57",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "cube-grid",
  "gap": 24,
  // "logoPosition": "center-center",
  // "logoSize": 120,
  // "logoUrl": "../../assets/img/logo.png",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(232,217,217,0.8)",
  "pbColor": "#2e8b57",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  // "text": "Soil Charge Technology",
  // "textColor": "#2e8b57",
  // "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenComponent,
    FilterPipe
      ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //  MaterializeModule
    ReactiveFormsModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot({
      rolesIsolate: false,
      permissionsIsolate: false,
      configurationIsolate: false
    }),
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CKEditorModule,
    NgxChartsModule,

    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdpq_DETv3oRGNzpTn-BdFSIwHvOgyQAU'
    }),

    

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },

    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor , multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
