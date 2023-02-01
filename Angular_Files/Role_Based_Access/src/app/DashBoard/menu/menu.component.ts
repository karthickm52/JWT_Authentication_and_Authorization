import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  public users: User[] = [];
  currentuser: any;
  conpass = false;
  closeResult = '';
  currentRole: any;
  constructor(
    public auth: AuthService,
    private routers: Router,
    
    
  ) {
   
  }

  ngOnInit(): void {
    this.currentuser=this.auth.currentUser()
    this.currentRole=this.auth.currentRole()
  }

  logout() {
    this.auth.logout();
    this.currentRole='';
  }

  addUser() {
    this.routers.navigate(['/add-user']);
  }
}
