import { Controller, Get, Post, Patch, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  async findAll() {
    try {
      return await this.stocksService.findAll();
    } catch (error) {
      throw new HttpException('Ошибка при получении данных', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const stock = await this.stocksService.findOne(+id);
      if (!stock) {
        throw new HttpException(`Запись с ID ${id} не найдена`, HttpStatus.NOT_FOUND);
      }
      return stock;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Ошибка сервера', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() body: { src: string; title: string; text: string; description: string }) {
    try {
      if (!body.src || !body.title || !body.text || !body.description) {
        throw new HttpException('Заполните все поля: src, title, text, description', HttpStatus.BAD_REQUEST);
      }
      return await this.stocksService.create(body);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Ошибка при создании записи', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { src: string; title: string; text: string; description: string }) {
    try {
      if (!body.src || !body.title || !body.text || !body.description) {
        throw new HttpException('Заполните все поля: src, title, text, description', HttpStatus.BAD_REQUEST);
      }
      const stock = await this.stocksService.update(+id, body);
      if (!stock) {
        throw new HttpException(`Запись с ID ${id} не найдена`, HttpStatus.NOT_FOUND);
      }
      return stock;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Ошибка при обновлении записи', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}