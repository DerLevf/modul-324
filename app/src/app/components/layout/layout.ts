import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './layout.css',
})
export class Layout {}
