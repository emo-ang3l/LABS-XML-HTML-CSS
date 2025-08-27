import { FileService } from '../file.service';
import { Stock } from './entities/stock.entity';
export declare class StocksService {
    private readonly fileService;
    constructor(fileService: FileService<Stock[]>);
    findAll(): Promise<Stock[]>;
    findOne(id: number): Promise<Stock>;
    create(stock: Omit<Stock, 'id'>): Promise<Stock>;
}
