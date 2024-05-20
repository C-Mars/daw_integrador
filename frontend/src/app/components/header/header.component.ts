import { Component,EventEmitter, Output  } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { ToolbarModule } from 'primeng/toolbar';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule,
    ToolbarModule,
    NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuOption: string = '';
  
  constructor(private authService: AuthService) {}

  @Output() loginClicked = new EventEmitter<void>();

 
  
  onOption(menuOption: string){
    this.menuOption = menuOption
  }
  
  onLoginClick() {
    this.loginClicked.emit();
  }
  
  cerrarSesion() {
    this.authService.logout();
  }

}
