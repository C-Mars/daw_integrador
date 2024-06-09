import { Component, EventEmitter, Input, NgModule, Output } from "@angular/core";
import { ToolbarModule } from 'primeng/toolbar';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder
} from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast'
import { FloatLabelModule } from 'primeng/floatlabel';
import { RolesEnum } from "../../enums/roles.enum";
import { MessageService } from "primeng/api";
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { NgIf } from "@angular/common";
import { UsuariosService } from "../../services/usuarios.service";
import { UsuarioDto } from "../../dtos/usuario.dto";
import { AjustesUsuarioDto } from "../../dtos/ajustes-usuario.dto";
import { EditarUsuarioDto } from "../../dtos/editar-usuario.dto";

@Component({
  selector: 'app-ajustes-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ToolbarModule,
    NgIf,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    PasswordModule,
    ImageModule,
    ToastModule
  ],
  templateUrl: './ajustes-usuario.component.html',
  styleUrl: './ajustes-usuario.component.scss'
})
export class AjustesUsuarioComponent {

  @Input() visible: boolean = false;

  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() refrescar = new EventEmitter<boolean>();

  usuarios!: UsuarioDto[]

  @Input({ required: false }) usuario!: UsuarioDto | null;

  formAjustes = new FormGroup({
    id: new FormControl<number | null>(null),
    nombreUsuario: new FormControl<string | null>(null),
    clave: new FormControl<string | null>(null),
  });

  constructor(
    private messageService: MessageService,
    private _usuariosService: UsuariosService,
    private router: Router,
    private _authService: AuthService,

  ) {
    
  }



  llenarLogin() {
    this._usuariosService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
        this.usuario = this.usuarios[0];
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hubo un error al recuperar las opciones de usuario',
        });
      },
    });
    this.formAjustes.patchValue({
      id: this.usuario!.id as number,
      nombreUsuario: this.usuario!.nombreUsuario,
      clave: this.usuario!.clave,

    });
  }

  loginAjustes() {

    if (!this.formAjustes.valid) {
      this.formAjustes.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Debe ingresar todos los campos',
      });
      return;
    }

    const usuarioDto = this.formAjustes.getRawValue();
    if (this.usuario) {
      const ajustesUsuarioDto: EditarUsuarioDto = {
        id: usuarioDto.id!,
        nombreUsuario: usuarioDto.nombreUsuario!,
        clave: usuarioDto.clave!,
      };
      this._usuariosService.editar(ajustesUsuarioDto).subscribe({
        next: (res) => {
          this.cerrar();
          this.refrescar.emit(true);
          this.messageService.add({
            severity: 'success',
            summary: 'Cambios realizados con éxito!',
            detail: 'Se ha realizado Los cambios al usuario'
          });
          this.llenarLogin();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ocurrió un error al editar contraseña o nombre de usuario',
            detail: 'Contactar al administrador'
            // detail: 'Detalles del error: ' + err.message
          });

        },
      })
    }

  }

  cerrar() {
    this.visibleChange.emit(false);
  }
  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.formAjustes.reset();
  }
}
