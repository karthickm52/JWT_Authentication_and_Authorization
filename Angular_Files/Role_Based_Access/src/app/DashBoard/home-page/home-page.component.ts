import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  currentUser:any;
  currentRole: any;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.currentUser=this.auth.currentUser();
    this.currentRole=this.auth.currentRole();
  }

}
