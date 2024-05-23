import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder
} from "@angular/forms";
import { FileUploadModule } from 'primeng/fileupload';
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
    CardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Input() visible: boolean = false; 
  @Output() visibleChange = new EventEmitter<boolean>();
  
  

  formRegistro = new FormGroup ({
    id: new FormControl<number | null>(null),
    // nombres:['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    // apellidos:['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    // email: ['', [Validators.required, Validators.email]],
    // foto:['', [Validators.required]],
    // nombreUsuario:['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    // clave: ['', Validators.required],
    // rol: RolesEnum,
    // estado: EstadosUsuarioEnum.ACTIVO
   


});
constructor(
  private fb: FormBuilder,
  private messageService: MessageService,
  private router: Router,
  private authService: AuthService
) {}

ngOnInit() {}


// get nombres() {
//   return this.formRegistro.controls['nombres'];
// }
// get apellidos() {
//   return this.formRegistro.controls['nombres'];
// }



// get email() {
//   return this.formRegistro.controls['email'];
// }
// get nombreUsuario() {
//   return this.formRegistro.controls['nombres'];
// }
// get clave() {
//   return this.formRegistro.controls['clave'];
// }



// submitDetails() {
//   const postData = { ...this.formRegistro.value };
  
//   this.authService.registroUsuario(postData as IUsuario).subscribe(
//     response => {
//       console.log(response);
//       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfully' });
//       this.router.navigate(['inicio'])
//     },
//     (error) => {
//       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
//     }
//   )
// }




closeDialog() {
  this.visible = false;
  this.visibleChange.emit(this.visible);
  // this.formRegistro.reset();
}

// }
}

