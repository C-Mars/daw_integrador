
import {v4 as uuid} from "uuid";
 
export const fileNamer = ( req: Express.Request, 
   foto:Express.Multer.File, 
   callback: Function)=>{

 if(!foto) return callback(new Error('Archivo vacio.'), false);

 
 const fileExtension = foto.mimetype.split('/')[1];
 const fileName = `${uuid()}.${fileExtension}`;

   return callback(null , fileName ) 

}