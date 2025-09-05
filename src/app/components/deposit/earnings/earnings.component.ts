
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
  firebaseService = inject(FirebaseService);
  userProfile = this.firebaseService.userProfile;

  viewHistory() {
    alert('Earnings history coming soon!');
  }
}
