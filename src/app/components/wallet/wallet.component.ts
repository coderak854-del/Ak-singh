import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FirebaseService } from '../../firebase.service';
import { NavigationService } from '../../navigation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CurrencyPipe, DatePipe, FormsModule],
})
export class WalletComponent {
  // FIX: Cast injected service to `any` to resolve type errors due to missing type definitions.
  firebaseService = inject(FirebaseService) as any;
  navigationService = inject(NavigationService);

  userProfile = this.firebaseService.userProfile;
  recentTransactions = this.firebaseService.recentTransactions;
  appSettings = this.firebaseService.appSettings;
  
  constructor() {
    this.firebaseService.loadRecentTransactions();
  }

  viewAllTransactions() {
    this.navigationService.navigateTo('transaction-history', 'Transaction History');
  }

  addAmount() {
    this.navigationService.navigateTo('deposit', 'Make a Deposit');
  }
}
