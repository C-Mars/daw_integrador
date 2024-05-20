import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../login/login.component';
import { NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,
    LoginComponent,
    ButtonModule,
    NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // ver el modal del login
  displayLogin = false;

  
  
   
  showLogin() {
    this.displayLogin = true;
  }
}
