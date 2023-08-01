import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { DriveService } from './drive.service';

@Controller('drive')
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  @Get()
  getFilesList(auth: OAuth2Client, query?: string) {
    return this.driveService.getFilesList(auth, query);
  }

  // @Get('download')
  // async downloadFile(auth: OAuth2Client, fileId: string) {
  //   return this.driveService.downloadFile(auth, fileId);
  // }

  @Post()
  async createFolder(auth: OAuth2Client, folderName: string) {
    return this.driveService.createFolder(auth, folderName);
  }

  @Delete('delete')
  async deleteFile(auth: OAuth2Client, fileId: string) {
    return this.driveService.deleteFile(auth, fileId);
  }
}
