import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Score } from './score/score';
import { Login } from './login/login';
import { ScoreTime } from './score-time/score-time';

export const routes: Routes = [
    {path: 'dashboard', component: Dashboard},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'score', component: Score},
    {path: 'login', component: Login},
    {path: 'time', component: ScoreTime}
];
