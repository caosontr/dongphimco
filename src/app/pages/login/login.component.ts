import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
  export class LoginComponent {
    loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
    ) { }

    get email() {
      return this.loginForm.controls['email'];
    }
    get password() { return this.loginForm.controls['password']; }

    loginUser() {
      const { email, password } = this.loginForm.value;
      this.authService.getUserByEmail(email as string).subscribe(
        response => {
          if (response.length > 0 && response[0].password === password) {
            sessionStorage.setItem('email', email as string);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Đăng nhập thành công!!!",
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/home']);
          } else {
          }
        },
        error => {
        }

      )
    }
  }
