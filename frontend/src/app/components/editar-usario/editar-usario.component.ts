import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { NgIf } from '@angular/common';




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
  NgIf],
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
  private _usuariosService: UsuariosService
) {}

ngOnInit() {
  this._usuariosService.getUsuarios().subscribe({
    next: (res) => {
      this.usuarios = res;
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

enviar() {
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
        rol: usuarioDto.rol!,
        estado: usuarioDto.estado!,
      };
      
      if (usuarioDto.foto) {
        editarUsuarioDto.foto! = usuarioDto.foto;
      }

      if (usuarioDto.nombreUsuario) {
        editarUsuarioDto.nombreUsuario! = usuarioDto.nombreUsuario
      }
      if (usuarioDto.clave) {
        editarUsuarioDto.clave! = usuarioDto.clave
      }
      this._usuariosService.editar(editarUsuarioDto).subscribe({
        next: (res) => {
          this.cerrar();
          this.refrescar.emit(true);
          this.messageService.add({
            severity: 'success',
            summary: 'Usuario editado con éxito!'
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ocurrió un error al editar el usuario' ,
          });
          
        },
        
      });
    }
  }
    
    
    // listUsuariosDrop() {
    //   this._usuariosService.getUsuarios().subscribe(
    //     response => {
    //       this.listUsuarios = response.map(usuario => usuario.rol);
    //     }
    //   );
    // }

    cerrar() {
      this.visibleChange.emit(false);
      this.formEditarUsuario.reset();
    }

    closeDialog(){
      this.visible = false;
      this.visibleChange.emit(this.visible);
      this.formEditarUsuario.reset();
    }
      // Subir los archivos
    onUpload(event: any) {
      const formData = new FormData();
      formData.append('foto', event.files[0]);
      this._usuariosService.subirFoto(formData).subscribe({
        next: (res) => {
          
          console.log('Foto subida con éxito', res);
         
        },
        error: (err) => {
         
          console.error('Error al subir la foto', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error al subir la foto',
          });
        }
      });
    }
}
