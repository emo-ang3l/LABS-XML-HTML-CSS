import { Injectable } from '@nestjs/common';
import { FileService } from '../file.service';
import { Stock } from './entities/stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import e from 'express';

@Injectable()
export class StocksService {
  constructor(private fileService: FileService<Stock[]>) {}

  create(createStockDto: CreateStockDto): void {
    const stocks = this.fileService.read();
    const newId = stocks.length > 0 ? Math.max(...stocks.map(s => s.id)) + 1 : 1;
    const newStock = { id: newId, ...createStockDto };
    stocks.push(newStock);
    this.fileService.write(stocks);
  }

  findAll(title?: string): Stock[] {
    const stocks = this.fileService.read();
    if (title) {
      return stocks.filter(stock => stock.title.toLowerCase().includes(title.toLowerCase()));
    }
    return stocks;
  }

  findOne(id: number): Stock | null {
    const stocks = this.fileService.read();
    return stocks.find(stock => stock.id === id) || null;
  }

  update(id: number, updateStockDto: UpdateStockDto): void {
      const stocks = this.fileService.read();
      const index = stocks.findIndex(stock => stock.id === id);
      if (index === -1) {
        throw `Stock with id ${id} not found`;
      }
      stocks[index] = { ...stocks[index], ...updateStockDto };
      this.fileService.write(stocks);
    }

  remove(id: number): void {
    const stocks = this.fileService.read();
    const updatedStocks = stocks.filter(stock => stock.id !== id);
    this.fileService.write(updatedStocks);
  }
}