
import { ChangeDetectorRef, Component, EventEmitter, Inject, Output, PLATFORM_ID, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { ToolbarModule } from 'primeng/toolbar';
import { NgClass, NgIf, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MenuFooterComponent } from '../menu-footer/menu-footer.component';
import { RolesEnum } from '../../enums/roles.enum';
import { TooltipModule } from 'primeng/tooltip';
import { AjustesUsuarioComponent } from '../ajustes-usuario/ajustes-usuario.component';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    ToolbarModule,
    NgClass,
    NgIf,
    MenuFooterComponent,
    TooltipModule,
    AjustesUsuarioComponent,
    AvatarModule,
    BadgeModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  menuOption: string = '';
  sidebarVisible: boolean = false;
  dialogVisible: boolean = false;
  usuario: UsuarioDto | null = null;

  @Output() loginClicked = new EventEmitter<void>();
  @Output() usersClicked = new EventEmitter<void>();

  private _authService = inject(AuthService);
  private _router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) {
    if (this.isLoggedView()) {
      this.usuario = this._authService.getUsuario();
      
    }
  }

  onLoginSuccess() {
    this.usuario = this._authService.getUsuario();
    
  }


  onLoginClick() {
    this.loginClicked.emit();
  }

  isLoggedView(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.usuario)
      return this._authService.isLogged();
    }
    return false;
  }

  cerrarSesion() {
    this._authService.logout();
  }

  onMenuFooter() {
    this.sidebarVisible = !this.sidebarVisible;
    this.cd.detectChanges();
  }

  onAjustesUsuario() {
    this.dialogVisible = !this.dialogVisible;
    this.cd.detectChanges();
  }

  onUsersClick() {
    this.usersClicked.emit();
  }

  onHomeClick() {
    this._router.navigateByUrl('/inicio-admin');
  }

  onHomeUsuClick() {
    this._router.navigateByUrl('/inicio-usuarios');
  }

  isEjecutor(): boolean {
    return this._authService.hasRole(RolesEnum.EJECUTOR);
  }
}
