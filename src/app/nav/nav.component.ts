import { Component, Input, OnInit } from '@angular/core';
import { ILoginStatus } from '../_interfaces/loginStatus';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Input() isUserLoggedIn: boolean = false;
  constructor() {}

  ngOnInit(): void {
    if (localStorage.getItem('jwt')) this.isUserLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('jwt');
  }
}
