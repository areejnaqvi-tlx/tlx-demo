import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { directus, Card, User } from '../../../../directus';
import {
  createItem,
  readItem,
  readItems,
  triggerFlow,
  updateItem,
} from '@directus/sdk';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import AreObjectsEqual from '../../../../public/are-objects-equal';
import { environment } from '../../../environments/environment';

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
  existingUser: boolean;
  cardsAvailable: boolean;
  imageUrl: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.selectedCardType = -1;
    this.errorMessage = '';
    this.validDetails = true;
    this.creditCards = [];
    this.cardsAvailable = true;
    this.imageUrl = `${environment.directusApiUrl}/assets/`;
  }

  async ngOnInit() {
    try {
      // get cnic from params
      this.route.queryParamMap.subscribe((params) => {
        this.cnic = params.get('cnic') || '';
        this.existingUser = params.get('existingUser') === 'true' || false;
        if (this.cnic === '') {
          this.validDetails = false;
        } else {
          this.validDetails = true;
        }
      });

      // get credit card information from directus
      const response = await directus.request<Card[]>(readItems('credit_card'));
      if (Array.isArray(response) && response.length > 0) {
        this.errorMessage = '';
      } else {
        this.errorMessage =
          'Unable to fetch credit card information, please try again later.';
      }
      if (!this.existingUser) {
        this.creditCards = response;
      } else {
        const user = await directus.request<User>(readItem('user', this.cnic));
        if (user.credit_card && user.credit_card.length > 0) {
          for (let card of response) {
            if (!user.credit_card.includes(card.id)) {
              this.creditCards.push(card);
            }
          }
        } else {
          this.creditCards = response;
        }
      }
      if (this.creditCards.length === 0) {
        this.cardsAvailable = false;
      }
    } catch (error) {
      console.log('Error getting credit card information: ', error);
      this.errorMessage =
        'An error occurred when loading credit card information, please try again later.';
    }
  }

  // in case of error in cnic
  goBack() {
    this.router.navigate(['id-verification']);
  }

  viewInformation() {
    this.router.navigate(['view-user-details'], {
      queryParams: {
        cnic: this.cnic,
      },
    });
  }

  // once credit card has been selected
  async onContinue() {
    if (this.selectedCardType !== -1 && !this.existingUser) {
      this.router.navigate(['/user-details'], {
        queryParams: { cnic: this.cnic, cardType: this.selectedCardType },
      });
    } else if (this.selectedCardType !== -1 && this.existingUser) {
      const user = await directus.request<User>(readItem('user', this.cnic));
      const card = await directus.request<Card>(
        readItem('credit_card', this.selectedCardType)
      );
      const update = await directus.request(
        updateItem('user', this.cnic, {
          credit_card: [...user.credit_card, card],
        })
      );
      this.router.navigate(['/success'], {
        queryParams: { user: user.given_name, cnic: this.cnic },
      });
    } else {
      this.validDetails = false;
    }
  }

  getImageUrl(card_image) {
    return this.imageUrl + card_image;
  }

  selectCard(cardId: number) {
    this.selectedCardType = cardId;
  }
}
