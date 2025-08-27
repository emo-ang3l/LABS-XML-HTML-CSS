import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { HeaderComponent } from "../../components/header/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return (
            `
                <div id="header"></div>
                <div id="product-page" class="container mt-3"></div>
            `
        );
    }

    getData() {
        const data = {
            1: {
                id: 1,
                src: "https://i.pinimg.com/736x/8b/0a/01/8b0a018a47efdc60b0cf1ad31a2e2688.jpg",
                title: "Лабрадор",
                text: "Лабрадоры известны своей дружелюбностью и универсальностью.",
                details: {
                    history: "Происходят из Ньюфаундленда, использовались рыбаками.",
                    traits: "Дружелюбные, умные, энергичные.",
                    care: "Нуждаются в регулярных прогулках и уходе за шерстью."
                }
            },
            2: {
                id: 2,
                src: "https://i.pinimg.com/736x/1f/08/fe/1f08fe84642e3f82f1218de5dfa7bc9f.jpg",
                title: "Немецкая овчарка",
                text: "Надежная порода, часто используемая в полиции.",
                details: {
                    history: "Выведены в Германии в конце 19 века.",
                    traits: "Лояльные, уверенные, смелые.",
                    care: "Требуют активных тренировок и социализации."
                }
            },
            3: {
                id: 3,
                src: "https://i.pinimg.com/736x/e1/eb/92/e1eb9236fe6ea55e0c15155403110521.jpg",
                title: "Немецкая овчарка",
                text: "Надежная порода, часто используемая в полиции.",
                details: {
                    history: "Выведены в Германии в конце 19 века.",
                    traits: "Лояльные, уверенные, смелые.",
                    care: "Требуют активных тренировок и социализации."
                }
            },
            4: {
                id: 4,
                src: "https://i.pinimg.com/736x/81/0a/70/810a7044dd27406bc41db23e066a29bb.jpg",
                title: "Бигль",
                text: "Маленькие, но энергичные охотничьи собаки.",
                details: {
                    history: "Использовались для охоты на зайцев в Англии.",
                    traits: "Любознательные, дружелюбные, упрямые.",
                    care: "Нуждаются в длительных прогулках и контроле питания."
                }
            },
            5: {
                id: 5,
                src: "https://i.pinimg.com/originals/57/bb/90/57bb9060ec92c24e09a15e52a7d19036.jpg",
                title: "Бигль",
                text: "Маленькие, но энергичные охотничьи собаки.",
                details: {
                    history: "Использовались для охоты на зайцев в Англии.",
                    traits: "Любознательные, дружелюбные, упрямые.",
                    care: "Нуждаются в длительных прогулках и контроле питания."
                }
            }
        };
        return data[this.id] || data[1]; // Возвращаем данные по id или дефолтные
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        // ⬅️ Рендерим header
        const header = new HeaderComponent(document.getElementById('header'));
        header.render();

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);
    }
}
