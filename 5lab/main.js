import { MainPage } from './pages/MainPage.js';
import { StockPage } from './pages/StockPage.js';
import { CreateStockPage } from './pages/CreateStockPage.js';

const root = document.getElementById('root');

function navigate() {
    const hash = window.location.hash;
    console.log('Navigating to:', hash); // Отладка
    if (hash.startsWith('#stock/')) {
        const id = hash.split('/')[1];
        console.log('Loading StockPage with ID:', id);
        const page = new StockPage(root, id);
        page.render();
    } else if (hash === '#create') {
        console.log('Loading CreateStockPage');
        const page = new CreateStockPage(root);
        page.render();
    } else {
        console.log('Loading MainPage');
        const page = new MainPage(root);
        page.render();
    }
}

window.addEventListener('hashchange', navigate);
navigate();