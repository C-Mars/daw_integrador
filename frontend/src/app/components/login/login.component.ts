import { Component, NgModule } from "@angular/core";
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
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


@Component({
    standalone: true,
    templateUrl: './login.component.html',
<<<<<<< HEAD
    styleUrl:'./login.component.scss',
    selector:'app-login',
    imports:[]
=======
    styleUrl: './login.component.scss',
    selector: 'app-login',
    imports: [ReactiveFormsModule, 
      CardModule, 
      ToolbarModule, 
      InputTextModule, 
      ButtonModule, 
      FloatLabelModule, 
      PasswordModule,
      ToastModule]
>>>>>>> 304e7ac1bb87f3a26333f55ce78279baff5c0f82
})
export class LoginComponent {
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
                this.router.navigateByUrl('admin');
              } else {
                this.router.navigateByUrl('');
              }
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error al au tenticar. Verifique el usuario y la clave',
              });
            },
          });
      }
}