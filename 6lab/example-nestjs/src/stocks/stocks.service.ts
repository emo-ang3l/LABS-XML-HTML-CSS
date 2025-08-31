import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class StocksService {
  private readonly stocksFile = join(__dirname, '..', '..', 'src', 'assets', 'stocks.json');

  async initializeStocksFile() {
    try {
      await fs.access(this.stocksFile);
      console.log('stocks.json найден');
    } catch {
      console.log('Создаём новый stocks.json');
      await fs.writeFile(this.stocksFile, JSON.stringify([], null, 2));
    }
  }

  async findAll() {
    try {
      const data = await fs.readFile(this.stocksFile, 'utf8');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Ошибка чтения stocks.json:', error.message);
      throw error;
    }
  }

  async findOne(id: number) {
    const stocks = await this.findAll();
    return stocks.find((s: any) => s.id === id);
  }

  async create(stock: { src: string; title: string; text: string; description: string }) {
    const stocks = await this.findAll();
    const newStock = {
      id: stocks.length ? Math.max(...stocks.map((s: any) => s.id)) + 1 : 1,
      ...stock,
    };
    stocks.push(newStock);
    await fs.writeFile(this.stocksFile, JSON.stringify(stocks, null, 2));
    return newStock;
  }

  async update(id: number, stock: { src: string; title: string; text: string; description: string }) {
    const stocks = await this.findAll();
    const stockIndex = stocks.findIndex((s: any) => s.id === id);
    if (stockIndex === -1) return null;
    stocks[stockIndex] = { id, ...stock };
    await fs.writeFile(this.stocksFile, JSON.stringify(stocks, null, 2));
    return stocks[stockIndex];
  }
}