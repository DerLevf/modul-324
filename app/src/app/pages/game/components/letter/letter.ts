import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-letter',
  styleUrl: './letter.css',
  templateUrl: './letter.html',
})
export class Letter {
  letter = input<string>('');
  active = input<boolean>(false);
}
