import { Module } from '@nestjs/common';
import { StocksController } from './stocks/stocks.controller';
import { StocksService } from './stocks/stocks.service';

@Module({
  imports: [],
  controllers: [StocksController],
  providers: [StocksService],
})
export class AppModule {}