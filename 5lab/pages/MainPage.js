import { ajax } from '../modules/ajax.js';
import { stockUrls } from '../modules/stockUrls.js';
import { ProductCardComponent } from '../components/ProductCardComponent.js';

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="main-page container">
                <h1 class="text-center mb-4">Список акций</h1>
                <button id="create-stock-btn" class="btn btn-success mb-3">Создать акцию</button>
                <div id="main-page-content" class="d-flex flex-wrap"></div>
            </div>
        `;
    }

    get pageRoot() {
        return document.getElementById('main-page-content');
    }

    getData() {
        ajax.get(stockUrls.getStocks(), (data, status) => {
            console.log('Data from /stocks:', data, 'Status:', status); // Отладка
            if (status === 200 && data) {
                this.renderData(data);
            } else {
                console.error('Ошибка загрузки данных:', status);
                this.pageRoot.insertAdjacentHTML('beforeend', '<p class="text-danger text-center">Ошибка загрузки данных</p>');
            }
        });
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    clickCard(id) {
        window.location.hash = `#stock/${id}`;
    }

    clickCreate() {
        console.log('Create button clicked'); // Отладка
        window.location.hash = '#create';
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        const createButton = this.parent.querySelector('#create-stock-btn');
        if (createButton) {
            createButton.addEventListener('click', this.clickCreate.bind(this));
        } else {
            console.error('Create button not found'); // Отладка
        }
        this.getData();
    }
}