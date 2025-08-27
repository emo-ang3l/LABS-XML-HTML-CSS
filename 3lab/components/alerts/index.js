export class AlertComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(type, message) {
        return (
            `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `
        );
    }

    render(type, message) {
        const html = this.getHTML(type, message);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}