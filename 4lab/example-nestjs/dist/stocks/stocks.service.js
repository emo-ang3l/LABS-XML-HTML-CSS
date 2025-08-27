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
    constructor(fileService) {
        this.fileService = fileService;
    }
    async findAll() {
        console.log('StocksService: Запрос всех акций');
        return this.fileService.read();
    }
    async findOne(id) {
        console.log(`StocksService: Запрос акции с id ${id}`);
        const stocks = await this.fileService.read();
        const stock = stocks.find(s => s.id === id);
        if (!stock) {
            console.log(`StocksService: Акция с id ${id} не найдена`);
            throw new common_1.HttpException(`Акция с id ${id} не найдена`, common_1.HttpStatus.NOT_FOUND);
        }
        return stock;
    }
    async create(stock) {
        console.log('StocksService: Создание акции:', stock);
        if (!stock.src || !stock.title || !stock.text) {
            console.log('StocksService: Отсутствуют обязательные поля');
            throw new common_1.HttpException('Заполните все поля: src, title, text', common_1.HttpStatus.BAD_REQUEST);
        }
        const stocks = await this.fileService.read();
        const newStock = Object.assign({ id: stocks.length ? Math.max(...stocks.map(s => s.id)) + 1 : 1 }, stock);
        stocks.push(newStock);
        console.log('StocksService: Сохранение акций:', stocks);
        await this.fileService.write(stocks);
        console.log('StocksService: Акция создана:', newStock);
        return newStock;
    }
};
exports.StocksService = StocksService;
exports.StocksService = StocksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], StocksService);
//# sourceMappingURL=stocks.service.js.map