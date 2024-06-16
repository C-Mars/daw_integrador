import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-inicio-usuario',
  standalone: true,
  imports: [BaseComponent,ImageModule],
  templateUrl: './inicio-usuario.component.html',
  styleUrl: './inicio-usuario.component.scss'
})
export class InicioUsuarioComponent {

}
