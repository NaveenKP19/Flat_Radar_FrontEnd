import { Component, OnInit } from '@angular/core';
import { ProfileResponse } from 'src/app/models/profile-response';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone :false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user! : ProfileResponse;

  constructor (private authService : AuthService){}

  ngOnInit(): void {
      this.authService.getProfile().subscribe({
        next: (response)=>{
          this.user =response;
          console.log(response);
        },

        error:(err)=>{
          console.log(err);
        }
      });
  }
}
