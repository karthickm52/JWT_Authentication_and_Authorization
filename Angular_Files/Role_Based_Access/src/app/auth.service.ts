import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentRole(): any {
    return sessionStorage.getItem('currentRole');
  }


  userPayLoad: any;


  constructor(private router: Router) {
    this.userPayLoad = this.decodedToken();
  }

  logout() {
    sessionStorage.clear();
  }

  currentUser(){
    return sessionStorage.getItem('currentUser')
  }

  isUserLoggedin(){
    return sessionStorage.getItem('token')!=null;
  }
  
  automaticallyLogout() {
    let tokens:any =sessionStorage.getItem('token');
    const expiry = (JSON.parse(atob(tokens.split('.')[1]))).exp;
    console.log(tokens);
    console.log(expiry * 1000);
    setTimeout(() => {
      this.logout();
      Swal.fire({
        position: 'top',
        title: "Token Expired",
        showConfirmButton: false,
        timer: 2250,
      });
      this.router.navigate(['']);
    }, ((expiry * 1000) - new Date().getTime()));
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token:any = sessionStorage.getItem('token');
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getToken(){
    return sessionStorage.getItem('token') || '';
  }
}
