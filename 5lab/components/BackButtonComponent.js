export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <button id="back-button" class="btn btn-primary mb-3">Назад</button>
        `;
    }

    render(clickHandler) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        const button = this.parent.querySelector('#back-button');
        button.addEventListener('click', clickHandler);
    }
}