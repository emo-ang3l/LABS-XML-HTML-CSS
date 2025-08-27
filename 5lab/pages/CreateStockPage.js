import { ajax } from '../modules/ajax.js';
import { stockUrls } from '../modules/stockUrls.js';
import { BackButtonComponent } from '../components/BackButtonComponent.js';

export class CreateStockPage {
    constructor(parent, onStockCreated) {
        this.parent = parent;
        this.onStockCreated = onStockCreated;
    }

    getHTML() {
        return `
            <div class="create-stock-page container">
                <h1 class="text-center mb-4">Создать новую акцию</h1>
                <div id="create-stock-content">
                    <form id="create-stock-form" class="card p-4 mx-auto" style="max-width: 500px;">
                        <div class="mb-3">
                            <label for="stock-src" class="form-label">URL изображения</label>
                            <input type="url" class="form-control" id="stock-src" placeholder="https://example.com/image.jpg">
                        </div>
                        <div class="mb-3">
                            <label for="stock-title" class="form-label">Название акции</label>
                            <input type="text" class="form-control" id="stock-title" placeholder="Акция 1">
                        </div>
                        <div class="mb-3">
                            <label for="stock-text" class="form-label">Описание акции</label>
                            <textarea class="form-control" id="stock-text" rows="4" placeholder="Описание акции"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Создать</button>
                    </form>
                    <div id="form-message" class="mt-3"></div>
                </div>
            </div>
        `;
    }

    get pageRoot() {
        return document.getElementById('create-stock-content');
    }

    clickBack() {
        window.location.hash = '';
    }

    handleSubmit(e) {
        e.preventDefault();
        const src = document.getElementById('stock-src').value;
        const title = document.getElementById('stock-title').value;
        const text = document.getElementById('stock-text').value;
        const messageDiv = document.getElementById('form-message');

        if (!src || !title || !text) {
            messageDiv.innerHTML = '<p class="text-danger">Заполните все поля!</p>';
            return;
        }

        const data = { src, title, text };
        console.log('Sending POST data:', data);
        ajax.post(stockUrls.createStock(), data, (response, status) => {
            console.log('POST response:', response, 'Status:', status);
            if (status === 201 || status === 200) {
                messageDiv.innerHTML = '<p class="text-success">Акция успешно создана!</p>';
                document.getElementById('create-stock-form').reset();
                if (this.onStockCreated) {
                    console.log('Calling onStockCreated to refresh main page');
                    this.onStockCreated();
                }
                setTimeout(() => {
                    console.log('Redirecting to main page');
                    window.location.hash = '';
                }, 2000);
            } else {
                const errorMsg = response && response.error ? response.error : `Ошибка ${status}: Не удалось создать акцию`;
                console.error('POST error:', errorMsg);
                messageDiv.innerHTML = `<p class="text-danger">${errorMsg}</p>`;
            }
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const form = document.getElementById('create-stock-form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        } else {
            console.error('Form element not found');
        }
    }
}