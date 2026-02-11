import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardHttp {
  private firstScore = 0;
  private secondScore = 0;
   
  constructor(private http : HttpClient) {}

  updateMatch(
  first: number,
  second: number,
  firstColor: string,
  secondColor: string
) {
  const body = {
    firstScore: first,
    secondScore: second,
    firstColor,
    secondColor
  };

  return this.http.post('http://localhost:3000/scores', body);
}

  getFirstScore(): number {
    return this.firstScore;
  }
  getSecondScore(): number {
    return this.secondScore;
  }

}
