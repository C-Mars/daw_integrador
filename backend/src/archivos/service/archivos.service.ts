import { BadRequestException, Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream, existsSync, writeFileSync } from 'fs';//file sistem
import { extname, join } from 'path';
import { writeFile } from 'fs/promises';

@Injectable()
export class ArchivosService {
  async guardarArchivo(foto: Express.Multer.File): Promise<string> {
    
    if (!foto) {
      console.error('Archivo no válido (indefinido o nulo):', foto);
      return;
    }
  
    if (!foto.originalname || !foto.path) {
      console.error('Archivo no válido (sin propiedad originalname o path no funciona):', foto);
      return;
    }
    // Genera un nombre único para el archivo
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    const extension = extname(foto.originalname);
    const nombreArchivo = `${randomName}${extension}`;
    const rutaArchivo = join(__dirname, '..', '..','..', 'static', 'usuarios', nombreArchivo);
    
    // Crea un flujo de lectura del archivo
    const readStream = createReadStream(foto.path);

    // Crea un flujo de escritura para el archivo
    const writeStream = createWriteStream(rutaArchivo);

    // Pipe para copiar el contenido del flujo de lectura al flujo de escritura
    readStream.pipe(writeStream);

    // Esperar a que se complete la escritura del archivo
    await new Promise<void>((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);  
    });

    return nombreArchivo;
  }
}


