import { Component, EventEmitter, Input, OnInit, Output, PLATFORM_ID, inject } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-inicio-admin',
  standalone: true,
  imports: [ BaseComponent,CardModule, ImageModule],
  templateUrl: './inicio-admin.component.html',
  styleUrl: './inicio-admin.component.scss'
})
export class InicioAdminComponent{
  titulo: string = 'BIENVENIDO'
  usuario!: UsuarioDto | null ;


  constructor(
  
  ) { }


}
