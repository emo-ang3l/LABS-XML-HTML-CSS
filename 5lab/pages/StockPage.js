import { ajax } from '../modules/ajax.js';
import { stockUrls } from '../modules/stockUrls.js';
import { ProductCardComponent } from '../components/ProductCardComponent.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js';

export class StockPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getHTML() {
        return `
            <div class="stock-page container">
                <h1 class="text-center mb-4">Акция #${this.id}</h1>
                <div id="stock-page-content"></div>
            </div>
        `;
    }

    get pageRoot() {
        return document.getElementById('stock-page-content');
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data, status) => {
            console.log('Data from /stocks/' + this.id + ':', data, 'Status:', status); // Отладка
            if (status === 200 && data) {
                this.renderData(data);
            } else {
                console.error('Ошибка загрузки карточки:', status);
                this.pageRoot.insertAdjacentHTML('beforeend', '<p class="text-danger">Ошибка загрузки карточки</p>');
            }
        });
    }

    renderData(item) {
        const html = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${item.src || 'https://via.placeholder.com/300x180'}" class="img-fluid rounded-start" alt="${item.title || 'Акция'}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${item.title || 'Без названия'}</h5>
                            <p class="card-text">${item.text || 'Без описания'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.pageRoot.insertAdjacentHTML('beforeend', html);
    }

    clickBack() {
        window.location.hash = '';
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
        this.getData();
    }
}