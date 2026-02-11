import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Score } from './score/score';
import { Login } from './login/login';

export const routes: Routes = [
    {path: 'dashboard', component: Dashboard},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'score', component: Score},
    {path: 'login', component: Login},
];
