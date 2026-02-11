import { Component } from '@angular/core';
import { UserService } from '../user-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  imports: [CommonModule],
})
export class Login {
  constructor(private us : UserService, private router: Router) {}

  login(mail: string, password: string){
    //take value from form and call user service login
    this.us.login(mail, password).subscribe({
      next: (data) => {
        console.log("Login successful, navigating to dashboard");
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error("Login failed:", error);
      }
    }); 
    //task 2: bind form values to variables here
    //task 3: call user service login with the form values
    //task 4: on success navigate to dashboard
  }

}
