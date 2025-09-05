import { Component, ChangeDetectionStrategy, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { EarningsComponent } from './components/earnings/earnings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SupportComponent } from './components/support/support.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { FirebaseService } from './firebase.service';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    LoginComponent,
    HomeComponent,
    TournamentsComponent,
    WalletComponent,
    DepositComponent,
    EarningsComponent,
    ProfileComponent,
    SupportComponent,
    TransactionHistoryComponent,
  ],
})
export class AppComponent implements OnInit {
  // FIX: Cast injected service to `any` to resolve type errors due to missing type definitions.
  firebaseService = inject(FirebaseService) as any;
  navigationService = inject(NavigationService);

  activeSection = this.navigationService.activeSection;
  showBackButton = this.navigationService.showBackButton;
  headerTitle = this.navigationService.headerTitle;

  isLoggedIn = this.firebaseService.isLoggedIn;
  userProfile = this.firebaseService.userProfile;
  appSettings = this.firebaseService.appSettings;
  
  headerUserGreeting = 'Guest';

  constructor() {
    effect(() => {
        const profile = this.userProfile();
        if (profile) {
            this.headerUserGreeting = profile.displayName?.split(' ')[0] || profile.email?.split('@')[0] || 'User';
        } else {
            this.headerUserGreeting = 'Guest';
        }
    });
  }

  ngOnInit() {
    this.firebaseService.initialize();
  }

  handleNavigation(section: any) {
    this.navigationService.navigateTo(section);
  }

  back() {
    this.navigationService.back();
  }
}
