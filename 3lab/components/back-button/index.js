export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("back-button")
            .addEventListener("click", listener);
    }

    getHTML() {
        return (
            `
                <button id="back-button" class="btn btn mb-3" type="button" style="border-radius: 1rem; background-color: #ad0909ff; color: white; border: none; font-weight: bold; padding: 8px 16px; transition: transform 0.3s ease;">Назад</button>
            `
        );
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}