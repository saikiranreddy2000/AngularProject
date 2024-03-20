import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userSerivce: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
login2=async()=>{
  const user=await fetch('http://localhost:3000/user');
  const jsonUser=user.json();
}
  login() {
    this.http.get<any>('http://localhost:3000/user').subscribe(
      (res) => {
        console.log(res);
        const user = res.find((a: any) => {
          return (a.email ==this.loginForm.value.email &&
            a.password === this.loginForm.value.password);
        });

        if (user) {
          this.userSerivce.setUser(user);
          this.loginForm.reset();
          if (user.role == 'Admin') {
            this.router.navigate(['/home/adm']);
          } else if (user.role == 'Staff') {
            this.router.navigate(['/home/staff']);
          }
          // this.router.navigate(['home']);
        } else {
          alert('user not found');
        }
      },
      (err) => {
        alert('something went wrong!');
      }
    );
  }
}
