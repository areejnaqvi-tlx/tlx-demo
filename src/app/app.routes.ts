import { Routes } from '@angular/router';
import { IdVerificationComponent } from './component/id-verification/id-verification.component';
import { HomeComponent } from './component/home/home.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { CreditCardSelectionComponent } from './component/credit-card-selection/credit-card-selection.component';
import { SuccessComponent } from './component/success/success.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'id-verification', component: IdVerificationComponent },
  { path: 'user-details', component: UserDetailsComponent },
  {
    path: 'credit-card-selection',
    component: CreditCardSelectionComponent,
  },
  { path: 'success', component: SuccessComponent },
];
