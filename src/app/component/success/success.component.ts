import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card, directus, User } from '../../../../directus';
import { CommonModule } from '@angular/common';
import { readItem } from '@directus/sdk';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent implements OnInit {
  username: string;
  validParams: boolean;
  cnic: string;
  cards: number[];
  user: User;
  userInformationVisible: boolean;
  creditCardInformation: Card[];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.validParams = true;
    this.username = null;
    this.user = null;
    this.creditCardInformation = [];
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.username = params.get('user') || null;
      this.cnic = params.get('cnic') || null;
      if (this.username === null || this.cnic === null) {
        this.validParams = false;
      } else {
        this.validParams = true;
      }
    });
  }

  showUserInformation() {
    this.router.navigate(['view-user-details'], {
      queryParams: {
        cnic: this.cnic,
      },
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
