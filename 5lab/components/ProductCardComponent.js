export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card m-2" style="width: 300px;" data-id="${data.id}">
                <img class="card-img-top" src="${data.src || 'https://via.placeholder.com/300x180'}" alt="${data.title || 'Акция'}">
                <div class="card-body">
                    <h5 class="card-title">${data.title || 'Без названия'}</h5>
                    <p class="card-text">${data.text || 'Без описания'}</p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                </div>
            </div>
        `;
    }

    render(data, clickHandler = null) {
        console.log('Rendering card with data:', data); // Отладка
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        if (clickHandler) {
            const button = this.parent.querySelector(`#click-card-${data.id}`);
            button.addEventListener('click', () => clickHandler(data.id));
        }
    }
}