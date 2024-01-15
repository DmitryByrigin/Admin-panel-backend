import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';

// export const storage = {
//   storage: diskStorage({
//     destination: './uploads/profileimages',
//     filename: (
//       req: any,
//       file: { originalname: string },
//       cb: (arg0: null, arg1: string) => void,
//     ) => {
//       const filename: string =
//         path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
//       const extension: string = path.parse(file.originalname).ext;
//       cb(null, `${filename}${extension}`);
//     },
//   }),
// };

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async uploadImage(file) {
    console.log(file);
    const uploadDir = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'profileimages',
    );
    let filename: string =
      path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();

    const extension: string = path.parse(file.originalname).ext;
    const filePath = path.join(uploadDir, `${filename}${extension}`);
    filename = `${filename}${extension}`;
    // Создайте каталог для загрузки, если он еще не существует
    await fs.mkdir(uploadDir, { recursive: true });

    // Запишите загруженный файл в файловую систему
    await fs.writeFile(filePath, file.buffer);

    return {
      status: 'success',
      message: 'Файл успешно загружен',
      filename,
    };
  }
}
