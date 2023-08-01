import { Injectable } from '@nestjs/common';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import mime from 'mime-types';
import fs from 'fs';
import { googleAuthProps } from 'src/utils/types/drive-types';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class DriveService {
  getFilesList(auth: OAuth2Client, query?: string) {
    const drive = google.drive({ version: 'v3', auth });
    drive.files.list(
      {
        pageSize: 100,
        fields:
          'nextPageToken, files(id, name, mimeType, parents, webViewLink, webContentLink, iconLink, thumbnailLink)',
        q: query,
      },
      (err: any, res: any) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
          console.log('Files:');
          files.map((file: any) => {
            console.log(`${file.name} (${file.id})`);
          });
          return files;
        } else {
          console.log('No files found.');
        }
      },
    );
  }

  async createFolder(auth: OAuth2Client, folderName: string) {
    try {
      const drive = google.drive({ version: 'v3', auth: auth });
      const fileMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
      };
      drive.files.create(
        {
          // resource: fileMetadata,
          fields: 'id',
        },
        function (err, file) {
          if (err) {
            // Handle error
            console.error(err);
          } else {
            console.log('Folder Id:', file.data.id);
          }
        },
      );
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  }

  async deleteFile(auth: OAuth2Client, fileId: string) {
    try {
      const drive = google.drive({ version: 'v3', auth: auth });
      const response = await drive.files.delete({ fileId });
      console.log(response);
    } catch (err) {
      console.error('Error deleting file:', err);
    }
  }

  // async downloadFile(auth: OAuth2Client, fileId: string) {
  //   try {
  //     const drive = google.drive({ version: 'v3', auth: auth });
  //     const response = await drive.files.get(
  //       { fileId, alt: 'media' },
  //       { responseType: 'stream' },
  //     );
  //     const filePath = `./${fileId}`;
  //     const dest = fs.createWriteStream(filePath);
  //     response.data
  //       .on('end', () => {
  //         console.log('Done downloading file.');
  //       })
  //       .on('error', (err: any) => {
  //         console.error('Error downloading file.');
  //       })
  //       .pipe(dest);
  //   } catch (err) {
  //     console.error('Error downloading file:', err);
  //   }
  // }

  // async downloadFile(auth: OAuth2Client, fileId: string) {
  //   try {
  //     const drive = google.drive({ version: 'v3', auth: auth });
  //     const response = await drive.files.get({
  //       fileId: fileId,
  //       alt: 'media',
  //     });
  //     const fileData = response.data;
  //     const mimeType = response.headers['content-type'];
  //     console.log('mimetype', mimeType);
  //     const fileExtension = mime.extension(mimeType);
  //     const filePath = `teste.${fileExtension}`;

  //     await fs.writeFile(filePath, fileData, 'binary');
  //     console.log('The file has been saved!');
  //   } catch (err) {
  //     console.error('Error downloading file:', err);
  //   }
  // }
}
