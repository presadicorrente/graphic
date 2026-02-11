import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: string = '';
  public url: string = 'http://localhost:3000';
  
  constructor(private http: HttpClient ) {
    console.log('User service instantiated');
    
    const loadedtoken = localStorage.getItem('postmessages_token');
    if ( !loadedtoken || loadedtoken.length < 1 ) {
      console.log("No token found in local storage");
      this.token = ""
    } else {
      this.token = loadedtoken as string;
      console.log("JWT loaded from local storage.")
    }
  }

  login( mail: string, password: string): Observable<any> {
    console.log('Login: ' + mail + ' ' + password );
    const options = {
      headers: new HttpHeaders({
        authorization: 'Basic ' + btoa( mail + ':' + password),
        'cache-control': 'no-cache',
        'Content-Type':  'application/x-www-form-urlencoded',
      })
    };


    return this.http.get( this.url + '/login',  options ).pipe(
      /*
      RxJS tap() operator is a utility operator that returns an observable output
      that is identical to the source observable but performs a side effect for
      every emission on the source observable.  

      In other words, RxJS tap() operator is used to intercept each emission on
      the source observable, runs a function, and returns an output that is
      identical to the source observable as long as it doesn't find any error.  
      
      This operator is generally used for debugging observables for the correct
      values or performing other side effects.
      */
      tap( (data) => {
        console.log("Data received when invoking the /login endpoint:")
        console.log(JSON.stringify(data));
        this.token = data as string;
        localStorage.setItem('postmessages_token', this.token);
      }));
  }

  logout(){
    this.token = "";
    localStorage.removeItem('postmessages_token');
    console.log("User logged out, token cleared.");
  }
}
