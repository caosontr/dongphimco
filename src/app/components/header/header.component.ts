import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RegisterComponent } from '../../pages/register/register.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink, RegisterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  title = 'Homeppage';
  menuList = [
    {
      label: 'Home',
      link: '/',
    },
    {
      label: 'About Us',
      link: '/about-us',
    },
    {
      label: 'Shop',
      link: '/shop',
    },
    {
      label: 'Contact',
      link: '/',
    },
  ]; // NgFor
}
