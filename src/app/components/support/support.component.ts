import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../firebase.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class SupportComponent {
  // FIX: Cast injected service to `any` to resolve type errors due to missing type definitions.
  firebaseService = inject(FirebaseService) as any;

  description = '';
  photoFile: File | null = null;
  videoFile: File | null = null;

  isSubmitting = signal(false);
  toastMessage = signal<{ text: string, type: 'success' | 'error' } | null>(null);

  onPhotoSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.photoFile = fileList[0];
    }
  }

  onVideoSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.videoFile = fileList[0];
    }
  }

  async submitTicket() {
    if (!this.description.trim()) {
      this.showToast("Please provide a description.", "error");
      return;
    }
    this.isSubmitting.set(true);
    const result = await this.firebaseService.createSupportTicket(this.description, this.photoFile, this.videoFile);
    if(result.error) {
      this.showToast(`Error: ${result.error}`, 'error');
    } else {
      this.showToast('Ticket submitted successfully!', 'success');
      this.description = '';
      this.photoFile = null;
      this.videoFile = null;
      // How to reset file inputs? A bit tricky in Angular. Easiest is to reset the form.
      // For this implementation, we will just clear the models. User can select a new file.
    }
    this.isSubmitting.set(false);
  }

  showToast(text: string, type: 'success' | 'error') {
    this.toastMessage.set({ text, type });
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
