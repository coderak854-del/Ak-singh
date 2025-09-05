import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FirebaseService } from '../../firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CurrencyPipe],
})
export class ProfileComponent {
  // FIX: Cast injected service to `any` to resolve type errors due to missing type definitions.
  firebaseService = inject(FirebaseService) as any;
  userProfile = this.firebaseService.userProfile;
  appSettings = this.firebaseService.appSettings;

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.firebaseService.logoutUser();
    }
  }

  get profileAvatar(): string {
    const profile = this.userProfile();
    const displayName = profile?.displayName || profile?.email?.split('@')[0] || 'User';
    return profile?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0F172A&color=E2E8F0&bold=true&size=70`;
  }
  
  openPolicy(type: string) {
    // Basic alert, could be implemented with a modal service
    let content = 'Not available.';
    const settings = this.appSettings();
    if (settings) {
        switch(type) {
            case 'privacy': content = settings.policyPrivacy || content; break;
            case 'terms': content = settings.policyTerms || content; break;
            case 'refund': content = settings.policyRefund || content; break;
            case 'fairPlay': content = settings.policyFairPlay || content; break;
            case 'refer': 
                const refCode = this.userProfile()?.referralCode || 'N/A';
                const refBonus = settings.referralBonus || 0;
                content = `${settings.referralDescription || `Get ₹${refBonus} for each referral!`}\n\nYour code: ${refCode}`;
                break;
        }
    }
    alert(content);
  }
}
