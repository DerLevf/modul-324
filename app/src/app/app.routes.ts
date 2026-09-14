import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Game } from './pages/game/game';

export const routes: Routes = [{ path: '', component: Home }, { path: 'game', component: Game}];
