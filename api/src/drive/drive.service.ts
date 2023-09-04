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

  // async uploadFile(auth: GoogleData, folderId: string) {
  //   const drive = google.drive({
  //     version: 'v3',
  //     auth: auth.token.access_token,
  //   });

  //   const fileMetadata = {
  //     name: 'filecreation.txt',
  //     parents: [folderId],
  //   };
  //   const media = {
  //     mimeType: 'text/plain',
  //     body: fs.createReadStream('', 'utf8'),
  //   };
  //   try {
  //     const file = await drive.files.create({
  //       requestBody: fileMetadata,
  //       media: media,
  //     });
  //     console.log('File Id:', file.data.id);
  //     return file.data.id;
  //   } catch (err) {
  //     console.log('erro:', err);
  //     throw err;
  //   }
  // }

  async uploadFile(auth: GoogleData, folderId: string) {
    // const drive = google.drive({
    //   version: 'v3',
    //   auth: auth.token.access_token,
    // });

    const fileContent = fs.readFileSync('mock.txt', 'utf8');

    const file = new Blob([fileContent], { type: 'text/plain' });

    const fileMetadata = {
      name: 'filecreation.txt', // name of file on drive
      mimeType: 'text/plain',
      parents: [folderId],
    };

    const form = new FormData();
    form.append(
      'metadata',
      new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }),
    );
    form.append('file', file);
    try {
      fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
        {
          method: 'POST',
          headers: new Headers({
            Authorization: 'Bearer ' + auth.token.access_token,
          }),
          body: form,
        },
      )
        .then((res) => {
          return res.json();
        })
        .then(function (val) {
          console.log(val);
        });
    } catch (err) {
      console.log('erro:', err);
      throw err;
    }
  }
  // teste
  async getFolderById(auth: GoogleData, folderId: string) {
    const drive = google.drive({
      version: 'v3',
      auth: auth.token.access_token,
    });

    try {
      const response = await drive.files.get({
        fileId: folderId,
        fields: 'id, name, mimeType, parents',
      });
      return response.data;
    } catch (err) {
      console.log('erro:', err);
      throw err;
    }
  }
  // teste
  async getFilesInsideFolder(auth: GoogleData, folderId: string) {
    try {
      fetch(
        // `https://www.googleapis.com/drive/v3/files?q=${folderId}+in+parents&key=${process.env.GOOGLE_API_KEY}`,
        `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents`,
        {
          method: 'GET',
          headers: new Headers({
            authorization: 'Bearer ' + auth.token.access_token,
          }),
        },
      )
        .then((res) => {
          return res.json();
        })
        .then(function (val) {
          console.log(val);
        });
    } catch (err) {
      console.log('erro:', err);
      throw err;
    }
  }

  async getOneFileInsideFolder(auth: GoogleData, fileId: string) {
    try {
      fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?key=${process.env.GOOGLE_API_KEY}`,
        {
          method: 'GET',
          headers: new Headers({
            authorization: 'Bearer ' + auth.token.access_token,
          }),
        },
      )
        .then((res) => {
          return res.json();
        })
        .then(function (val) {
          console.log(val);
        });
    } catch (err) {
      console.log('erro:', err);
      throw err;
    }
  }

  async createFolder(auth: GoogleData, folderId: string) {
    const drive = google.drive({
      version: 'v3',
      auth: auth.token.access_token,
    });

    const fileMetadata = {
      name: 'Invoices',
      mimeType: 'application/vnd.google-apps.folder',
      parents: [folderId],
    };
    try {
      const file = await drive.files.create({
        requestBody: fileMetadata,
      });
      console.log('File Id:', file.data.id);
      return file.data.id;
    } catch (err) {
      console.log('erro:', err);
      throw err;
    }
  }

  async deleteFolderOrFileById(auth: GoogleData, fileId: string) {
    try {
      fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?key=${process.env.GOOGLE_API_KEY}`,
        {
          method: 'DELETE',
          headers: new Headers({
            Authorization: 'Bearer ' + auth.token.access_token,
          }),
        },
      )
        .then((res) => {
          return res.json();
        })
        .then(function (val) {
          console.log(val);
        });
    } catch (err) {
      console.log('erro:', err);
      throw err;
    }
  }

  async downloadFile(auth: GoogleData, fileId: string) {
    const drive = google.drive({
      version: 'v3',
      auth: auth.token.access_token,
    });

    try {
      const response = await drive.files.get(
        { fileId: fileId, alt: 'media' },
        { responseType: 'stream' },
      );
      return response.data;
    } catch (err) {
      console.log('erro:', err);
      throw err;
    }
  }

  async testDownloadFileInsideFolder(
    auth: GoogleData,
    folderId: string,
    fileId: string,
  ) {
    try {
      fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${process.env.GOOGLE_API_KEY}`,
        {
          method: 'GET',
          headers: new Headers({
            Authorization: 'Bearer ' + auth.token.access_token,
          }),
        },
      )
        .then((res) => {
          return res.json();
        })
        .then(function (val) {
          console.log(val);
        });
    } catch (err) {
      console.log('erro:', err);
      throw err;
    }
  }
}
