import { Component, Input } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-menu-footer',
  standalone: true,
  imports: [SidebarModule,ButtonModule],
  templateUrl: './menu-footer.component.html',
  styleUrl: './menu-footer.component.scss'
})
export class MenuFooterComponent {
   menuOption: string = '';
   
   @Input({ required: true }) visible!: boolean;

  onOption(menuOption: string) {
    this.menuOption = menuOption
  }
 
  
}
