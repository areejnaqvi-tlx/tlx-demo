import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { directus, Card } from '../../../../directus';
import { readItem, readItems } from '@directus/sdk';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-credit-card-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credit-card-selection.component.html',
  styleUrl: './credit-card-selection.component.css',
})
export class CreditCardSelectionComponent implements OnInit {
  errorMessage: string;
  creditCards: Card[];
  selectedCardType: number;
  cnic: string;
  validDetails: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.selectedCardType = -1;
    this.errorMessage = '';
    this.validDetails = true;
  }

  async ngOnInit() {
    try {
      // get cnic from params
      this.route.queryParamMap.subscribe((params) => {
        this.cnic = params.get('cnic') || '';
        if (this.cnic === '') {
          this.validDetails = false;
        } else {
          this.validDetails = true;
        }
      });

      // get credit card information from directus
      const response = await directus.request(readItems('credit_card'));
      this.errorMessage = '';
      this.creditCards = response.length > 0 ? (response as Card[]) : [];
    } catch (error) {
      console.log('Error getting credit card information: ', error);
      this.errorMessage =
        'An error occurred when loading credit card information, please try again later.';
      this.creditCards = [];
    }
  }

  // in case of error in cnic
  goBack() {
    this.router.navigate(['id-verification']);
  }

  // once credit card has been selected
  onContinue() {
    console.log('selected: ', this.selectedCardType);
    if (this.selectedCardType !== -1) {
      this.router.navigate(['/user-details'], {
        queryParams: { cnic: this.cnic, cardType: this.selectedCardType },
      });
    } else {
      this.validDetails = false;
    }
  }
}
