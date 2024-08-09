import { Component, OnInit } from '@angular/core';
import { Card, User } from '../../../../directus';
import { CommonModule } from '@angular/common';
import { directus } from '../../../../directus';
import { readItem } from '@directus/sdk';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-user-details.component.html',
  styleUrl: './view-user-details.component.css',
})
export class ViewUserDetailsComponent implements OnInit {
  user: User;
  cnic: string;
  validParams: boolean;
  creditCardInformation: Card[];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.validParams = true;
    this.cnic = null;
    this.user = null;
    this.creditCardInformation = [];
  }

  async ngOnInit(): Promise<void> {
    this.route.queryParamMap.subscribe((params) => {
      this.cnic = params.get('cnic') || null;
      if (this.cnic === null) {
        this.validParams = false;
      } else {
        this.validParams = true;
      }
    });

    this.user = await directus.request<User>(readItem('user', this.cnic));
    this.user.cnic = this.cnic;

    for (let card_id of this.user.credit_card) {
      const card = await directus.request<Card>(
        readItem('credit_card', card_id)
      );
      this.creditCardInformation.push(card);
    }
  }
}
