import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users:User[]=[];
  currentuser:any;
  constructor(private userService:UserService , private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.findAll().subscribe(data=>{
      this.users=data;
      console.log(this.users);
    })
    this.currentuser=this.router.snapshot.params['username'];

  }
  
}
