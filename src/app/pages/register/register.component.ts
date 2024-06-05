import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../types/User';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  get username() {
    return this.registerForm.controls['username'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    if (this.registerForm.valid) {
      this.authService.checkEmailExists(this.email.value!).subscribe(
        emailExists => {
          if (emailExists) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Đăng kí thất bại",
              text: "Email này đã được đăng kí.",
              showConfirmButton: true
            });
          } else {
            const postData = { ...this.registerForm.value };
            delete postData.confirmPassword;
            this.authService.registerUser(postData as User).subscribe(
              response => {
                console.log(response);
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Đăng kí thành công!!!",
                  showConfirmButton: false,
                  timer: 1500
                });
                this.router.navigate(['login']);
              },
              error => {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Đăng kí thất bại",
                  text: "Có lỗi xảy ra, vui lòng thử lại sau.",
                  showConfirmButton: true
                });
              }
            );
          }
        },
        error => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Đăng kí thất bại",
            text: "Có lỗi xảy ra, vui lòng thử lại sau.",
            showConfirmButton: true
          });
        }
      );
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Đăng kí thất bại",
        text: "Vui lòng điền đầy đủ và chính xác các trường thông tin.",
        showConfirmButton: true
      });
    }
  }
}
