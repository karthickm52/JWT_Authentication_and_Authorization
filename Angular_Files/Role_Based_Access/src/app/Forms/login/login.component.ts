import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { LoaderService } from 'src/app/loader.service';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: any;
  invalidMsg = false;
  currentUserData:any;
  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthService,
    user: User,
    private loader:LoaderService
  ) {
    this.user = user;
  }

  ngOnInit(): void { }

  onSubmit(f: NgForm) {

    this.userService.authenticate(f.value.email, f.value.password).subscribe((data) => {
      this.user = data
      sessionStorage.setItem('token',this.user.jwtToken) ;
      this.currentUserData=this.user.user;
      sessionStorage.setItem('currentUser',this.currentUserData.firstname) ;
      sessionStorage.setItem('currentRole',this.currentUserData.role) ;
    });
    if (this.currentUserData.email===f.value.email && this.currentUserData.password === f.value.password) {

     

      // if(this.currentUserData.role==='admin'){
      //   this.router.navigate(['admin']);
      // }
      // else{
        this.router.navigate(['homepage']);
      // }
    
     
    } else{
      this.invalidMsg = true;
    }
    
    
  }
}
