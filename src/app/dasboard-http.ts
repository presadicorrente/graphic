import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardHttp {
  
  private firstScore = 0;
  private secondScore = 0;
  private link = 'https://backendgraphic.onrender.com';
  private link2 = 'http://localhost:3000';
   
  constructor(private http : HttpClient) {}

  

  updateMatch(match: Match) {
    return this.http.post(this.link + '/scores', match);
  }
  getMatch() {
    return this.http.get(this.link + '/currentMatch');
  }

  getFirstScore(): number {
    return this.firstScore;
  }
  getSecondScore(): number {
    return this.secondScore;
  }

  getResetTimer() {
    return this.http.get(this.link + '/resetTimer');
  }
  getPlayPauseTimer(play: boolean, seconds: number) {
    if (play) {
      return this.http.get(this.link + '/startTimer?seconds=' + seconds);
    } else {
      return this.http.get(this.link + '/stopTimer?seconds=' + seconds);
    }
  }
}
