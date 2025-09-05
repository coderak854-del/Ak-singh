
import { Injectable, signal } from '@angular/core';
import { SectionId } from '../models';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  activeSection = signal<SectionId>('login');
  headerTitle = signal<string>('');
  showBackButton = signal<boolean>(false);
  
  private sectionHistory: SectionId[] = [];

  navigateTo(sectionId: SectionId, headerTitle?: string, isGameView: boolean = false) {
    if (this.activeSection() !== sectionId) {
        this.sectionHistory.push(this.activeSection());
    }
    
    this.activeSection.set(sectionId);

    const showBack = isGameView || sectionId === 'transaction-history' || sectionId === 'deposit' || sectionId === 'support';
    this.showBackButton.set(showBack);
    
    if (headerTitle) {
      this.headerTitle.set(headerTitle);
    }
  }

  back() {
    const previousSection = this.sectionHistory.pop() || 'home';
    // a simple back logic, can be improved.
    if(previousSection === 'wallet' && this.activeSection() === 'transaction-history') {
        this.navigateTo('wallet');
    } else if (previousSection === 'wallet' && this.activeSection() === 'deposit') {
        this.navigateTo('wallet');
    }
    else {
        this.navigateTo(previousSection || 'home');
    }
  }
}
