import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as sharp from 'sharp';
import 'multer';

const MAX_LENGTH = 300;

@Injectable()
export class ResizeImagePipe implements PipeTransform {
  transform(value: Express.Multer.File): Promise<Express.Multer.File> {
    const filetype = value.mimetype.split('/');
    if (filetype[0] !== 'image') {
      throw new BadRequestException();
    }

    return this.resizeImage(value);
  }

  async resizeImage(value: Express.Multer.File): Promise<Express.Multer.File> {
    let width: number;
    let height: number;

    await sharp(value.buffer)
      .metadata()
      .then(metadata => {
        width = metadata.width;
        height = metadata.height;
      });

    if (width < MAX_LENGTH && height < MAX_LENGTH) {
      return value;
    }

    const resizeOption =
      width >= height ? { width: MAX_LENGTH } : { height: MAX_LENGTH };

    const buffer = await sharp(value.buffer)
      .resize({ ...resizeOption })
      .webp({ lossless: true })
      .toBuffer();

    value.buffer = buffer;
    return value;
  }
}
