import { Component, ChangeDetectionStrategy, inject, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../firebase.service';
import { NavigationService } from '../../navigation.service';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';

Swiper.use([EffectFade, Autoplay, Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  // FIX: Cast injected service to `any` to resolve type errors due to missing type definitions.
  firebaseService = inject(FirebaseService) as any;
  navigationService = inject(NavigationService);

  @ViewChild('promotionSlider') promotionSlider?: ElementRef<HTMLElement>;
  private swiperInstance?: Swiper;

  promotions = this.firebaseService.promotions;
  games = this.firebaseService.games;
  myContests = this.firebaseService.myContests;

  constructor() {
    this.firebaseService.loadHomePageData();
  }

  ngAfterViewInit() {
    this.initSwiper();
  }

  ngOnDestroy() {
    this.swiperInstance?.destroy(true, true);
  }

  private initSwiper() {
    if (this.promotionSlider && this.promotions() && this.promotions()!.length > 0) {
      const options: SwiperOptions = {
        loop: this.promotions()!.length > 1,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        slidesPerView: 1,
      };
      this.swiperInstance = new Swiper(this.promotionSlider.nativeElement, options);
    }
  }

  viewTournaments(gameId: string, gameName: string) {
    this.firebaseService.currentTournamentGameId.set(gameId);
    this.navigationService.navigateTo('tournaments', gameName, true);
  }
}
