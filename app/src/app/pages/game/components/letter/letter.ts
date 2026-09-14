import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-letter',
  styleUrl: './letter.css',
  templateUrl: './letter.html',
  host: {
    '[style.user-select]': '"none"',
  },
})
export class Letter {
  letter = input<string>('');
  active = input<boolean>(false);
}
