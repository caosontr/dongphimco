import { User } from './../../types/User';
import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private route: ActivatedRoute) {}
  user!: User | undefined;

  authService = inject(AuthService);

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  title = 'Homeppage';
  menuList = [
    {
      label: 'Home',
      link: '/',
    },
  ];
}
