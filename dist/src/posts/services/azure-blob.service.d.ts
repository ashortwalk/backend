export declare class AzureBlobService {
    private containerName;
    private azureConnection;
    private getBlobClient;
    upload(file: Express.Multer.File, containerName: string): Promise<string>;
    getFile(fileName: string, containerName: string): Promise<NodeJS.ReadableStream>;
    deleteFile(filename: string, containerName: string): Promise<import("@azure/storage-blob").BlobDeleteIfExistsResponse>;
}
