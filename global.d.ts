import * as multer from 'multer';
import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      file: multer.File; // 싱글 파일 업로드
      files: multer.File[]; // 다중 파일 업로드
    }
  }
}
