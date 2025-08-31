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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksController = void 0;
const common_1 = require("@nestjs/common");
const stocks_service_1 = require("./stocks.service");
let StocksController = class StocksController {
    stocksService;
    constructor(stocksService) {
        this.stocksService = stocksService;
    }
    async findAll() {
        try {
            return await this.stocksService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException('Ошибка при получении данных', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const stock = await this.stocksService.findOne(+id);
            if (!stock) {
                throw new common_1.HttpException(`Запись с ID ${id} не найдена`, common_1.HttpStatus.NOT_FOUND);
            }
            return stock;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Ошибка сервера', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(body) {
        try {
            if (!body.src || !body.title || !body.text || !body.description) {
                throw new common_1.HttpException('Заполните все поля: src, title, text, description', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.stocksService.create(body);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Ошибка при создании записи', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, body) {
        try {
            if (!body.src || !body.title || !body.text || !body.description) {
                throw new common_1.HttpException('Заполните все поля: src, title, text, description', common_1.HttpStatus.BAD_REQUEST);
            }
            const stock = await this.stocksService.update(+id, body);
            if (!stock) {
                throw new common_1.HttpException(`Запись с ID ${id} не найдена`, common_1.HttpStatus.NOT_FOUND);
            }
            return stock;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Ошибка при обновлении записи', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.StocksController = StocksController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StocksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StocksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StocksController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StocksController.prototype, "update", null);
exports.StocksController = StocksController = __decorate([
    (0, common_1.Controller)('stocks'),
    __metadata("design:paramtypes", [stocks_service_1.StocksService])
], StocksController);
//# sourceMappingURL=stocks.controller.js.map