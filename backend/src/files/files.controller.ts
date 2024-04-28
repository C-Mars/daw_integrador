import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UseGuards, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import path from 'path';

@ApiTags('fotos')
@Controller('/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  
  @Post('/usuarios')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination:'../../static/usuarios'})
  }))
  async subirFiles(@UploadedFile() file: Express.Multer.File,) : Promise<{ fileName: string }>{
    
    if (!file){
      throw new BadRequestException('El archivo no corresponde a una imagen');
    }

    return { 
      fileName : file.originalname
    }
  }
  
}
