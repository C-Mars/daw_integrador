import { EstadosUsuarioEnum } from "../enums/estado-usuario.enum"
import { RolesEnum } from "../enums/roles.enum"

export interface IUsuario{
        nombres: string
        apellidos:string
        email:string
        foto: string
        rol: RolesEnum
        nombreUsuario: string
        clave:string
        estado:EstadosUsuarioEnum
    }
