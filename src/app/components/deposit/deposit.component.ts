import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../firebase.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class DepositComponent {
  // FIX: Cast injected service to `any` to resolve type errors due to missing type definitions.
  firebaseService = inject(FirebaseService) as any;

  selectedMethod = signal<'gpay' | 'phonepe' | null>(null);
  qrCodeUrl = signal<string | null>(null);
  isQrLoading = signal(false);
  
  isSubmitting = signal(false);
  submissionSuccess = signal(false);

  userName = '';
  userId = computed(() => this.firebaseService.userProfile()?.uid || '');
  amount = '';
  transactionId = '';
  
  constructor() {
    this.userName = this.firebaseService.userProfile()?.displayName || '';
  }

  async selectPaymentMethod(method: 'gpay' | 'phonepe') {
    this.selectedMethod.set(method);
    this.qrCodeUrl.set(null);
    this.isQrLoading.set(true);
    const url = await this.firebaseService.getQrCodeUrl(method);
    this.qrCodeUrl.set(url);
    this.isQrLoading.set(false);
  }

  async submitDetails() {
    if(!this.userName || !this.userId() || !this.amount || !this.transactionId) {
      alert('Please fill all fields');
      return;
    }
    this.isSubmitting.set(true);
    const result = await this.firebaseService.submitDepositRequest({
      userName: this.userName,
      userId: this.userId(),
      amount: Number(this.amount),
      transactionId: this.transactionId,
    });
    
    if (result.error) {
      alert(`Submission failed: ${result.error}`);
    } else {
      this.submissionSuccess.set(true);
    }
    this.isSubmitting.set(false);
  }
}
