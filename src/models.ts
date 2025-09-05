
import { User as FirebaseUser } from 'firebase/auth';

export type SectionId = 'login' | 'home' | 'tournaments' | 'wallet' | 'deposit' | 'earnings' | 'profile' | 'support' | 'transaction-history';

export interface AppUser extends FirebaseUser {}

export interface UserProfile {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  balance?: number;
  winningCash?: number;
  bonusCash?: number;
  totalMatches?: number;
  wonMatches?: number;
  totalEarnings?: number;
  referralEarnings?: number;
  createdAt?: number;
  referralCode?: string;
  joinedTournaments?: { [key: string]: boolean };
  isAdmin?: boolean;
  referredBy?: string;
  upiId?: string;
}

export interface AppSettings {
  logoUrl?: string;
  minWithdraw?: number;
  newUserBalance?: number;
  newUserBonus?: number;
  referralBonus?: number;
  referralDescription?: string;
  upiDetails?: string;
  supportContact?: string;
  policyPrivacy?: string;
  policyTerms?: string;
  policyRefund?: string;
  policyFairPlay?: string;
  games?: { [key: string]: { name: string } };
}

export interface Game {
    id: string;
    name: string;
    imageUrl: string;
    order?: number;
}

export interface Promotion {
    imageUrl: string;
    link?: string;
}

export interface Tournament {
    id: string;
    name: string;
    gameId: string;
    status: 'upcoming' | 'ongoing' | 'completed' | 'result';
    startTime: number;
    entryFee: number;
    prizePool: number;
    perKillPrize: number;
    maxPlayers: number;
    registeredPlayers: { [key: string]: { joinedAt: number } };
    mode?: string;
    map?: string;
    tags?: string[];
    icon?: string;
    description?: string;
    prizeDistribution?: any;
    showIdPass?: boolean;
    roomId?: string;
    roomPassword?: string;
}

export interface Transaction {
    type: string;
    amount: number;
    description: string;
    timestamp: number;
    details?: any;
}
