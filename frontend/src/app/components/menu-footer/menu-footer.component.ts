import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Subject } from 'rxjs';
import { SharedEventService } from '../../services/shared-event.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-footer',
  standalone: true,
  imports: [SidebarModule,ButtonModule],
  templateUrl: './menu-footer.component.html',
  styleUrl: './menu-footer.component.scss'
})
export class MenuFooterComponent {
  @Input({ required: true }) visible!: boolean;
  
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
    this._router.navigateByUrl('/actividades');
  }

  onAudClick() {
    this._router.navigateByUrl('/auditoria');
  }
}
  

