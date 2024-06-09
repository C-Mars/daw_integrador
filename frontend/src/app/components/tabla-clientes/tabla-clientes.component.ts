import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { ClienteDto } from '../../dtos/cliente.dto';
import { MessageService } from 'primeng/api';

import { EliminarClienteComponent } from '../eliminar-cliente/eliminar-cliente.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ClientesService } from '../../services/clientes.service';
import { RegisterClienteComponent } from '../register-cliente/register-cliente.component';
import { EditarClienteComponent } from '../editar-cliente/editar-cliente.component';


@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  imports: [TableModule,
    CardModule,
    CommonModule,
    ButtonModule,
    NgIf,
    RegisterClienteComponent,
    EditarClienteComponent,
    ToastModule,
     ConfirmDialogModule,
     EliminarClienteComponent],
  templateUrl: './tabla-clientes.component.html',
  styleUrl: './tabla-clientes.component.scss'
})
export class TablaClientesComponent implements OnInit {

  titulo: string = 'CLIENTES'
  clientes!: ClienteDto[];
  newRegiterVisible: boolean = false;
  newEditVisible: boolean = false;
  newDeleteVisible: boolean = false;
  accion!: string
  clienteSeleccionado!: ClienteDto | null;
 
  constructor(
    private messageService: MessageService,
    private _clienteService: ClientesService,
    private _route: Router
  
  ) { }

  ngOnInit(): void {
    this.llenarTabla();
  }

  llenarTabla() {
  this._clienteService.getClientes().subscribe({
    next: (data: ClienteDto[]) => {
      this.clientes = data;
    },
    error: (err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Ocurrió un error al recuperar la lista',
      });
    },
  })
}

 


  
  nuevo() {
    this.clienteSeleccionado = null;
    this.accion = 'Crear';
    this.newRegiterVisible = true;
  }
  editar() {
    this.accion = 'Editar';
    this.newEditVisible = true;
  }

 

informacion(item: ClienteDto): void {
    this.clienteSeleccionado = item;
}

eliminar() {
    if (!this.clienteSeleccionado || !this.clienteSeleccionado.id) {
        console.error('No se puede eliminar el cliente seleccionado:', this.clienteSeleccionado);
        return;
    }
   
    this.newDeleteVisible = true;
}

}