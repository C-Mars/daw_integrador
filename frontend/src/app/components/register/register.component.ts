import { Component, 
  EventEmitter, 
  Input, 
  Output, 
  PLATFORM_ID, 
  inject 
} from '@angular/core';
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
import { DialogModule } from 'primeng/dialog';
import { EstadosUsuarioEnum } from '../../enums/estado-usuario.enum';
import { RolesEnum } from '../../enums/roles.enum';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { DropdownModule } from 'primeng/dropdown';
import { UsuariosService } from '../../services/usuarios.service';



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

  archivos: File[] = [];

  loading = false;
  
  private readonly platformId = inject(PLATFORM_ID);

  form = new FormGroup ({
    id: new FormControl<number | null>(null),
    nombres: new FormControl<string | null>(null,[Validators.required]),
    apellidos:new FormControl<string | null>(null,[Validators.required]),
    email:new FormControl<string | null>(null,[Validators.required,Validators.email]),
    foto: new FormControl<string | null>(null),
    rol: new FormControl<RolesEnum| null>(null),
    nombreUsuario: new FormControl<string | null>(null,[Validators.required]),
    clave: new FormControl<string | null>(null,[Validators.required]),
    estado:  new FormControl< EstadosUsuarioEnum |null>(EstadosUsuarioEnum.ACTIVO)
});

constructor(
  private messageService: MessageService,
  private _usuariosService: UsuariosService,
) {}


ngOnInit() {
  this._usuariosService.getUsuarios().subscribe({
    next: (res) => {
      this.usuarios = res;
    },
    error: (err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Hubo un error al recuperar las datos de los usuarios' + err.message,
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
      summary: 'Debe ingresar todos los campos obligatorios',
    });
    return;
  }

  const formData = new FormData();
  const usuarioDto = this.form.getRawValue();

  if (usuarioDto.nombres) formData.append('nombres', usuarioDto.nombres);
  if (usuarioDto.apellidos) formData.append('apellidos', usuarioDto.apellidos);
  if (usuarioDto.email) formData.append('email', usuarioDto.email);
  if (usuarioDto.rol) formData.append('rol', usuarioDto.rol);
  if (usuarioDto.nombreUsuario) formData.append('nombreUsuario', usuarioDto.nombreUsuario);
  if (usuarioDto.clave) formData.append('clave', usuarioDto.clave);
  if (usuarioDto.estado) formData.append('estado', usuarioDto.estado);

  if (this.archivos.length > 0) {
    this.archivos.forEach(archivo => {
      formData.append('foto', archivo);
    });
  }
  this.loading = true;
  this._usuariosService.crear(formData).subscribe({
    next: (res) => {
      this.cerrar();
      this.refrescar.emit(true);
      this.messageService.add({
        severity: 'success',
        summary: 'Usuario registrado con éxito!',
        detail: 'Se han guardado los datos ingresados'
      });
    },
    error: (err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Ocurrió un error al registrar el usuario',
        detail: 'Ocurrió un error al intentar registrar un usuario:' + err.message
      });
    },
    complete: () => {
      this.loading = false;
    }
  });
}

cerrar() {
      this.visibleChange.emit(false);
    }


fotoSeleccionada(event: any): void {
      this.archivos = [];
      for (let file of event.files) {
        this.archivos.push(file);
      }
    }
  
}
