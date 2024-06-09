

export interface AjustesUsuarioDto{   
   
    id?:number |null,
    nombreUsuario?: string |null,
    // @Transform(({value})=> value.thim())
    clave?:string|null

}