"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksService = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("../file.service");
let StocksService = class StocksService {
    fileService;
    constructor(fileService) {
        this.fileService = fileService;
    }
    create(createStockDto) {
        const stocks = this.fileService.read();
        const newId = stocks.length > 0 ? Math.max(...stocks.map(s => s.id)) + 1 : 1;
        const newStock = { id: newId, ...createStockDto };
        stocks.push(newStock);
        this.fileService.write(stocks);
    }
    findAll(title) {
        const stocks = this.fileService.read();
        if (title) {
            return stocks.filter(stock => stock.title.toLowerCase().includes(title.toLowerCase()));
        }
        return stocks;
    }
    findOne(id) {
        const stocks = this.fileService.read();
        return stocks.find(stock => stock.id === id) || null;
    }
    update(id, updateStockDto) {
        const stocks = this.fileService.read();
        const index = stocks.findIndex(stock => stock.id === id);
        if (index === -1) {
            throw `Stock with id ${id} not found`;
        }
        stocks[index] = { ...stocks[index], ...updateStockDto };
        this.fileService.write(stocks);
    }
    remove(id) {
        const stocks = this.fileService.read();
        const updatedStocks = stocks.filter(stock => stock.id !== id);
        this.fileService.write(updatedStocks);
    }
};
exports.StocksService = StocksService;
exports.StocksService = StocksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], StocksService);
//# sourceMappingURL=stocks.service.js.map