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
  match : Match = {
    team1: {name : 'Team Casa', score: 0, color: 'azzurro'},
    team2: {name : 'Team Ospiti', score: 0, color: 'bianco'},
    period: 1,
    seconds: 8*60,
    timeRunning: false
  };
  private socketSub?: Subscription;

  constructor(private socketService: DasboardSocket, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
  this.socketSub = this.socketService.connect().subscribe((data: any) => {
    this.match = JSON.parse(data.match);
    this.cdr.detectChanges();
  });
}

  ngOnDestroy(): void {
    this.socketSub?.unsubscribe();
  }
}
