class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() {
        return `${this.baseUrl}/stocks`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    removeStockById() {
        return `${this.baseUrl}/stocks/${id}`;
    }

    updateStockById() {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = {
    getStocks: () => 'http://localhost:3000/stocks',
    getStockById: (id) => `http://localhost:3000/stocks/${id}`,
    createStock: () => 'http://localhost:3000/stocks'
};