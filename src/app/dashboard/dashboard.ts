import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { DashboardHttp } from '../dasboard-http'; // <-- importa il servizio

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
})
export class Dashboard {




  match : Match = {
    team1: {name : 'Team Casa', score: 0, color: 'azzurro'},
    team2: {name : 'Team Ospiti', score: 0, color: 'bianco'},
    period: 1,
    seconds: 8*60,
    timeRunning: false
  };
  intervalId: any;

  constructor(private dashboardHttp: DashboardHttp, private cdr: ChangeDetectorRef) {}

  logout() {
    console.log('Logout eseguito');
  }

  ngOnInit(): void {
    const rest = this.dashboardHttp.getMatch();
    rest.subscribe(response => {
      this.match = response as Match;
      console.log('Match retrieved successfully:', this.match);
      this.cdr.detectChanges();
    }, error => {
      console.error('Error retrieving match:', error);
    });
  }

  setLocalColor(color: string) {
    this.match.team1.color = color;
    // chiama la funzione dal servizio
    
    const rest = this.dashboardHttp.updateMatch(this.match);
    rest.subscribe(response => {
      console.log('Scores updated successfully:', response);
    }, error => {
      console.error('Error updating scores:', error);
    });
  }
  

  scoreFirst(value: number) {
    this.match.team1.score += value;
    if (this.match.team1.score < 0) this.match.team1.score = 0;
    const rest = this.dashboardHttp.updateMatch(this.match);
    rest.subscribe(response => {
      console.log('Scores updated successfully:', response);
    }, error => {
      console.error('Error updating scores:', error);
    });
  }

  scoreSecond(value: number) {
    this.match.team2.score += value;
    if (this.match.team2.score < 0) this.match.team2.score = 0;
    const rest = this.dashboardHttp.updateMatch(this.match);
    rest.subscribe(response => {
      console.log('Scores updated successfully:', response);
    }, error => {
      console.error('Error updating scores:', error);
    });
  }

  setPeriod(value: number) {
    this.match.period = value;
    // Implementa la logica per impostare il periodo
    console.log('Periodo impostato a:', value);
    if(this.match.period >= 1 && this.match.period <=4 ) {
      const rest = this.dashboardHttp.updateMatch(this.match);
      rest.subscribe(response => {
        console.log('Scores updated successfully:', response);
      }, error => {
        console.error('Error updating scores:', error);
      });
    }
  }

  resetTimer() {
    this.reset();
    this.dashboardHttp.getResetTimer().subscribe(response => {
      console.log('Timer reset successfully:', response);
    }, error => {
      console.error('Error resetting timer:', error);
    });
  }

  playPauseTimer() {
    this.match.timeRunning = !this.match.timeRunning;
    if (this.match.timeRunning) {
      console.log('Timer avviato');
      this.start();
    }else{
      this.stop();
    }
      this.dashboardHttp.getPlayPauseTimer(this.match.timeRunning, this.match.seconds).subscribe(response => {
        console.log('Timer play/pause toggled successfully:', response);
      }, error => {
        console.error('Error toggling timer play/pause:', error);
      });
    }

  start() {
    this.intervalId = setInterval(() => {
      if (this.match.seconds > 0) {
        this.match.seconds--;
      }
      this.cdr.detectChanges();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  reset() {
    console.log('Reset timer');
    this.stop();
    this.match.seconds = 8*60;
    this.cdr.detectChanges();
  }

  addTime(arg0: number) {
    this.match.seconds += arg0;
    if (this.match.seconds < 0) this.match.seconds = 0;
    this.cdr.detectChanges();
    this.dashboardHttp.getPlayPauseTimer(this.match.timeRunning, this.match.seconds).subscribe(response => {
      console.log('Timer time added successfully:', response);
    }, error => {
      console.error('Error adding time to timer:', error);
    });
  }
}

