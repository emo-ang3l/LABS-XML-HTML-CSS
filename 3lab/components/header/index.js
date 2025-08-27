export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
            `
                <div class="bg-white py-2">
                    <div class="container">
                        <div class="d-flex justify-content-between align-items-center">
                            <img src="https://i.pinimg.com/1200x/61/b4/2e/61b42efb740b83b33ebc9fabc7ee0e19.jpg" alt="Logo" style="height: 60px; width: auto; margin-left: -5; padding-left: px;">
                            <nav class="navbar navbar-expand-lg navbar-light">
                                <div class="collapse navbar-collapse justify-content-end">
                                    <ul class="navbar-nav">
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" style="cursor: pointer; padding: 0.5rem 1rem;">Поддержка</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" style="cursor: pointer; padding: 0.5rem 1rem;">Продажи</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" style="cursor: pointer; padding: 0.5rem 1rem;">Контент</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" style="cursor: pointer; padding: 0.5rem 1rem;">Бэк-офис</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" style="cursor: pointer; padding: 0.5rem 1rem;">Качество продуктов</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" style="cursor: pointer; padding: 0.5rem 1rem;">Пешеходы</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" style="cursor: pointer; padding: 0.5rem 1rem;">Нейросети</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="#" style="cursor: pointer; padding: 0.5rem 1rem;">Все вакансии</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <style>
                    .nav-link:hover {
                        text-decoration: underline;
                        color: #7e0606ff;
                    }
                </style>
            `
        );
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}