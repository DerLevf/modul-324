import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Layout } from '../../components/layout/layout';

@Component({
  selector: 'app-home',
  imports: [Layout],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
