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

  // @Get('download')
  // async downloadFile(auth: OAuth2Client, fileId: string) {
  //   return this.driveService.downloadFile(auth, fileId);
  // }

  // @Post()
  // async createFolder(auth: OAuth2Client, folderName: string) {
  //   return this.driveService.createFolder(auth, folderName);
  // }

  // @Delete('delete')
  // async deleteFile(auth: OAuth2Client, fileId: string) {
  //   return this.driveService.deleteFile(auth, fileId);
  // }
}
