import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var M: any;
@Component({
  selector: 'app-adminsidebar',
  templateUrl: './adminsidebar.component.html',
  styleUrls: ['./adminsidebar.component.css']
})
export class AdminsidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.dropdown-trigger').dropdown();
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
    $('select').formSelect();
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init('accordion', true);
    });

   
      // $('#pageDataTable').DataTable();
 

  }

}
