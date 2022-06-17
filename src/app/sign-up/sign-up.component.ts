import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../_services/accounts.service';
import { IRegisterUser } from '../_interfaces/registerUser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  //
  message: string = '';
  signUpForm: FormGroup;
  registrationError: boolean = false;
  registrationSuccess: boolean = false;

  //
  constructor(
    private formbuild: FormBuilder,
    private accountService: AccountsService
  ) {
    this.signUpForm = this.buildSignUpForm(this.formbuild);
  }

  ngOnInit(): void {}

  onClickRegister() {
    console.log('Sign Up...', this.signUpForm.value);
    if (this.signUpForm.valid)
      this.accountService
        .register(<IRegisterUser>this.signUpForm.value)
        .subscribe(
          (resp) => {
            this.signUpForm.reset();
            this.message = 'User register successfully';
            this.registrationSuccess = true;
            this.registrationError = false;
          },
          (err) => {
            this.signUpForm.reset();
            console.log(err);
            this.message = err.error;
            this.registrationError = true;
            this.registrationSuccess = false;
          }
        );
    else this.signUpForm.reset();
  }

  private buildSignUpForm(formBuild: FormBuilder): FormGroup {
    return formBuild.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      gender: '',
      contactNumber: [Number, Validators.maxLength(10)],
    });
  }
}
