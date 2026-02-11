import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardHttp } from '../dasboard-http'; // <-- importa il servizio

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
})
export class Dashboard {
  match = {
    firstScore: 0,
    secondScore: 0,
    firstColor: 'azzurro',
    secondColor: 'bianco'
  };

  constructor(private dashboardHttp: DashboardHttp) {}

  logout() {
    console.log('Logout eseguito');
  }

  setLocalColor(color: string) {
    this.match.firstColor = color;
    // chiama la funzione dal servizio
    
    const rest = this.dashboardHttp.updateMatch(this.match.firstScore, this.match.secondScore, this.match.firstColor, this.match.secondColor);
    rest.subscribe(response => {
      console.log('Scores updated successfully:', response);
    }, error => {
      console.error('Error updating scores:', error);
    });
  }
  

  scoreFirst(value: number) {
    this.match.firstScore += value;
    if (this.match.firstScore < 0) this.match.firstScore = 0;
    const rest = this.dashboardHttp.updateMatch(this.match.firstScore, this.match.secondScore, this.match.firstColor, this.match.secondColor);
    rest.subscribe(response => {
      console.log('Scores updated successfully:', response);
    }, error => {
      console.error('Error updating scores:', error);
    });
  }

  scoreSecond(value: number) {
    this.match.secondScore += value;
    if (this.match.secondScore < 0) this.match.secondScore = 0;
    const rest = this.dashboardHttp.updateMatch(this.match.firstScore, this.match.secondScore, this.match.firstColor, this.match.secondColor);
    rest.subscribe(response => {
      console.log('Scores updated successfully:', response);
    }, error => {
      console.error('Error updating scores:', error);
    });
  }
}
