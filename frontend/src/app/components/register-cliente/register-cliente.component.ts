import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
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
import { ClienteDto } from '../../dtos/cliente.dto';
import { DropdownModule } from 'primeng/dropdown';

import { EditarClienteDto } from '../../dtos/editar-cliente.dto';
import { ClientesService } from '../../services/clientes.service';

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
    DropdownModule
  ],
  templateUrl: './register-cliente.component.html',
  styleUrls: ['./register-cliente.component.scss']
})
export class RegisterClienteComponent {
  @Input({ required: true }) visible!: boolean;
  @Input({ required: false }) cliente!: ClienteDto | null;
  @Input({ required: true }) accion!: string;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() refrescar = new EventEmitter<boolean>();

  clientes!: ClienteDto[];
  roles = Object.values(RolesEnum);

  formRegistro = new FormGroup({
    id: new FormControl<number | null>(null),
    nombres: new FormControl<string | null>(null, [Validators.required]),
    apellidos: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [Validators.required, Validators.email])
  });

  constructor(
    private messageService: MessageService,
    private _router: Router,
    private _clientesService: ClientesService
  ) { }

  ngOnInit() {
    this._clientesService.getClientes().subscribe({
      next: (res) => {
        this.clientes = res;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hubo un error al recuperar las opciones de cliente',
        });
      },
    });
  }

  llenarFormRegistro() {
    if (this.cliente) {
      this.formRegistro.patchValue({
        id: this.cliente.id,
        nombres: this.cliente.nombres,
        apellidos: this.cliente.apellidos,
        email: this.cliente.email,
      });
    }
  }

  ngOnChanges() {
    if (this.cliente) {
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

    const clienteDto: ClienteDto = this.formRegistro.value as ClienteDto;

    if (this.accion === 'crear') {
      this._clientesService.crear(clienteDto).subscribe({
        next: (res) => {
          this.cerrar();
          this.refrescar.emit(true);
          this.messageService.add({
            severity: 'success',
            summary: 'Cliente registrado con éxito!',
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ocurrió un error al registrar el Cliente',
          });
        },
      });
    } else if (this.accion === 'editar' && this.cliente) {
      const editarClienteDto: EditarClienteDto = {
        id: this.cliente.id,
        nombres: clienteDto.nombres!, // Usamos el operador de no-null assertion
        apellidos: clienteDto.apellidos!, // Usamos el operador de no-null assertion
        email: clienteDto.email! // Usamos el operador de no-null assertion
      };

      this._clientesService.editar(editarClienteDto).subscribe({
        next: (res) => {
          this.cerrar();
          this.refrescar.emit(true);
          this.messageService.add({
            severity: 'success',
            summary: 'Cliente editado con éxito!',
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ocurrió un error al editar el Cliente',
          });
        },
      });
    }
  }

  cerrar() {
    this.visibleChange.emit(false);
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.formRegistro.reset();
  }

  // Subir los archivos
  onUpload(event: any) {
    const formData = new FormData();
    formData.append('file', event.files[0]);
  }
}
