import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginStatus } from '../_interfaces/loginStatus';
import { ILoginUser } from '../_interfaces/loginUser';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<ILoginStatus>();
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  messageContent: string = '';

  constructor(
    private formBuild: FormBuilder,
    private accountService: AccountsService,
    private router: Router
  ) {
    this.loginForm = this.formBuild.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onClickLogin() {
    if (this.loginForm.valid)
      this.accountService.login(this.loginForm.value).subscribe(
        (response) => {
          this.invalidLogin = false;
          const resp = <User>response;
          localStorage.setItem('jwt', resp.token);
          if (resp.username === 'Admin_User') {
            this.router.navigate(['/airline']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          var resp = error;
          this.messageContent = resp.error;
          this.invalidLogin = true;
        }
      );
  }
}

interface User {
  username: string;
  token: string;
}
