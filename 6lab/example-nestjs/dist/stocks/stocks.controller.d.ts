import { StocksService } from './stocks.service';
import { Stock } from './entities/stock.entity';
export declare class StocksController {
    private readonly stocksService;
    constructor(stocksService: StocksService);
    findAll(): Promise<Stock[]>;
    findOne(id: string): Promise<Stock>;
    create(body: Omit<Stock, 'id'>): Promise<Stock>;
}
