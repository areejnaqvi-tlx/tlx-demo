import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardSelectionComponent } from './credit-card-selection.component';

describe('CreditCardSelectionComponent', () => {
  let component: CreditCardSelectionComponent;
  let fixture: ComponentFixture<CreditCardSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditCardSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
