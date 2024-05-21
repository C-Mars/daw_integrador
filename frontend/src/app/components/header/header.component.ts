import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { ToolbarModule } from 'primeng/toolbar';
import { NgClass, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, ToolbarModule, NgClass, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuOption: string = '';

  private _authService = inject(AuthService)
  private _router = inject(Router)

  constructor(
  ) { }

  @Output() loginClicked = new EventEmitter<void>();



  onOption(menuOption: string) {
    this.menuOption = menuOption
  }

  onLoginClick() {
    this.loginClicked.emit();
  }
  isLoggedView(): boolean {
    const token = this._authService.isLogged();
    return token
  }
  cerrarSesion() {
    this._authService.logout();
  }

}
