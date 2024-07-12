import { Component, OnInit } from '@angular/core';
import { directus, Home } from '../../../../directus';
import { readSingleton } from '@directus/sdk';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  home: Home;
  errorMessage: string;

  constructor(private router: Router) {
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.getHome();
  }

  async getHome() {
    try {
      this.home = await directus.request<Home>(readSingleton('home'));
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage =
        'There was an error loading the site, please try again later.';
      console.log('Unable to get data from Directus: ', error);
    }
  }

  continue(): void {
    this.router.navigate(['/id-verification']);
  }
}
