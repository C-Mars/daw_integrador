
import {v4 as uuid} from "uuid";
 
export const fileNamer = ( req: Express.Request, 
   file:Express.Multer.File, 
   callback: Function)=>{

 if(!file) return callback(new Error('Archivo vacio.'), false);

 
 const fileExtension = file.mimetype.split('/')[1];
 const fileName = `${uuid()}.${fileExtension}`;

    return callback(null , fileName ) 

}