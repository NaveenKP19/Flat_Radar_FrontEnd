import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { ToastServiceService } from 'src/app/services/toast.service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  showPopup=false;

  constructor(private router : Router,
    private toast :ToastServiceService
  ){}

  logout(){
    this.showPopup=true;
  }

  closePopup(){
    this.showPopup=false;
  }

  confirmLogout(){
    localStorage.removeItem('token');
    this.toast.info('Logged Out Succesfully');
    // this.showPopup=false;
    this.router.navigate(['/'])
  }
}
