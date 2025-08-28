import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { Stock } from './entities/stock.entity';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Get()
  async findAll(): Promise<Stock[]> {
    console.log('StocksController: Обработка GET /stocks');
    return this.stocksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Stock> {
    console.log(`StocksController: Обработка GET /stocks/${id}`);
    return this.stocksService.findOne(+id);
  }

  @Post()
  async create(@Body() body: Omit<Stock, 'id'>): Promise<Stock> {
    console.log('StocksController: Обработка POST /stocks с телом:', body);
    return this.stocksService.create(body);
  }
}