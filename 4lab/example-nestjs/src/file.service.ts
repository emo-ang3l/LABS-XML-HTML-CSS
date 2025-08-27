import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';

@Injectable()
export class FileService<T> {
  constructor(private readonly filePath: string) {
    this.initializeFile();
  }

  private async initializeFile(): Promise<void> {
    try {
      await fs.access(this.filePath);
      console.log(`Файл существует: ${this.filePath}`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`Создаём директорию и файл по пути: ${this.filePath}`);
        const dir = dirname(this.filePath);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(this.filePath, JSON.stringify([], null, 2), 'utf8');
        console.log(`Успешно создан файл ${this.filePath}`);
      } else {
        console.error(`Ошибка проверки файла ${this.filePath}: ${error.message}`);
        throw error;
      }
    }
  }

  async read(): Promise<T> {
    try {
      console.log(`Чтение файла: ${this.filePath}`);
      const data = await fs.readFile(this.filePath, 'utf8');
      console.log(`Содержимое файла: ${data}`);
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Ошибка чтения файла ${this.filePath}: ${error.message}`);
      throw error;
    }
  }

  async write(data: T): Promise<void> {
    try {
      console.log(`Запись в ${this.filePath}:`, JSON.stringify(data, null, 2));
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Успешно записано в ${this.filePath}`);
    } catch (error) {
      console.error(`Ошибка записи в ${this.filePath}: ${error.message}`);
      throw error;
    }
  }
}