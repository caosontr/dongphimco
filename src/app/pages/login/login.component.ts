import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

// Import PrimeNG modules
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    CardModule,
    ButtonModule,
    InputTextModule,
  ], // Include PrimeNG modules here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authservice = inject(AuthService);
  router = inject(Router);

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  get username() {
    return this.userForm.controls['username'];
  }

  get email() {
    return this.userForm.controls['email'];
  }

  get password() {
    return this.userForm.controls['password'];
  }

  handleSubmit() {
    console.log(this.userForm.value);
    this.authservice.loginUser(this.userForm.value).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem(
          'token',
          (data as { accessToken: string }).accessToken
        );
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Đăng nhập thành công!!!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/']);
      },
      (error) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Thông tin tài khoản mật khẩu không ch!!!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
}
