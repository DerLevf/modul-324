import { Component, ChangeDetectionStrategy, DestroyRef, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Layout } from '../../components/layout/layout';
import { Logo } from '../../components/logo/logo';

@Component({
  selector: 'app-home',
  imports: [Layout, Logo, NgTemplateOutlet, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  /** Placeholder until the real record is read from the storage.
      `null` means the player has not finished a round yet. */
  readonly record = signal<number | null>(null);

  readonly timeLimitSeconds = 60;

  private readonly desktopQuery = window.matchMedia('(min-width: 768px)');

  readonly isMobile = signal(!this.desktopQuery.matches);

  constructor() {
    const update = (event: MediaQueryListEvent) => this.isMobile.set(!event.matches);

    this.desktopQuery.addEventListener('change', update);
    inject(DestroyRef).onDestroy(() => this.desktopQuery.removeEventListener('change', update));
  }
}
