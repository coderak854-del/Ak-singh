import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../firebase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  // FIX: Cast injected service to `any` to resolve type errors due to missing type definitions.
  firebaseService = inject(FirebaseService) as any;

  showLogin = signal(true);
  
  loginEmail = '';
  loginPassword = '';
  
  signupEmail = '';
  signupPassword = '';
  signupConfirmPassword = '';
  signupReferralCode = '';

  loginMessage = signal<{text: string, type: string} | null>(null);
  signupMessage = signal<{text: string, type: string} | null>(null);
  
  async onLogin() {
    this.loginMessage.set(null);
    const result = await this.firebaseService.loginWithEmail(this.loginEmail, this.loginPassword);
    if (result.error) {
      this.loginMessage.set({ text: result.error, type: 'danger' });
    }
  }

  async onSignup() {
    this.signupMessage.set(null);
    if (this.signupPassword !== this.signupConfirmPassword) {
        this.signupMessage.set({ text: "Passwords don't match.", type: 'warning'});
        return;
    }
     if (this.signupPassword.length < 6) {
        this.signupMessage.set({ text: "Password must be at least 6 characters.", type: 'warning'});
        return;
    }

    const result = await this.firebaseService.signUpWithEmail(this.signupEmail, this.signupPassword, this.signupReferralCode);
    if (result.error) {
       this.signupMessage.set({ text: result.error, type: 'danger' });
    }
  }

  async onForgotPassword() {
      this.loginMessage.set(null);
      if (!this.loginEmail) {
          this.loginMessage.set({ text: 'Enter email for password reset.', type: 'warning'});
          return;
      }
      const result = await this.firebaseService.resetPassword(this.loginEmail);
      if (result.error) {
          this.loginMessage.set({ text: result.error, type: 'danger' });
      } else {
          this.loginMessage.set({ text: 'Password reset email sent! Check your inbox.', type: 'success' });
      }
  }
  
  toggleForm(showLogin: boolean) {
    this.showLogin.set(showLogin);
    this.loginMessage.set(null);
    this.signupMessage.set(null);
  }
}
