import { ChangeDetectorRef, Component, EventEmitter, Output, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { ToolbarModule } from 'primeng/toolbar';
import { NgClass, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MenuFooterComponent } from '../menu-footer/menu-footer.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, 
    ToolbarModule, 
    NgClass, 
    NgIf,
    MenuFooterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class HeaderComponent {
  menuOption: string = '';
  sidebarVisible: boolean = false;
  private _authService = inject(AuthService)
  private _router = inject(Router)

  constructor(private cd: ChangeDetectorRef)
   { }

  @Output() loginClicked = new EventEmitter<void>();

  @Output() usersClicked = new EventEmitter<void>();

  onOption(menuOption: string) {
    this.menuOption = menuOption
  }

  onLoginClick() {
    this.loginClicked.emit();
  }
  
  isLoggedView(): boolean {
    const token = this._authService.isLoggedIn();
    return token
  }

  cerrarSesion() {
    this._authService.logout();
  }

  onMenuFooter(){
    this.sidebarVisible = !this.sidebarVisible;
    this.cd.detectChanges(); 
  }
  
  onUsersClick() {
    this.usersClicked.emit();
  }
}
