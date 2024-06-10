import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../shared/password-match.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  userForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    {
      validators: passwordMatchValidator,
    }
  );

  get username() {
    return this.userForm.controls['username'];
  }

  get email() {
    return this.userForm.controls['email'];
  }

  get password() {
    return this.userForm.controls['password'];
  }

  get confirmPassword() {
    return this.userForm.controls['confirmPassword'];
  }

  handleSubmit() {
    if (this.userForm.valid) {
      this.authService.checkEmailExists(this.email.value!).subscribe(
        (emailExists) => {
          if (emailExists) {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Đăng kí thất bại',
              text: 'Email này đã được đăng kí.',
              showConfirmButton: true,
            });
          } else {
            const postData = { ...this.userForm.value };
            delete postData.confirmPassword;
            this.authService.registerUser(postData).subscribe(
              (response) => {
                console.log(response);
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Đăng kí thành công!!!',
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.router.navigate(['login']);
              },
              (error) => {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Đăng kí thất bại',
                  text: 'Có lỗi xảy ra, vui lòng thử lại sau.',
                  showConfirmButton: true,
                });
              }
            );
          }
        },
        (error) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Đăng kí thất bại',
            text: 'Có lỗi xảy ra, vui lòng thử lại sau.',
            showConfirmButton: true,
          });
        }
      );
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Vui lòng điền đầy đủ và chính xác các trường thông tin.',
        showConfirmButton: true,
      });
    }
  }
}
