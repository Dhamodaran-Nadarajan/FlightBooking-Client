import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginStatus } from '../_interfaces/loginStatus';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Input() isUserLoggedIn: boolean = false;
  constructor(private router: Router) {
    if (localStorage.getItem('jwt')) this.isUserLoggedIn = true;
  }

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.router
      .navigateByUrl('/navbar', { skipLocationChange: false })
      .then(() => {
        this.router.navigate(['login']);
      });
  }
}
