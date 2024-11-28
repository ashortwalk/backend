import { PipeTransform } from '@nestjs/common';
export declare class ResizeImagePipe implements PipeTransform {
    transform(value: Express.Multer.File): Promise<Express.Multer.File>;
    resizeImage(value: Express.Multer.File): Promise<Express.Multer.File>;
}
