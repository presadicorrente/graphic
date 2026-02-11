import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DasboardSocket } from '../dasboard-socket';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
   changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-score-display',
  imports: [CommonModule],
  templateUrl: './score.html',
  styleUrls: ['./score.css']
})
export class Score implements OnInit, OnDestroy {
  scoreCasa: number = 0;
  scoreOspiti: number = 0;
  localColor: 'azzurro' | 'bianco' = 'azzurro'; // colore cuffia squadra casa

  private socketSub?: Subscription;

  constructor(private socketService: DasboardSocket, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  this.socketSub = this.socketService.connect().subscribe((data: any) => {
    console.log("Score update:", data);

    this.scoreCasa = data.firstScore;
    this.scoreOspiti = data.secondScore;
    this.localColor = data.firstColor;

    this.cdr.detectChanges();
  });
}


  ngOnDestroy(): void {
    this.socketSub?.unsubscribe();
  }
}
