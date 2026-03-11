import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DasboardSocket } from '../dasboard-socket';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
   changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-score-time',
  imports: [CommonModule],
  templateUrl: './score-time.html',
  styleUrls: ['./score-time.css']
})
export class ScoreTime implements OnInit, OnDestroy {
  match : Match = {
    team1: {name : 'Team Casa', score: 0, color: 'azzurro'},
    team2: {name : 'Team Ospiti', score: 0, color: 'bianco'},
    period: 1,
    seconds: 8*60,
    timeRunning: false
  };
  secondi: number = 8*60;
  running: boolean = false;

  private socketSub?: Subscription;
  intervalId: any;
  dashboardHttp: any;
  

  constructor(private socketService: DasboardSocket, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  this.socketSub = this.socketService.connect().subscribe((data: any) => {
    this.match = data;
    this.secondi = data.seconds;
    if(data.timeRunning) {
      this.start()
    }else{
      this.stop();
    }

    this.cdr.detectChanges();
  });
}

  ngOnDestroy(): void {
    this.socketSub?.unsubscribe();
  }

  start(){
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.secondi--;
        this.cdr.detectChanges();
      }, 1000);
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.cdr.detectChanges();
  }

  reset() {
    this.stop();
    this.secondi = 8*60;
    this.cdr.detectChanges();
  }
}
