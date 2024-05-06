import { BadRequestException } from "@nestjs/common";
 
export const fileFilter = ( req: Express.Request, 
   file:Express.Multer.File, 
   callback: Function)=>{

 if(!file) return callback(new Error('Archivo vacio.'), false);

 //Creo ctes para verificar si corresponden al formato de archivo de imagen
 const fileExtension = file.mimetype.split('/')[1];
 const validExtension = ['jpg','jpeg','png'];

 if(validExtension.includes(fileExtension)){
    return callback(null ,true ) //acepta el archivo
 }
   ;
   callback(new BadRequestException('El archivo no corresponde a una imagen'), false);//no hacepta el archivo

}