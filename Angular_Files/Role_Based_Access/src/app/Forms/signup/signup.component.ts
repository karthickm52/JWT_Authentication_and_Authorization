import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  status: any;
  conpass = false;
  conpass1 = false;
  currentUser: any;
  u: User = new User();

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    
  }
  registerForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('[a-zA-Z].*'),
    ]),

    role: new FormControl('', [Validators.required]),

    email: new FormControl('', [Validators.required, Validators.email]),

    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),

    gender: new FormControl('', [Validators.required]),

    pwd: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    cpwd: new FormControl('', [Validators.required]),
  });

  registerSubmitted() {
    if (this.PWD.value === '' && this.CPWD.value === '') {
      this.conpass1 = true;
    } else if (this.PWD.value == this.CPWD.value) {
      this.conpass = false;
      this.u.firstname = this.FirstName.value;
      this.u.role = this.Role.value;
      this.u.email = this.Email.value;
      this.u.mobile = this.Mobile.value;
      this.u.gender = this.Gender.value;
      this.u.password = this.PWD.value;
      this.u.id = '';
      this.save();
      
    } else {
      this.conpass = true;
    }
  }

  save() {
    this.userService.save(this.u).subscribe((data) => console.log(data));
    this.u = new User();
    if (sessionStorage.getItem('currentRole') ==='admin' ) {
        this.router.navigate(['homepage']);
      } else {
        this.router.navigate(['login']);
      }
  }

  get FirstName(): FormControl {
    return this.registerForm.get('firstname') as FormControl;
  }
  get Role(): FormControl {
    return this.registerForm.get('role') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get Mobile(): FormControl {
    return this.registerForm.get('mobile') as FormControl;
  }
  get Gender(): FormControl {
    return this.registerForm.get('gender') as FormControl;
  }

  get PWD(): FormControl {
    return this.registerForm.get('pwd') as FormControl;
  }
  get CPWD(): FormControl {
    return this.registerForm.get('cpwd') as FormControl;
  }
}
