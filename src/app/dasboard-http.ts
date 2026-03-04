import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardHttp {
  
  private firstScore = 0;
  private secondScore = 0;
   
  constructor(private http : HttpClient) {}

  updateMatch(first: number, second: number, firstColor: string, secondColor: string, period: number) {
    const body = {
      firstScore: first,
      secondScore: second,
      firstColor,
      secondColor,
      period
    };
    return this.http.post('http://localhost:3000/scores', body);
  }

  getFirstScore(): number {
    return this.firstScore;
  }
  getSecondScore(): number {
    return this.secondScore;
  }

  getResetTimer() {
    return this.http.get('http://localhost:3000/resetTimer');
  }
  getPlayPauseTimer(play: boolean, seconds: number) {
    if (play) {
      return this.http.get('http://localhost:3000/startTimer?seconds=' + seconds);
    } else {
      return this.http.get('http://localhost:3000/stopTimer?seconds=' + seconds);
    }
  }
}
