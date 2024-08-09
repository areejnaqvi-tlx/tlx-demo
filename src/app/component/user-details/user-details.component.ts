import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Card, directus, User } from '../../../../directus';
import { createItem, readItem } from '@directus/sdk';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  user: User;
  validParams: boolean;
  errorMessage: string;
  cardID: number;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.user = {
      cnic: null,
      given_name: null,
      last_name: null,
      email: null,
      mothers_name: null,
      address: null,
      marital_status: null,
      credit_card: null,
    };
    this.validParams = true;
    this.errorMessage = '';
    this.cardID = null;
  }

  async ngOnInit() {
    // get cnic and selected card
    this.route.queryParamMap.subscribe(async (params) => {
      this.user.cnic = params.get('cnic') || '';
      this.cardID = parseInt(params.get('cardType'));
      if (this.user.cnic === '') {
        this.validParams = false;
      } else {
        this.validParams = true;
      }
    });
  }

  //  in case of error in params
  goBack() {
    this.router.navigate(['id-verification']);
  }

  // create new user with submitted information
  async createUser() {
    try {
      // create user
      const card = await directus.request(readItem('credit_card', this.cardID));
      const createdUser = await directus.request(
        createItem('user', {
          id: this.user.cnic,
          given_name: this.user.given_name,
          last_name: this.user.last_name,
          email: this.user.email,
          mothers_name: this.user.mothers_name,
          address: this.user.address,
          marital_status: this.user.marital_status,
          credit_card: [card],
        })
      );
      if (createdUser['id'] === this.user.cnic) {
        this.errorMessage = '';
        this.router.navigate(['/success'], {
          queryParams: { user: this.user.given_name, cnic: this.user.cnic },
        });
      }
      this.validParams = false;
    } catch (error) {
      this.errorMessage =
        'There was an error processing your request. Please check form inputs and try again.';
      console.log('Error is: ', { ...error });
    }
  }
}
