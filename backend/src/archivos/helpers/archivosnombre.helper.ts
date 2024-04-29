

export const fileName = ( req: Express.Request, 
   file:Express.Multer.File, 
   callback: Function)=>{

 if(!file) return callback(new Error('Archivo vacio.'), false);

    const fileExtension = file.mimetype.split('/')[1];
    const fileName= `Hola munto.${fileExtension}`; 

 callback(null, 'Nuevo nombre');//no hacepta el archivo
}