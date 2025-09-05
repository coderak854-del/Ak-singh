import { Component, ChangeDetectionStrategy, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../firebase.service';
import { Tournament } from '../../../models';

type TournamentStatus = 'upcoming' | 'ongoing' | 'completed';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class TournamentsComponent {
  // FIX: Cast injected service to `any` to resolve type errors due to missing type definitions.
  firebaseService = inject(FirebaseService) as any;

  activeTab = signal<TournamentStatus>('upcoming');
  
  tournaments = computed(() => {
    const all = this.firebaseService.tournaments();
    const gameId = this.firebaseService.currentTournamentGameId();
    if (!all || !gameId) return [];
    return all[gameId] || [];
  });

  filteredTournaments = computed(() => {
    const status = this.activeTab();
    return this.tournaments().filter(t => t.status === status)
      .sort((a, b) => (a.startTime || 0) - (b.startTime || 0));
  });

  userProfile = this.firebaseService.userProfile;
  isLoggedIn = this.firebaseService.isLoggedIn;

  constructor() {
    effect(() => {
      const gameId = this.firebaseService.currentTournamentGameId();
      if(gameId) {
        this.firebaseService.loadTournamentsForGame(gameId);
      }
    });
  }

  changeTab(status: TournamentStatus) {
    this.activeTab.set(status);
  }

  getTimeRemaining(startTime: number) {
     if (!startTime) return 'TBA';
     const now = Date.now();
     const diff = startTime - now;
     if (diff <= 0) return 'Starting Soon';
     const days = Math.floor(diff / 86400000);
     const hours = Math.floor((diff % 86400000) / 3600000);
     const minutes = Math.floor((diff % 3600000) / 60000);
     let o = '';
     if (days > 0) o += `${days}d `;
     if (hours > 0 || days > 0) o += `${hours}h `;
     o += `${minutes}m`;
     return o.trim() || 'Now';
  }

  async joinTournament(tournament: Tournament) {
      if (!confirm(`Join for ₹${tournament.entryFee.toFixed(2)}?`)) return;
      
      const result = await this.firebaseService.joinTournament(tournament.id, tournament.entryFee);
      if(result.error) {
        alert(`Failed to join: ${result.error}`);
      } else {
        alert('Successfully joined tournament!');
      }
  }
}
