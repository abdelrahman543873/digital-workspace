import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import fs from 'fs';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { blobUploader } from '../utils/storage-blob-uploader';

@Injectable()
export class FileCloudUploadInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    if (request.files) {
      const infos = Object.keys(request.files).map((file) => {
        // this is done this way to cope with the two mechanisms of uploading multiple files
        // by either multiple fields or one field that has multiple images
        return {
          path: request.files[file]?.[0]?.path || request.files[file].path,
          filename:
            request.files[file]?.[0]?.filename || request.files[file].filename,
        };
      });
      for await (const info of infos) {
        const uploadResponse = await blobUploader(info.path, info.filename);
        if (!uploadResponse) throw new BaseHttpException('EN', 606);
        await fs.unlinkSync(info.path);
      }
    }
    if (request.file) {
      const uploadResponse = await blobUploader(
        request.file.path,
        request.file.filename,
      );
      if (!uploadResponse) throw new BaseHttpException('EN', 606);
      await fs.unlinkSync(request.file.path);
    }
    return next.handle();
  }
}
