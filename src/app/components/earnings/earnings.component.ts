import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FirebaseService } from '../../firebase.service';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CurrencyPipe],
})
export class EarningsComponent {
  // FIX: Cast injected service to `any` to resolve type errors due to missing type definitions.
  firebaseService = inject(FirebaseService) as any;
  userProfile = this.firebaseService.userProfile;

  viewHistory() {
    alert('Earnings history coming soon!');
  }
}
