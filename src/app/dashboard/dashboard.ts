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

  match = {
    firstScore: 0,
    secondScore: 0,
    period : 1,
    firstColor: 'azzurro',
    secondColor: 'bianco',
    seconds: 8*60, // 8 minuti in secondi
    play: false
  };
  intervalId: any;

  constructor(private dashboardHttp: DashboardHttp, private cdr: ChangeDetectorRef) {}

  logout() {
    console.log('Logout eseguito');
  }

  setLocalColor(color: string) {
    this.match.firstColor = color;
    // chiama la funzione dal servizio
    
    const rest = this.dashboardHttp.updateMatch(this.match.firstScore, this.match.secondScore, this.match.firstColor, this.match.secondColor, this.match.period);
    rest.subscribe(response => {
      console.log('Scores updated successfully:', response);
    }, error => {
      console.error('Error updating scores:', error);
    });
  }
  

  scoreFirst(value: number) {
    this.match.firstScore += value;
    if (this.match.firstScore < 0) this.match.firstScore = 0;
    const rest = this.dashboardHttp.updateMatch(this.match.firstScore, this.match.secondScore, this.match.firstColor, this.match.secondColor, this.match.period);
    rest.subscribe(response => {
      console.log('Scores updated successfully:', response);
    }, error => {
      console.error('Error updating scores:', error);
    });
  }

  scoreSecond(value: number) {
    this.match.secondScore += value;
    if (this.match.secondScore < 0) this.match.secondScore = 0;
    const rest = this.dashboardHttp.updateMatch(this.match.firstScore, this.match.secondScore, this.match.firstColor, this.match.secondColor, this.match.period );
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
      const rest = this.dashboardHttp.updateMatch(this.match.firstScore, this.match.secondScore, this.match.firstColor, this.match.secondColor, this.match.period);
      rest.subscribe(response => {
        console.log('Scores updated successfully:', response);
      }, error => {
        console.error('Error updating scores:', error);
      });
    }
  }

  resetTimer() {
    this.reset();
    this.dashboardHttp.getPlayPauseTimer(false, 6*80).subscribe(response => {
      console.log('Timer reset successfully:', response);
    }, error => {
      console.error('Error resetting timer:', error);
    });
  }

  playPauseTimer() {
    this.match.play = !this.match.play;
    if (this.match.play) {
      console.log('Timer avviato');
      this.start();
    }else{
      this.stop();
    }
      this.dashboardHttp.getPlayPauseTimer(this.match.play, this.match.seconds).subscribe(response => {
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
}

