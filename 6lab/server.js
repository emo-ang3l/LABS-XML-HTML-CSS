const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json());

// Настройка CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH');
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
        if (!data) {
            console.log('stocks.json пуст, возвращаем пустой массив');
            return [];
        }
        console.log('Чтение stocks.json:', data);
        const stocks = JSON.parse(data);
        console.log('Разобранные данные:', stocks);
        return stocks;
    } catch (error) {
        console.error('Ошибка чтения stocks.json:', error.message);
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
        console.error('Ошибка записи в stocks.json:', error.message);
        throw error;
    }
}

// GET /stocks
app.get('/stocks', async (req, res) => {
    try {
        const stocks = await readStocks();
        console.log('GET /stocks: Возвращено записей:', stocks.length);
        res.json(stocks);
    } catch (error) {
        console.error('Ошибка в GET /stocks:', error.message);
        res.status(500).json({ error: 'Ошибка сервера при чтении данных' });
    }
});

// GET /stocks/:id
app.get('/stocks/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log('GET /stocks/:id: Поиск записи с ID:', id, 'Type:', typeof id);
        const stocks = await readStocks();
        console.log('GET /stocks/:id: Все записи:', stocks);
        const stock = stocks.find(s => s.id === id);
        if (stock) {
            console.log('GET /stocks/:id: Найдена запись:', stock);
            res.json(stock);
        } else {
            console.log('GET /stocks/:id: Запись не найдена для ID:', id);
            res.status(404).json({ message: `Cannot GET /stocks/${id}`, error: 'Not Found', statusCode: 404 });
        }
    } catch (error) {
        console.error('Ошибка в GET /stocks/:id:', error.message);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// POST /stocks
app.post('/stocks', async (req, res) => {
    try {
        const { src, title, text, history, traits, care } = req.body;
        console.log('Получены данные для POST:', { src, title, text, history, traits, care });
        if (!src || !title || !text || !history || !traits || !care) {
            console.log('Ошибка: отсутствуют обязательные поля');
            return res.status(400).json({ error: 'Заполните все поля: src, title, text, history, traits, care' });
        }
        const stocks = await readStocks();
        const newStock = {
            id: stocks.length ? Math.max(...stocks.map(s => s.id)) + 1 : 1,
            src,
            title,
            text,
            history,
            traits,
            care
        };
        console.log('Новая запись:', newStock);
        stocks.push(newStock);
        await writeStocks(stocks);
        console.log('POST /stocks: Запись успешно создана:', newStock);
        res.status(201).json(newStock);
    } catch (error) {
        console.error('Ошибка при создании записи:', error.message);
        res.status(500).json({ error: 'Ошибка сервера при сохранении данных' });
    }
});

// PATCH /stocks/:id
app.patch('/stocks/:id', async (req, res) => {
    try {
        const { src, title, text, history, traits, care } = req.body;
        console.log('Получены данные для PATCH:', { src, title, text, history, traits, care });
        if (!src || !title || !text || !history || !traits || !care) {
            console.log('Ошибка: отсутствуют обязательные поля');
            return res.status(400).json({ error: 'Заполните все поля: src, title, text, history, traits, care' });
        }
        const id = parseInt(req.params.id);
        console.log('PATCH /stocks/:id: Поиск записи с ID:', id, 'Type:', typeof id);
        const stocks = await readStocks();
        console.log('PATCH /stocks/:id: Все записи:', stocks);
        const stockIndex = stocks.findIndex(s => s.id === id);
        if (stockIndex === -1) {
            console.log('PATCH /stocks/:id: Запись не найдена для ID:', id);
            return res.status(404).json({ message: `Cannot PATCH /stocks/${id}`, error: 'Not Found', statusCode: 404 });
        }
        const updatedStock = {
            id,
            src,
            title,
            text,
            history,
            traits,
            care
        };
        console.log('Обновленная запись:', updatedStock);
        stocks[stockIndex] = updatedStock;
        await writeStocks(stocks);
        console.log('PATCH /stocks/:id: Запись успешно обновлена:', updatedStock);
        res.json(updatedStock);
    } catch (error) {
        console.error('Ошибка при обновлении записи:', error.message);
        res.status(500).json({ error: 'Ошибка сервера при обновлении данных' });
    }
});

app.listen(3000, async () => {
    await initializeStocksFile();
    console.log('Сервер запущен на http://localhost:3000');
});