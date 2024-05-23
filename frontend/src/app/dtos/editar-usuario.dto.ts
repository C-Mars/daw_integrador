import { EstadosUsuarioEnum } from "../enums/estado-usuario.enum"
import { RolesEnum } from "../enums/roles.enum"

export interface UsuarioDto{
        id:number
        nombres: string |null
        apellidos:string|null
        email:string|null
        foto: string|null
        rol: RolesEnum|null
        nombreUsuario: string|null
        clave:string|null
        estado:EstadosUsuarioEnum|null
    }
