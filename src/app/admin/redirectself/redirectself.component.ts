import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirectself',
  templateUrl: './redirectself.component.html',
  styleUrls: ['./redirectself.component.css']
})
export class RedirectselfComponent implements OnInit {
  data: any;

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
    this.data = history.state;
    this.router.navigate([this.data[0],this.data[1]])
  }

}
