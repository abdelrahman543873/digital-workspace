import fs from 'fs';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';

export const blobUploader = async (path: string, fileName: string) => {
  const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.STORAGE_CONTAINER_NAME,
    process.env.MICROSOFT_STORAGE_KEY,
  );
  const blobServiceClient = new BlobServiceClient(
    process.env.STORAGE_URL,
    sharedKeyCredential,
  );
  const file = fs.readFileSync(path);
  const containerClient = blobServiceClient.getContainerClient(
    process.env.STORAGE_BLOB_CONTAINER_NAME,
  );
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  return await blockBlobClient.upload(file, file.length);
};
