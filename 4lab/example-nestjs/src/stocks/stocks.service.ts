import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { FileService } from '../file.service';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(private readonly fileService: FileService<Stock[]>) {}

  async findAll(): Promise<Stock[]> {
    console.log('StocksService: Запрос всех акций');
    return this.fileService.read();
  }

  async findOne(id: number): Promise<Stock> {
    console.log(`StocksService: Запрос акции с id ${id}`);
    const stocks = await this.fileService.read();
    const stock = stocks.find(s => s.id === id);
    if (!stock) {
      console.log(`StocksService: Акция с id ${id} не найдена`);
      throw new HttpException(`Акция с id ${id} не найдена`, HttpStatus.NOT_FOUND);
    }
    return stock;
  }

  async create(stock: Omit<Stock, 'id'>): Promise<Stock> {
    console.log('StocksService: Создание акции:', stock);
    if (!stock.src || !stock.title || !stock.text) {
      console.log('StocksService: Отсутствуют обязательные поля');
      throw new HttpException('Заполните все поля: src, title, text', HttpStatus.BAD_REQUEST);
    }
    const stocks = await this.fileService.read();
    const newStock = {
      id: stocks.length ? Math.max(...stocks.map(s => s.id)) + 1 : 1,
      ...stock,
    };
    stocks.push(newStock);
    console.log('StocksService: Сохранение акций:', stocks);
    await this.fileService.write(stocks);
    console.log('StocksService: Акция создана:', newStock);
    return newStock;
  }
}