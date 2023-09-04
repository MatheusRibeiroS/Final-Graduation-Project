import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
// import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { DriveService } from './drive.service';
import { GoogleData } from 'src/types/google';

@Controller('drive')
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  // @Get('auth')
  // async getAuth() {
  //   return this.driveService.getAuth();
  // }

  @Get()
  getFilesList(@Body() auth: GoogleData, folderId?: string) {
    console.log('auth', auth);
    return this.driveService.getFilesList(auth, folderId);
  }

  @Post('file/:folderId')
  async uploadFile(
    @Param('folderId') folderId: string,
    @Body() auth: GoogleData,
  ) {
    return this.driveService.uploadFile(auth, folderId);
  }

  @Post('upload/file/:folderId')
  async testeUploadFile(
    @Param('folderId') folderId: string,
    @Body() auth: GoogleData,
  ) {
    return this.driveService.uploadFile(auth, folderId);
  }

  @Post('folder/:folderId')
  async createFolder(
    @Param('folderId') folderId: string,
    @Body() auth: GoogleData,
  ) {
    return this.driveService.createFolder(auth, folderId);
  }

  @Get('folder/:folderId')
  async getFolderById(
    @Param('folderId') folderId: string,
    @Body() auth: GoogleData,
  ) {
    return this.driveService.getFolderById(auth, folderId);
  }

  @Get('folder/:folderId/files')
  async getFilesInsideFolder(
    @Param('folderId') folderId: string,
    @Body() auth: GoogleData,
  ) {
    return this.driveService.getFilesInsideFolder(auth, folderId);
  }

  @Get('getOne/:fileId')
  async getOneFileInsideFolder(
    @Param('folderId') folderId: string,
    @Param('fileId') fileId: string,
    @Body() auth: GoogleData,
  ) {
    return this.driveService.getOneFileInsideFolder(auth, fileId);
  }

  @Delete('delete/file/:fileId')
  async deleteFile(@Param('fileId') fileId: string, @Body() auth: GoogleData) {
    return this.driveService.deleteFolderOrFileById(auth, fileId);
  }

  @Get('download/:fileId')
  async downloadFile(auth: GoogleData, fileId: string) {
    return this.driveService.downloadFile(auth, fileId);
  }

  @Get('test/download/:folderId/:fileId')
  async testDownloadFile(auth: GoogleData, folderId: string, fileId: string) {
    return this.driveService.testDownloadFileInsideFolder(
      auth,
      folderId,
      fileId,
    );
  }

  // @Post()
  // async createFolder(auth: OAuth2Client, folderName: string) {
  //   return this.driveService.createFolder(auth, folderName);
  // }

  // @Delete('delete')
  // async deleteFile(auth: OAuth2Client, fileId: string) {
  //   return this.driveService.deleteFile(auth, fileId);
  // }
}
