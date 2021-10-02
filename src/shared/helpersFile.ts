import { Request } from 'express';
import { unlink } from 'fs';
import { extname } from 'path';
import { promisify } from 'util';

const unlinkAsync = promisify(unlink);
export class HelpersFile {
  static customFileName(req: Request, file: Express.Multer.File, cb: any) {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    return cb(null, `${randomName}${extname(file.originalname)}`);
  }

  static async removeFile(file: string) {
    try {
      await unlinkAsync(file);
    } catch (error) {
      throw new Error('Arquivo não encontrado');
    }
    return true;
  }
}
