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
import { RolesEnum } from '../../enums/roles.enum';
import { ClienteDto } from '../../dtos/cliente.dto';
import { DropdownModule } from 'primeng/dropdown';
import { ClientesService } from '../../services/clientes.service';
import { EditarClienteDto } from '../../dtos/editar-cliente.dto';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-editar-cliente',
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
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.scss'
})
export class EditarClienteComponent {
  
  @Input({ required: true }) visible!: boolean;

  @Input({ required: false }) cliente!: ClienteDto| null;

  @Input({ required: true }) accion!: string;

  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() refrescar = new EventEmitter<boolean>();
  
  clientes!: ClienteDto[]

  roles = Object.values(RolesEnum);

  loading = false;
  
  private readonly platformId = inject(PLATFORM_ID);

  formEditarCliente = new FormGroup ({
    id: new FormControl<number | null>(null),
    nombres: new FormControl<string | null>(null), 
    apellidos: new FormControl<string | null>(null), 
    email: new FormControl<string | null>(null), 
    });

constructor(
  private messageService: MessageService,
  private _router: Router,
  private _clientesService: ClientesService,

) {}

ngOnInit() {
  this._clientesService.getClientes().subscribe({
    next: (res) => {
      this.clientes = res;
      this.cliente = this.clientes[0];
    },
    error: (err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Hubo un error al recuperar las opciones de Cliente',
      });
    },
  });
}

llenarTabla() {
  this.formEditarCliente.patchValue({
    id:this.cliente!.id as number,
    nombres:this.cliente!.nombres,
    apellidos:this.cliente!.apellidos,
    email:this.cliente!.email,
    });
}

ngOnChanges() {
  if (this.cliente) {
    this.llenarTabla();
  } else {
    this.formEditarCliente.reset();
  }
}

editar() {
  if (!this.formEditarCliente.valid) {
    this.formEditarCliente.markAllAsTouched();
    this.messageService.add({
      severity: 'error',
      summary: 'Debe ingresar todos los campos',
    });
    return;
  }
  
  const clienteDto = this.formEditarCliente.getRawValue();
  console.log('Datos a enviar:', clienteDto); // Aquí se imprimen los datos en la consola

  if (this.cliente) {
    const editarClienteDto: EditarClienteDto = {
      id: clienteDto.id!,
      nombres: clienteDto.nombres!,
      apellidos: clienteDto.apellidos!,
      email: clienteDto.email!,
    };
    
    console.log('EditarClienteDto:', editarClienteDto); // También se pueden imprimir los datos transformados

    this._clientesService.editar(editarClienteDto).subscribe({
      next: (res) => {
        this.cerrar();
        this.refrescar.emit(true);
        this.messageService.add({
          severity: 'success',
          summary: 'Cliente editado con éxito!',
          detail: 'Se ha realizado Los cambios al Cliente'
        });
        this.llenarTabla();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ocurrió un error al editar el Cliente',
          detail: 'Contactar al administrador'
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
      this.formEditarCliente.reset();
    }
    

}
