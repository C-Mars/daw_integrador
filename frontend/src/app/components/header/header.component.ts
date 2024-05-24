import { ChangeDetectorRef, Component, EventEmitter, Inject, Output, PLATFORM_ID, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { ToolbarModule } from 'primeng/toolbar';
import { NgClass, NgIf, isPlatformBrowser } from '@angular/common';
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
  private readonly platformId = inject(PLATFORM_ID);

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
<<<<<<< HEAD
    const token = this._authService.isLoggedIn();
    return token
=======
    if (isPlatformBrowser(this.platformId)){
      const token = this._authService.isLogged();
      return token;
    }
    return false;
>>>>>>> e06e76576d264a58787025ca90ac2f8a3e5dc3e5
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
