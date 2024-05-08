import { EstadoActividad } from "src/actividades/enums/estado-actividad.enum";
import { OperacionAuditoria } from "../enums/auditoriaEnum.enum";
import { IsNotEmpty } from "class-validator";


export class ModificarAuditoriaDto{

    @IsNotEmpty()
    estado: EstadoActividad;

    @IsNotEmpty()
    operacion: OperacionAuditoria;
}