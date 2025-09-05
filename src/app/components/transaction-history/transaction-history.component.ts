import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FirebaseService } from '../../firebase.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CurrencyPipe, DatePipe],
})
export class TransactionHistoryComponent {
  // FIX: Cast injected service to `any` to resolve type errors due to missing type definitions.
  firebaseService = inject(FirebaseService) as any;
  allTransactions = this.firebaseService.allTransactions;

  constructor() {
    this.firebaseService.loadAllTransactions();
  }
}
