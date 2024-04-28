import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream, writeFileSync } from 'fs';
import { extname, join } from 'path';import { writeFile } from 'fs/promises';

@Injectable()
export class ArchivosService {
  async guardarArchivo(file: Express.Multer.File): Promise<string> {
    // Generar un nombre único para el archivo
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    const extension = extname(file.originalname);
    const nombreArchivo = `${randomName}${extension}`;
    const rutaArchivo = join(__dirname, '..', '..','..', 'static', 'usuarios', nombreArchivo); // Ruta absoluta donde se guardará el archivo
    
   
    // Crear un flujo de lectura del archivo
    const readStream = createReadStream(file.path);

    // Crear un flujo de escritura para el archivo
    const writeStream = createWriteStream(rutaArchivo);

    // Pipe para copiar el contenido del flujo de lectura al flujo de escritura
    readStream.pipe(writeStream);

    // Esperar a que se complete la escritura del archivo
    await new Promise<void>((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });


   return nombreArchivo; // Devolver el nombre del archivo guardado
  }
}
