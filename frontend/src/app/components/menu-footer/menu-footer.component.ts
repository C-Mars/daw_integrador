import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Subject } from 'rxjs';
import { SharedEventService } from '../../services/shared-event.service';
@Component({
  selector: 'app-menu-footer',
  standalone: true,
  imports: [SidebarModule,ButtonModule],
  templateUrl: './menu-footer.component.html',
  styleUrl: './menu-footer.component.scss'
})
export class MenuFooterComponent {
  @Input({ required: true }) visible!: boolean;
  
  constructor(private sharedEventService: SharedEventService) {}

  onUsersClick() {
    this.sharedEventService.emitUsersClick();
  }

  onCliClick() {
    this.sharedEventService.emitCliClick();
  }

  onActClick() {
    this.sharedEventService.emitActClick();
  }

  onAudClick() {
    this.sharedEventService.emitAudClick();
  }
}
  

