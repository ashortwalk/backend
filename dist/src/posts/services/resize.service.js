"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResizeImagePipe = void 0;
const common_1 = require("@nestjs/common");
const sharp = require("sharp");
const MAX_LENGTH = 300;
let ResizeImagePipe = class ResizeImagePipe {
    transform(value) {
        const filetype = value.mimetype.split('/');
        if (filetype[0] !== 'image') {
            throw new common_1.BadRequestException();
        }
        return this.resizeImage(value);
    }
    async resizeImage(value) {
        let width;
        let height;
        await sharp(value.buffer)
            .metadata()
            .then(metadata => {
            width = metadata.width;
            height = metadata.height;
        });
        if (width < MAX_LENGTH && height < MAX_LENGTH) {
            return value;
        }
        const resizeOption = width >= height ? { width: MAX_LENGTH } : { height: MAX_LENGTH };
        const buffer = await sharp(value.buffer)
            .resize({ ...resizeOption })
            .webp({ lossless: true })
            .toBuffer();
        value.buffer = buffer;
        return value;
    }
};
exports.ResizeImagePipe = ResizeImagePipe;
exports.ResizeImagePipe = ResizeImagePipe = __decorate([
    (0, common_1.Injectable)()
], ResizeImagePipe);
//# sourceMappingURL=resize.service.js.map