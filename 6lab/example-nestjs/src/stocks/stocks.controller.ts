import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    this.stocksService.create(createStockDto);
    return { message: 'Stock created successfully' };
  }

  @Get()
  findAll(@Query('title') title?: string): Stock[] {
    return this.stocksService.findAll(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Stock | null {
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    this.stocksService.update(+id, updateStockDto);
    return {
      message: 'Stock updated successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.stocksService.remove(+id);
    return { message: 'Stock deleted successfully' };
  }
}