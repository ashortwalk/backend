import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { v4 as uuid } from 'uuid';
import 'multer';

@Injectable()
export class AzureBlobService {
  private containerName: string;
  private azureConnection = process.env.AZURE_BLOB_CONNECTION;

  private getBlobClient(imageName: string): BlockBlobClient {
    const blobClientService = BlobServiceClient.fromConnectionString(
      this.azureConnection,
    );
    const containerClient = blobClientService.getContainerClient(
      this.containerName,
    );
    const blobClient = containerClient.getBlockBlobClient(imageName);
    return blobClient;
  }

  async upload(file, containerName: string): Promise<string> {
    try {
      this.containerName = containerName;
      const pdfUrl = uuid() + file.originalname;
      const blobClient = this.getBlobClient(pdfUrl);
      await blobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype,
        },
      });
      return pdfUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  async getFile(fileName: string, containerName: string) {
    this.containerName = containerName;
    const blobClient = this.getBlobClient(fileName);
    const blobDownloaded = await blobClient.download();
    return blobDownloaded.readableStreamBody;
  }

  deleteFile(filename: string, containerName: string) {
    this.containerName = containerName;
    const blobClient = this.getBlobClient(filename);
    return blobClient.deleteIfExists();
  }
}
