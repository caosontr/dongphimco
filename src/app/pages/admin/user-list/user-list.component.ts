import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../../../types/User';
import { AuthService } from '../../../services/auth.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, RouterLink, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  users: User[] = [];

  authService = inject(AuthService);

  ngOnInit() {
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }
  handleDeleteUser(id: string) {
    if (window.confirm('Bạn có muốn xóa không?')) {
      this.authService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== id);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  }
}
