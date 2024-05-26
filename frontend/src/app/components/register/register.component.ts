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
import { environment } from '../../environments/environment';
import { CrearUsuarioDto } from '../../dtos/crear-usuario.dto';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    FileUploadModule,
    InputTextModule,
    PasswordModule,
    ButtonModule, 
    ToastModule,
    FloatLabelModule,
    CardModule,
    DropdownModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent {
  @Input({ required: true }) visible!: boolean;

  @Input({ required: false }) usuario!: UsuarioDto| null;

  @Input({ required: true }) accion!: string;

  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() refrescar = new EventEmitter<boolean>();
  
  usuarios!: UsuarioDto[]

  roles = Object.values(RolesEnum);

  estados = Object.values(EstadosUsuarioEnum);

  
  

  form = new FormGroup ({
    id: new FormControl<number | null>(null),
    nombres: new FormControl<string | null>(null,[Validators.required]),
    apellidos:new FormControl<string | null>(null,[Validators.required]),
    email:new FormControl<string | null>(null,[Validators.required]),
    foto: new FormControl<string | null>(null),
    rol: new FormControl<RolesEnum| null>(null),
    nombreUsuario: new FormControl<string | null>(null,[Validators.required]),
    clave: new FormControl<string | null>(null,[Validators.required]),
    estado:  new FormControl< EstadosUsuarioEnum |null>(EstadosUsuarioEnum.ACTIVO)
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



llenarForm() {
  this.form.patchValue({
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
    this.llenarForm();
  } else {
    this.form.reset();
  }
}

enviar() {
  if (!this.form.valid) {
    this.form.markAllAsTouched();
    this.messageService.add({
      severity: 'error',
      summary: 'Debe ingresar todos los campos',
    });
    return;
  }

  const usuarioDto = this.form.getRawValue();

  const crearUsuarioDto: CrearUsuarioDto = {
    nombres: usuarioDto.nombres,
    apellidos: usuarioDto.apellidos,
    email: usuarioDto.email,
    foto: usuarioDto.foto,
    rol: usuarioDto.rol,
    nombreUsuario: usuarioDto.nombreUsuario,
    clave: usuarioDto.clave,
   
  };

  this._usuariosService.crear(crearUsuarioDto).subscribe({
    next: (res) => {
      this.cerrar();
      this.refrescar.emit(true);
      this.messageService.add({
        severity: 'success',
        summary: 'Usuario registrado con éxito!',
      });
    },
    error: (err) => {
      alert(err)
      this.messageService.add({
        severity: 'error',
        summary: 'Ocurrió un error al registrar el usuario',
      });
    },
  });
}
  

    cerrar() {
      this.visibleChange.emit(false);
    }

    // closeDialog(){
    //   this.visible = false;
    //   this.visibleChange.emit(this.visible);
    //   this.form.reset();
    // }
      // Subir los archivos
      onUpload(event: any) {
        const formData = new FormData();
        formData.append('foto', event.files[0]);
      
        // Llama al método subirFoto del servicio UsuariosService
        this._usuariosService.subirFoto(formData).subscribe({
          next: (res) => {
            // Manejar la respuesta si es necesario
            console.log('Foto subida con éxito', res);
            // Aquí podrías actualizar algún campo en tu formulario con la URL de la foto subida, por ejemplo
            // this.form.patchValue({ foto: res.url });
          },
          error: (err) => {
            // Manejar los errores
            console.error('Error al subir la foto', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error al subir la foto',
            });
          }
        });
      }
  }