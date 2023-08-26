import { Injectable, BadRequestException } from '@nestjs/common';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import mime from 'mime-types';
import * as fs from 'fs';
import { GoogleData } from '@/types/google';
import { OAuth2Client, GoogleAuth } from 'google-auth-library';
import axios from 'axios';

@Injectable()
export class DriveService {
  // async getAuth() {
  //   const auth = new GoogleAuth({
  //     scopes: 'https://www.googleapis.com/auth/drive',
  //   });
  //   const service = google.drive({ version: 'v3', auth });
  //   const requestBody = {
  //     name: 'photo.jpg',
  //     fields: 'id',
  //   };
  //   const media = {
  //     mimeType: 'image/jpeg',
  //     body: fs.createReadStream('mock.txt', 'utf8'),
  //   };
  //   try {
  //     const file = await service.files.create({
  //       requestBody,
  //       media: media,
  //     });
  //     console.log('File Id:', file.data.id);
  //     return file.data.id;
  //   } catch (err) {
  //     console.log('erro:', err);
  //     throw err;
  //   }
  // }

  async getFilesList(auth: GoogleData, folderId?: string) {
    let url;

    folderId
      ? (url = `https://www.googleapis.com/drive/v3/files?q=${folderId}+in+parents&key=${process.env.GOOGLE_API_KEY}`)
      : (url = `https://www.googleapis.com/drive/v3/files?alt=json`);

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.token.access_token}`,
        },
      });

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Error getting files list:' + error.message,
        error: error,
      });
    }
  }

  async uploadFile(auth: GoogleData, folderId: string) {
    const drive = google.drive({
      version: 'v3',
      auth: auth.token.access_token,
    });

    const fileMetadata = {
      name: 'filecreation.txt',
      parents: [folderId],
    };
    const media = {
      mimeType: 'text/plain',
      body: fs.createReadStream('', 'utf8'),
    };
    try {
      const file = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
      });
      console.log('File Id:', file.data.id);
      return file.data.id;
    } catch (err) {
      console.log('erro:', err);
      throw err;
    }
  }
}
