import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as sharp from 'sharp';

const MAX_LENGTH = 300;

@Injectable()
export class ResizeImagePipe implements PipeTransform {
  async transform(value) {
    const filetype = value.mimetype.split('/');
    if (filetype[0] === 'image') {
      value = await this.resizeImage(value);
    } else {
      throw new BadRequestException();
    }
    return value;
  }

  async resizeImage(value: Express.Multer.File) {
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
      .toBuffer();

    value.buffer = buffer;
    return value;
  }
}
