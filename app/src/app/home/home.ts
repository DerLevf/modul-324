import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Layout } from '../layout/layout';

@Component({
  selector: 'app-home',
  imports: [Layout],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
