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
import {ToastModule} from 'primeng/toast'
import { FloatLabelModule } from 'primeng/floatlabel';
import { RolesEnum } from "../../enums/roles.enum";
import { MessageService } from "primeng/api";
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { NgIf } from "@angular/common";


@Component({
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    selector: 'app-login',
    imports: [ReactiveFormsModule, 
      DialogModule,
      ToolbarModule,NgIf, InputTextModule,ButtonModule,FloatLabelModule,PasswordModule,ImageModule,ToastModule]
})
export class LoginComponent {
  
  @Input() visible: boolean = false; 
  @Output() visibleChange = new EventEmitter<boolean>();

  // Método para cerrar el modal
 

  
    form = new FormGroup({
        nombreUsuario: new FormControl('', [Validators.required]),
        clave: new FormControl('', [Validators.required])
    });

    constructor(
        private messageService: MessageService,
        private router: Router,
        private authService: AuthService
        
      ) {}
    
      ngOnInit() {}
    
      login() {
        if (!this.form.valid) {
          this.form.markAllAsTouched();
          this.messageService.add({
            severity: 'error',
            summary: 'Debe ingresar todos los campos',
          });
          return;
        }
        const formValue = this.form.getRawValue();
        this.authService
          .login(formValue.nombreUsuario!, formValue.clave!)
          .subscribe({
            next: (res) => {
              this.authService.setSession(res.token);
              if (this.authService.hasRole(RolesEnum.ADMINISTRADOR)) {
                this.router.navigateByUrl('inicio-admin');
                
              } else {
                this.router.navigateByUrl('');
              }
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error al autenticar. Verifique el usuario y la clave',
              });
            },
          });
      }

      
      closeDialog() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
        this.form.reset();
      }

}