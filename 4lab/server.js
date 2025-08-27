const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json());

// Настройка CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Путь к stocks.json
const stocksFile = path.join(__dirname, 'stocks.json');

// Инициализация stocks.json
async function initializeStocksFile() {
    try {
        await fs.access(stocksFile);
        console.log('stocks.json найден');
    } catch (error) {
        console.log('Создаём новый stocks.json');
        await fs.writeFile(stocksFile, JSON.stringify([]));
    }
}

// Чтение stocks.json
async function readStocks() {
    try {
        const data = await fs.readFile(stocksFile, 'utf8');
        console.log('Чтение stocks.json:', data);
        return JSON.parse(data);
    } catch (error) {
        console.error('Ошибка чтения stocks.json:', error);
        return [];
    }
}

// Запись в stocks.json
async function writeStocks(stocks) {
    try {
        console.log('Запись в stocks.json:', JSON.stringify(stocks, null, 2));
        await fs.writeFile(stocksFile, JSON.stringify(stocks, null, 2));
        console.log('Данные успешно записаны в stocks.json');
    } catch (error) {
        console.error('Ошибка записи в stocks.json:', error);
        throw error;
    }
}

// GET /stocks
app.get('/stocks', async (req, res) => {
    try {
        const stocks = await readStocks();
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера при чтении данных' });
    }
});

// GET /stocks/:id
app.get('/stocks/:id', async (req, res) => {
    try {
        const stocks = await readStocks();
        const stock = stocks.find(s => s.id === parseInt(req.params.id));
        if (stock) {
            res.json(stock);
        } else {
            res.status(404).json({ error: 'Акция не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// POST /stocks
app.post('/stocks', async (req, res) => {
    try {
        const { src, title, text } = req.body;
        console.log('Получены данные для POST:', { src, title, text }); // Отладка
        if (!src || !title || !text) {
            console.log('Ошибка: отсутствуют обязательные поля');
            return res.status(400).json({ error: 'Заполните все поля: src, title, text' });
        }
        const stocks = await readStocks();
        const newStock = {
            id: stocks.length ? Math.max(...stocks.map(s => s.id)) + 1 : 1,
            src,
            title,
            text
        };
        console.log('Новая акция:', newStock);
        stocks.push(newStock);
        await writeStocks(stocks);
        res.status(201).json(newStock);
    } catch (error) {
        console.error('Ошибка при создании акции:', error);
        res.status(500).json({ error: 'Ошибка сервера при сохранении данных' });
    }
});

app.listen(3000, async () => {
    await initializeStocksFile();
    console.log('Сервер запущен на http://localhost:3000');
});