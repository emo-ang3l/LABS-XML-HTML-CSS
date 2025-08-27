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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let FileService = class FileService {
    constructor(filePath) {
        this.filePath = filePath;
        this.initializeFile();
    }
    async initializeFile() {
        try {
            await fs_1.promises.access(this.filePath);
            console.log(`Файл существует: ${this.filePath}`);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                console.log(`Создаём директорию и файл по пути: ${this.filePath}`);
                const dir = (0, path_1.dirname)(this.filePath);
                await fs_1.promises.mkdir(dir, { recursive: true });
                await fs_1.promises.writeFile(this.filePath, JSON.stringify([], null, 2), 'utf8');
                console.log(`Успешно создан файл ${this.filePath}`);
            }
            else {
                console.error(`Ошибка проверки файла ${this.filePath}: ${error.message}`);
                throw error;
            }
        }
    }
    async read() {
        try {
            console.log(`Чтение файла: ${this.filePath}`);
            const data = await fs_1.promises.readFile(this.filePath, 'utf8');
            console.log(`Содержимое файла: ${data}`);
            return JSON.parse(data);
        }
        catch (error) {
            console.error(`Ошибка чтения файла ${this.filePath}: ${error.message}`);
            throw error;
        }
    }
    async write(data) {
        try {
            console.log(`Запись в ${this.filePath}:`, JSON.stringify(data, null, 2));
            await fs_1.promises.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
            console.log(`Успешно записано в ${this.filePath}`);
        }
        catch (error) {
            console.error(`Ошибка записи в ${this.filePath}: ${error.message}`);
            throw error;
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], FileService);
//# sourceMappingURL=file.service.js.map