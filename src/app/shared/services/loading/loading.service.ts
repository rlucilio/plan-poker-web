import { Injectable, Inject } from '@angular/core';
import { AnimationBuilder, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, first } from 'rxjs/operators';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: HTMLElement;
  constructor(
    private animationBuilder: AnimationBuilder,
    @Inject(DOCUMENT) private document: HTMLDocument,
    private router: Router
  ) {
    this.init();
  }

  private init() {
    this.loading = this.document.querySelector('loading-init');

    if (this.loading) {
      this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        first()
      ).subscribe(() => timer(5000).subscribe(() => this.hide()));
    }
  }

  show() {
    this.animationBuilder.build([
      style({
        opacity: '0',
        display: 'none'
      }),
      animate('500ms ease', style({
        opacity: '1',
        display: 'flex'
      }))
    ]).create(this.loading).play();
  }

  hide() {
    this.animationBuilder.build([
      style({
        opacity: '1',
        display: 'flex'
      }),
      animate('500ms ease', style({
        opacity: '0',
        display: 'none'
      }))
    ]).create(this.loading).play();
  }
}
