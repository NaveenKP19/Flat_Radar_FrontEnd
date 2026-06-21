import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastServiceService } from 'src/app/services/toast.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastServiceService
  ) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]

    });

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  loginUser() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }

    this.authService.login(this.loginForm.value).subscribe({

      next: (response) => {

        localStorage.setItem('token', response.token);

        this.toast.success('Login Successful');

        this.router.navigate(['/home']);

      },

      error: (err) => {

        this.toast.error(
          err.error?.message || 'Invalid Email or Password'
        );

      }

    });

  }

  get f() {
    return this.loginForm.controls;
  }

}