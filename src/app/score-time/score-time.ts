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
  scoreCasa: number = 0;
  scoreOspiti: number = 0;
  localColor: 'azzurro' | 'bianco' = 'azzurro'; // colore cuffia squadra casa
  period: number = 1; // periodo di gioco
  seconds: number = 8*60; // secondi rimanenti
  play : boolean = false; // stato del timer
  intervalId: any;

  private socketSub?: Subscription;
  

  constructor(private socketService: DasboardSocket, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  this.socketSub = this.socketService.connect().subscribe((data: any) => {
    console.log("Score update:", data);

    if (data.firstScore !== undefined) {
      this.scoreCasa = data.firstScore;
    }
    if (data.secondScore !== undefined) {
      this.scoreOspiti = data.secondScore;
    }
    if (data.firstColor) {
      this.localColor = data.firstColor;
    }
    if (data.period) {
      this.period = data.period;
    }
    if (data.time !== undefined) {
      console.log("Aggiornamento secondi: ", data.time);
      if (this.seconds !== data.time) {
        this.seconds = data.time;
      }
    }
    if (data.play !== undefined) {
      this.play = data.play;
      if (this.play) {
        this.start();
      } else {
        this.stop();
     }
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
        this.seconds--;
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
    this.seconds = 8*60;
    this.cdr.detectChanges();
  }
}
