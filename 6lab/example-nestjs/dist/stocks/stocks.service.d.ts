export declare class StocksService {
    private readonly stocksFile;
    initializeStocksFile(): Promise<void>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    create(stock: {
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
    update(id: number, stock: {
        src: string;
        title: string;
        text: string;
        description: string;
    }): Promise<any>;
}
