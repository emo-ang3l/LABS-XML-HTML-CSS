import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService<T> {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = path.resolve(__dirname, filePath);
  }

  public read(): T {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as T;
  }

  public write(data: T): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  public add(newData: any): void {
    const data = this.read();
    if (Array.isArray(data)) {
      data.push(newData);
      this.write(data);
    }
  }
}