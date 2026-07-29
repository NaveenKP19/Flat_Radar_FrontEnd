// import { Component } from '@angular/core';
// import { RegisterRequest } from 'src/app/models/register-request';
// import { AuthService } from 'src/app/services/auth.service';
// import { Router } from '@angular/router';
// import { ToastServiceService } from 'src/app/services/toast.service.service';
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {

//     firstName : string ='';
//     lastName : string ='';
//     email :string='';
//     password :string ='';
//     mobileNumber :string='';
//     role :string = '';
//     gender :string='';
//     aadhaarNumber : string ='';

//     city :string='';
//     state : string='';
//     pincode : string='';
//     street : string ='';

//     showPassword=false;

//     constructor(private authService:AuthService,private router :Router,
//       private toast:ToastServiceService
//     ){}
    
//     registerUser(){
//     const user:RegisterRequest={
//     firstName : this.firstName,
//     lastName : this.lastName,
//     email :this.email,
//     password :this.password,
//     mobileNumber :this.mobileNumber,
//     role :this.role,
//     gender :this.gender,
//     city :this.city,
//     state : this.state,
//     pincode : this.pincode,
//     aadhaarNumber : this.aadhaarNumber,
//     street : this.street
//     };

//     this.authService.register(user).subscribe({
//       next:(response)=>{
//         console.log("Registeration Succesfully");
//         console.log(response);
// this.toast.success('Registeration Successful');
//         this.router.navigate(['/'])
//       },
//       error:(error)=>{
//          console.log("Registration Failed");
//         console.error(error);
//         this.toast.error(error.error.message || 'Registeration Failed');
//       }
//     });

    

//     }
//     togglePassword(){
//       this.showPassword=!this.showPassword;
//     }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from 'src/app/models/register-request';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/services/toast.service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastServiceService
  ) {}

  ngOnInit(): void {

    this.registerForm = this.fb.group({

      firstName: ['', Validators.required],
      lastName: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(8)]],

      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
      ],

      aadhaarNumber: [
        '',
        [Validators.required, Validators.pattern(/^\d{12}$/)]
      ],

      gender: ['', Validators.required],

      role: ['', Validators.required],

      city: ['', Validators.required],
      state: ['', Validators.required],
      street: ['', Validators.required],

      pincode: [
        '',
        [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]
      ]
    });
  }

  registerUser() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.toast.error('Please fix validation errors');
      return;
    }

    const user: RegisterRequest = this.registerForm.value;

    this.authService.register(user).subscribe({
      next: (response) => {
        console.log("Registration Successful");
        console.log(response);

        this.toast.success('Registration Successful');
        this.router.navigate(['/']);
      },
      // error: (error) => {
      //   console.log("Registration Failed");
      //   console.error(error);

      //   this.toast.error(error.error.message || 'Registration Failed');
      // }
      error: (error) => {
  console.log("FULL ERROR:", error);
  console.log("BACKEND RESPONSE:", error.error);

  this.toast.error(
    error.error?.message || JSON.stringify(error.error) || 'Registration Failed'
  );
}
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}