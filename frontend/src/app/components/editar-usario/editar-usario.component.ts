import { Component, EventEmitter, Input, Output, PLATFORM_ID, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
 
} from "@angular/forms";
import { FileUploadModule, } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast'
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { EstadosUsuarioEnum } from '../../enums/estado-usuario.enum';
import { RolesEnum } from '../../enums/roles.enum';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { DropdownModule } from 'primeng/dropdown';
import { UsuariosService } from '../../services/usuarios.service';
import { EditarUsuarioDto } from '../../dtos/editar-usuario.dto';
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { catchError, finalize, of, tap } from 'rxjs';




@Component({
  selector: 'app-editar-usario',
  standalone: true,
  imports: [ToastModule,
    FileUploadModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
  NgIf,NgFor],
  templateUrl: './editar-usario.component.html',
  styleUrl: './editar-usario.component.scss'
})
export class EditarUsarioComponent {
  
  @Input({ required: true }) visible!: boolean;

  @Input({ required: false }) usuario!: UsuarioDto| null;

  @Input({ required: true }) accion!: string;

  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() refrescar = new EventEmitter<boolean>();
  
  usuarios!: UsuarioDto[]

  roles = Object.values(RolesEnum);

  estados = Object.values(EstadosUsuarioEnum);
  
  archivos: File[] = [];
  
  loading = false;
  
  private readonly platformId = inject(PLATFORM_ID);

  formEditarUsuario = new FormGroup ({
    id: new FormControl<number | null>(null),
    nombres: new FormControl<string | null>(null), 
    apellidos: new FormControl<string | null>(null), 
    email: new FormControl<string | null>(null), 
    foto: new FormControl<string | null>(null),
    rol: new FormControl<RolesEnum| null>(null), 
    nombreUsuario: new FormControl<string | null>(null), 
    clave: new FormControl<string | null>(null), 
    estado: new FormControl<EstadosUsuarioEnum | null>(null), 
});

constructor(
  private messageService: MessageService,
  private _router: Router,
  private _usuariosService: UsuariosService,
private sanitizer: DomSanitizer, 
  private _authService:AuthService
) {}

ngOnInit() {
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
}

llenarTabla() {
  this.formEditarUsuario.patchValue({
    id:this.usuario!.id as number,
    nombres:this.usuario!.nombres,
    apellidos:this.usuario!.apellidos,
    email:this.usuario!.email,
    foto:this.usuario!.foto,
    rol:this.usuario!.rol,
    nombreUsuario:this.usuario!.nombreUsuario,
    clave:this.usuario!.clave,
    estado:this.usuario!.estado, 
  });
}

ngOnChanges() {
  if (this.usuario) {
    this.llenarTabla();
  } else {
    this.formEditarUsuario.reset();
  }
}

editar() {
  if (!this.formEditarUsuario.valid) {
    this.formEditarUsuario.markAllAsTouched();
    this.messageService.add({
      severity: 'error',
      summary: 'Debe ingresar todos los campos',
    });
    return;
  }

  const usuarioDto = this.formEditarUsuario.getRawValue();

  if (this.usuario) {
    const editarUsuarioDto: EditarUsuarioDto = {
      id: usuarioDto.id!,
      nombres: usuarioDto.nombres!,
      apellidos: usuarioDto.apellidos!,
      email: usuarioDto.email!,
      foto:usuarioDto.foto,
      rol: usuarioDto.rol!,
      nombreUsuario: usuarioDto.nombreUsuario!,
      clave:usuarioDto.clave!,
      estado:usuarioDto.estado!
    };
    
      this._usuariosService.editar(editarUsuarioDto).subscribe({
        next: (res) => {
          this.cerrar();
          this.refrescar.emit(true);
          this.messageService.add({
            severity: 'success',
            summary: 'Usuario editado con éxito!',
            detail: 'Se ha realizado Los cambios al usuario'
          });
          this.llenarTabla();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ocurrió un error al editar el usuario',
            detail: 'Contactar al administrador'
            // detail: 'Detalles del error: ' + err.message
          });
        
        },
        
      });
      }
}


    cerrar() {
      this.visibleChange.emit(false);
    }

    closeDialog(){
      this.visible = false;
      this.visibleChange.emit(this.visible);
      this.formEditarUsuario.reset();
    }
    
  fotoSeleccionada(event: any): void {
        this.archivos = [];
        for (let file of event.files) {
          this.archivos.push(file);

        }
      }
    
  subirArchivo(event:any): void {
        if (!this.archivos.length || !this.usuario) {
          this.messageService.add({
            severity: 'error',
            summary: 'No hay fotos seleccionadas o no se ha seleccionado un usuario',
          });
          return;
        }
    
        const formData = new FormData();
        this.archivos.forEach(archivo => {
          formData.append('foto', archivo.name);
        });
    
        this.loading = true;
        this._usuariosService.subirFoto(formData).pipe(
          tap(res => {
            if (res && res.url) {
              console.log('URL de la foto subida:', res.url);
              this.archivos = [];
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error al subir la foto',
              });
            }
          }),
          catchError(err => {
            console.error('Error al subir la foto', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error al subir la foto',
              detail: err.message ? err.message : 'Error desconocido (no se)',
            });
            return of(null);
          }),
          finalize(() => {
            this.loading = false;
          })
        ).subscribe();
      }
    
    
    isEstadoView(): boolean {
      return this.usuario?.estado === EstadosUsuarioEnum.BAJA;
    }

    
}
