import { Component, OnInit } from '@angular/core';
import { IRegisterUser } from '../_interfaces/registerUser';
import { AccountsService } from '../_services/accounts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: IRegisterUser;
  successMessage: string = '';
  errorMessage: string = '';
  registrationError: boolean = false;
  registrationSuccess: boolean = false;

  constructor(private accountService: AccountsService) {
    this.InitializeRegisterForm();
  }

  ngOnInit(): void {}

  Register() {
    console.log('Registration Model:', this.model);
    this.accountService.register(this.model).subscribe(
      (response) => {
        console.log('Response from UserManagement API: ', response);
        this.registrationSuccess = true;
        this.registrationError = false;
      },
      (error) => {
        console.log('Error Response from UserManagement API: ', error);
        this.registrationError = true;
        this.registrationSuccess = false;
        this.errorMessage = error.error.message;
        console.log(
          'Error Message from UserManagement API: ',
          this.errorMessage
        );
      }
    );
    this.InitializeRegisterForm();
  }

  InitializeRegisterForm() {
    this.model = {
      username: '',
      password: '',
      email: '',
      gender: '',
      contactNumber: NaN,
    };
  }
}
