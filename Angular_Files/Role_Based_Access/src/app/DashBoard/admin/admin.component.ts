import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

declare var $:any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public users:any;
  currentuser: any;
  user: User = new User();
  user2: User = new User();
  conpass = false;
  closeResult = '';
  u: User = new User();

  constructor(private userService: UserService, private router: ActivatedRoute, private routers: Router, private modalService: NgbModal, public auth:AuthService) { 
    console.log('cons')
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(data => {
      this.users = data;
      console.log(data)
      
    console.log(this.users)
    });
    this.currentuser = sessionStorage.getItem('currentUser')
    
  }

  delete(id: any) {
    this.userService.delete(id).subscribe(data => { this.userService.findAll().subscribe(data => this.users = data) });
  }

  updatebyId(id: any, content: any) {
    this.userService.findById(id).subscribe(data => this.user = data);
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    console.log(f.value)
    this.user2.firstname = f.value.firstname;
    this.user2.email = f.value.email;
    this.user2.id = this.user.id;
    this.user2.gender=this.user.gender;
    this.user2.password=this.user.password
    this.user2.mobile = f.value.mobile;
    this.user2.role=this.user.role;
    this.updateUser();
  }


  updateUser() {
    this.userService.save(this.user2).subscribe(data => {this.userService.findAll().subscribe(data => this.users = data) });
    this.user2 = new User();
    this.ngOnInit()
  };
}
