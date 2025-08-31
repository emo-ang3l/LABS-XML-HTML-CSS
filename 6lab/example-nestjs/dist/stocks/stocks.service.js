"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let StocksService = class StocksService {
    stocksFile = (0, path_1.join)(__dirname, '..', '..', 'src', 'assets', 'stocks.json');
    async initializeStocksFile() {
        try {
            await fs_1.promises.access(this.stocksFile);
            console.log('stocks.json найден');
        }
        catch {
            console.log('Создаём новый stocks.json');
            await fs_1.promises.writeFile(this.stocksFile, JSON.stringify([], null, 2));
        }
    }
    async findAll() {
        try {
            const data = await fs_1.promises.readFile(this.stocksFile, 'utf8');
            return data ? JSON.parse(data) : [];
        }
        catch (error) {
            console.error('Ошибка чтения stocks.json:', error.message);
            throw error;
        }
    }
    async findOne(id) {
        const stocks = await this.findAll();
        return stocks.find((s) => s.id === id);
    }
    async create(stock) {
        const stocks = await this.findAll();
        const newStock = {
            id: stocks.length ? Math.max(...stocks.map((s) => s.id)) + 1 : 1,
            ...stock,
        };
        stocks.push(newStock);
        await fs_1.promises.writeFile(this.stocksFile, JSON.stringify(stocks, null, 2));
        return newStock;
    }
    async update(id, stock) {
        const stocks = await this.findAll();
        const stockIndex = stocks.findIndex((s) => s.id === id);
        if (stockIndex === -1)
            return null;
        stocks[stockIndex] = { id, ...stock };
        await fs_1.promises.writeFile(this.stocksFile, JSON.stringify(stocks, null, 2));
        return stocks[stockIndex];
    }
};
exports.StocksService = StocksService;
exports.StocksService = StocksService = __decorate([
    (0, common_1.Injectable)()
], StocksService);
//# sourceMappingURL=stocks.service.js.map