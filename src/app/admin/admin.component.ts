import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper.service';
import { routes } from '../app-routing.module';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public helperService: HelperService,
    public http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {

    $('.dropdown-trigger').dropdown();
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
    $('select').formSelect();
    // document.addEventListener('DOMContentLoaded', function () {
    //   var elems = document.querySelectorAll('.collapsible');
    //   var instances = M.Collapsible.init('accordion', true);
    // });
  }

  logout() {
    this.helperService.adminLogout();
    this.toastr.success("Logged out successfully!");
    this.router.navigate(['/session', 'login']);
  }

}
