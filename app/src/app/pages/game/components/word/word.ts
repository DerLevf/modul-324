import { Component, input } from '@angular/core';
import { Letter } from '../letter/letter';

@Component({
  selector: 'app-word',
  imports: [Letter],
  templateUrl: './word.html',
  styleUrl: './word.css',
})
export class Word {
  letters = input<string[]>([]);
  active = input<boolean>(false);
}
