import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { fileFilter } from './helpers/filefilter.helper';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // @ApiBearerAuth()
  // @Roles([RolesEnum.ADMINISTRADOR])
  // @UseGuards(AuthGuard)
  @Post('usuario')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter
  }))
  async subirFiles(@UploadedFile() file: Express.Multer.File){
    return await file
  }
  
}
