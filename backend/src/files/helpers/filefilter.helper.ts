

export const fileFilter = ( req: Express.Request, file:Express.Multer.File, callback: Function)=>{

 if(!file) return callback(new Error('Archivo vacio.'), false);

 //Creo ctes para verificar si corresponden al formato de archivo de imagen
 const fileExptension = file.mimetype.split('.')[1];
 const validExtension = ['.jpg','.jpeg','.png'];

 if(validExtension.includes(fileExptension)){
    return callback(null ,true ) //acepta el archivo
 }
 callback(new Error('Formato de archivo no permitido.'), false);//no hacepta el archivo
}