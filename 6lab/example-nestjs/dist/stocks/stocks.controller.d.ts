import { StocksService } from './stocks.service';
export declare class StocksController {
    private readonly stocksService;
    constructor(stocksService: StocksService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(body: {
        src: string;
        title: string;
        text: string;
        description: string;
    }): Promise<{
        src: string;
        title: string;
        text: string;
        description: string;
        id: number;
    }>;
    update(id: string, body: {
        src: string;
        title: string;
        text: string;
        description: string;
    }): Promise<any>;
}
