import { EstadosUsuarioEnum } from "../enums/estado-usuario.enum"
import { RolesEnum } from "../enums/roles.enum"

export interface EditarUsuarioDto {
    id?: number,
    nombres?: string | null,
    apellidos?: string | null,
    email?: string | null,
    foto?: string | null,
    fotoUrl?: string | null,
    rol?: RolesEnum | null,
    estado?: EstadosUsuarioEnum | null,
    nombreUsuario?: string | null,
    clave?: string | null,
}