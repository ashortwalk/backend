"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureBlobService = void 0;
const common_1 = require("@nestjs/common");
const storage_blob_1 = require("@azure/storage-blob");
const uuid_1 = require("uuid");
let AzureBlobService = class AzureBlobService {
    constructor() {
        this.azureConnection = process.env.AZURE_BLOB_CONNECTION;
    }
    getBlobClient(imageName) {
        const blobClientService = storage_blob_1.BlobServiceClient.fromConnectionString(this.azureConnection);
        const containerClient = blobClientService.getContainerClient(this.containerName);
        const blobClient = containerClient.getBlockBlobClient(imageName);
        return blobClient;
    }
    async upload(file, containerName) {
        try {
            this.containerName = containerName;
            const pdfUrl = (0, uuid_1.v4)() + file.originalname;
            const blobClient = this.getBlobClient(pdfUrl);
            await blobClient.uploadData(file.buffer, {
                blobHTTPHeaders: {
                    blobContentType: file.mimetype,
                },
            });
            return pdfUrl;
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw new Error('Failed to upload file');
        }
    }
    async getFile(fileName, containerName) {
        this.containerName = containerName;
        const blobClient = this.getBlobClient(fileName);
        const blobDownloaded = await blobClient.download();
        return blobDownloaded.readableStreamBody;
    }
    deleteFile(filename, containerName) {
        this.containerName = containerName;
        const blobClient = this.getBlobClient(filename);
        return blobClient.deleteIfExists();
    }
};
exports.AzureBlobService = AzureBlobService;
exports.AzureBlobService = AzureBlobService = __decorate([
    (0, common_1.Injectable)()
], AzureBlobService);
//# sourceMappingURL=azure-blob.service.js.map