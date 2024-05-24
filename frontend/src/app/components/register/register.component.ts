import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
 
} from "@angular/forms";
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast'
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DialogModule } from 'primeng/dialog';
import { EstadosUsuarioEnum } from '../../enums/estado-usuario.enum';
import { RolesEnum } from '../../enums/roles.enum';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { DropdownModule } from 'primeng/dropdown';



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
  @Input() visible: boolean = false; 
  @Input({ required: false }) usuario!: UsuarioDto | null;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() refrescar = new EventEmitter<boolean>();
  
  usuarios!: UsuarioDto[];

  roles = Object.values(RolesEnum);

  estados = Object.values(EstadosUsuarioEnum);

  listaRol = []
  

  formRegistro = new FormGroup ({
    id: new FormControl<number | null>(null),
    nombres: new FormControl<string | null>(null,[Validators.required]),
    apellidos:new FormControl<string | null>(null,[Validators.required]),
    email:new FormControl<string | null>(null,[Validators.required]),
    foto: new FormControl<string | null>(null,[Validators.required]),
    rol: new FormControl<RolesEnum| null>(null),
    nombreUsuario: new FormControl<string | null>(null,[Validators.required]),
    clave: new FormControl<string | null>(null,[Validators.required]),
    estado:  new FormControl< EstadosUsuarioEnum |null>(EstadosUsuarioEnum.ACTIVO)
});







constructor(
  private messageService: MessageService,
  private router: Router,
  private authService: AuthService
) {}

ngOnInit() {
  this.authService.getUsuarios().subscribe({
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

onUpload(event: any) {
  const formData = new FormData();
  formData.append('file', event.files[0]);
}

llenarFormRegistro() {
  this.formRegistro.patchValue({
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
    this.llenarFormRegistro();
  } else {
    this.formRegistro.reset();
  }
}
enviar() {
  if (!this.formRegistro.valid) {
    this.formRegistro.markAllAsTouched();
    this.messageService.add({
      severity: 'error',
      summary: 'Debe ingresar todos los campos',
    });
    return;
  }
    const usuarioDto = this.formRegistro.getRawValue();

    if (this.usuario) {
      this.authService
        .crear({
          id: usuarioDto.id!,
          nombres:usuarioDto!.nombres,
          apellidos:usuarioDto!.apellidos,
          email:usuarioDto!.email,
          foto:usuarioDto!.foto,
          rol:usuarioDto!.rol,
          nombreUsuario:usuarioDto!.nombreUsuario,
          clave:usuarioDto!.clave,
          estado:usuarioDto!.estado})
         
        .subscribe({
          next: (res) => {
            this.cerrar();
            this.refrescar.emit();
            this.messageService.add({
              severity: 'success',
              summary: 'Registro realizado con exito!',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Ocurrió un error al registrar',
            });
          },
        });
    } 
    }
    
    // listUsuariosDrop() {
    //   this.authService.getUsuarios().subscribe(
    //     response => {
    //       this.listUsuarios = response.map(usuario => usuario.rol);
    //     }
    //   );
    // }

    cerrar() {
      this.visibleChange.emit(false);
    }

    closeDialog(){
      this.visible = false;
      this.visibleChange.emit(this.visible);
      this.formRegistro.reset();
    }
  
  }