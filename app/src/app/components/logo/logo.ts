import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export type LogoTileStatus = 'correct' | 'present' | 'empty';

export interface LogoTile {
  letter: string;
  status: LogoTileStatus;
}

@Component({
  selector: 'app-logo',
  imports: [RouterLink],
  templateUrl: './logo.html',
  styleUrl: './logo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logo {
  readonly tiles: readonly LogoTile[] = [
    { letter: 'S', status: 'correct' },
    { letter: 'P', status: 'present' },
    { letter: 'E', status: 'empty' },
    { letter: 'E', status: 'empty' },
    { letter: 'D', status: 'empty' },
    { letter: 'L', status: 'empty' },
  ];
}
