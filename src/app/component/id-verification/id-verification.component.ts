import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { directus } from '../../../../directus';
import { readItems } from '@directus/sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-id-verification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './id-verification.component.html',
  styleUrl: './id-verification.component.css',
})
export class IdVerificationComponent {
  cnic: string;
  errorMessage: string;

  constructor(private router: Router) {
    this.cnic = '';
    this.errorMessage = '';
  }

  async verifyId() {
    this.cnic.replaceAll('-', '');
    if (this.cnic.length === 13) {
      try {
        const response = await this.getUser();
        if (
          response !== null &&
          response.some((userId) => userId['id'] === this.cnic)
        ) {
          this.errorMessage = 'You already have an account!';
          this.router.navigate(['/credit-card-selection'], {
            queryParams: { cnic: this.cnic, existingUser: true },
          });
        } else {
          this.errorMessage = '';
          this.router.navigate(['/credit-card-selection'], {
            queryParams: { cnic: this.cnic, existingUser: false },
          });
        }
      } catch (error) {
        this.errorMessage = 'There was an error, please try again later.';
        console.log('Error in verifying CNIC: ', error);
      }
    } else {
      this.errorMessage = 'Please enter a valid 13 digit value';
    }
  }

  async getUser() {
    try {
      const response = await directus.request(
        readItems('user', {
          fields: ['id'],
        })
      );
      return response;
    } catch (error) {
      console.log('Error getting user information: ', error);
      return null;
    }
  }
}
