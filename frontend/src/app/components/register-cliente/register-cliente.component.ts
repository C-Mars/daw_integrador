import { Component, EventEmitter, Input, Output, PLATFORM_ID, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { RolesEnum } from '../../enums/roles.enum';
import { DropdownModule } from 'primeng/dropdown';
import { ClientesService } from '../../services/clientes.service';
import { CrearClienteDto } from '../../dtos/crear-cliente.dto';
import { SafeUrl } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { ClienteDto } from '../../dtos/cliente.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { EditarClienteDto } from '../../dtos/editar-cliente.dto';


@Component({
  selector: 'app-register-cliente',
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
    DropdownModule
  ],
  templateUrl: './register-cliente.component.html',
  styleUrls: ['./register-cliente.component.scss'] // Asegúrate de que esta línea use 'styleUrls' en lugar de 'styleUrl'
})
export class RegisterClienteComponent {
  @Input({ required: true }) visible!: boolean;
  @Input({ required: false }) cliente!: ClienteDto | null;
  @Input({ required: true }) accion!: string;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() refrescar = new EventEmitter<boolean>();

  clientes!: ClienteDto[];
  roles = Object.values(RolesEnum);
  loading = false;
  private readonly platformId = inject(PLATFORM_ID);

  formRegistro = new FormGroup({
    nombres: new FormControl<string | null>(null, [Validators.required]),
    apellidos: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email])
  });

  constructor(
    private messageService: MessageService,
    private _router: Router,
    private _clientesService: ClientesService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this._clientesService.getClientes().subscribe({
      next: (res) => {
        this.clientes = res;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hubo un error al recuperar las opciones de Cliente',
        });
      }
    });
  }

  llenarForm() {
    if (this.cliente) {
      this.formRegistro.patchValue({
        nombres: this.cliente.nombres,
        apellidos: this.cliente.apellidos,
        email: this.cliente.email
      });
    }
  }

  ngOnChanges() {
    if (this.cliente) {
      this.llenarForm();
    } else {
      this.formRegistro.reset();
    }
  }
  
// Dentro de tu componente

enviar() {
  if (!this.formRegistro.valid) {
    this.formRegistro.markAllAsTouched();
    this.messageService.add({
      severity: 'error',
      summary: 'Debe ingresar todos los campos',
    });
    return;
  }
  const nombres: string | null = this.formRegistro.value.nombres ?? null;
  const apellidos: string | null = this.formRegistro.value.apellidos ?? null;

  const email: string | null = this.formRegistro.value.email ?? null;

  const clienteDto: CrearClienteDto = {
    nombres: nombres,
    apellidos: apellidos,
    email: email
  };

  this._clientesService.crear(clienteDto).subscribe({
    next: (res) => {
      this.cerrar();
      this.refrescar.emit(true);
      this.messageService.add({
        severity: 'success',
        summary: 'Usuario registrado con éxito!',
      });
    },
    error: (err) => {
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
}

