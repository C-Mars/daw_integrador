import { BadRequestException } from "@nestjs/common";
 
export const fileFilter = ( req: Express.Request, 
   foto:Express.Multer.File, 
   callback: Function)=>{

 if(!foto) return callback(new Error('Archivo vacio.'), false);

 //Creo ctes para verificar si corresponden al formato de archivo de imagen
 const fileExtension = foto.mimetype.split('/')[1];
 const validExtension = ['jpg','jpeg','png'];

 if(validExtension.includes(fileExtension)){
   //acepta el archivo
    return callback(null ,true ) 
 }
   ;
   //no hacepta el archivo
   callback(new BadRequestException('El archivo no corresponde a una imagen'), false);

}