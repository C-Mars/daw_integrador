import { Component, EventEmitter, Input, Output, PLATFORM_ID, inject } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Subject } from 'rxjs';

import { Router } from '@angular/router';
import { RolesEnum } from '../../enums/roles.enum';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-menu-footer',
  standalone: true,
  imports: [SidebarModule,ButtonModule,NgIf],
  templateUrl: './menu-footer.component.html',
  styleUrl: './menu-footer.component.scss'
})
export class MenuFooterComponent {
  @Input({ required: true }) visible!: boolean;
  private _authService = inject(AuthService)
  private readonly platformId = inject(PLATFORM_ID);
  constructor(
    private _router :Router
  ) {}

  
  onUsersClick() {
    this._router.navigateByUrl('/usuarios');
  }

  onCliClick() {
    this._router.navigateByUrl('/clientes');
  }

  onActClick() {
    this._router.navigateByUrl('/actividades-admin');
  }

  onAudClick() {
    this._router.navigateByUrl('/auditoria');
  }
  
  onActUsuClick() {
    this._router.navigateByUrl('/actividades-usuarios');
  }

  isLogged(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token') ? true : false;
    }
    return false;
  }

  isEjecutor(): boolean {
    return this._authService.hasRole(RolesEnum.EJECUTOR);
  }
  
  
}
  

