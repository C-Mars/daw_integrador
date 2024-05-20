<<<<<<< HEAD
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  cerrarSesion() {
    this.authService.logout();
  }
}
=======
import { Component,EventEmitter, Output  } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule,ToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  constructor(private authService: AuthService) {}

  @Output() loginClicked = new EventEmitter<void>();

  onLoginClick() {
    this.loginClicked.emit();
  }
  cerrarSesion() {
    this.authService.logout();
  }

}
>>>>>>> e6b539547a53cba9e96ad508ff8f36c25836bd4d
