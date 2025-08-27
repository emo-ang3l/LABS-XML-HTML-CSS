import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { HeaderComponent } from "../../components/header/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

getHTML() {
    return (
        `
            <div id="header"></div>
            <div id="main-page" class="card-container">
                <!-- Карточки будут добавлены динамически -->
            </div>
            <style>
                .card-container {
                    display: flex;
                    flex-wrap: nowrap; /* карточки не переносятся */
                    overflow-x: auto;  /* горизонтальная прокрутка */
                    padding: 15px;
                    gap: 20px; 
                    scrollbar-width: thin;
                    scrollbar-color: #ad0909 transparent;
                }

                .card-container::-webkit-scrollbar {
                    height: 8px;
                }
                .card-container::-webkit-scrollbar-track {
                    background: transparent;
                }
                .card-container::-webkit-scrollbar-thumb {
                    background-color: #ad0909;
                    border-radius: 4px;
                    border: 2px solid transparent;
                }
                .card-container::-webkit-scrollbar-thumb:hover {
                    background-color: #7e0606;
                }

                /* карточки не уменьшаются */
                .card-container .card {
                    flex: 0 0 auto;
                }

                /* Мобильные */
                @media (max-width: 768px) {
                    .card-container {
                        flex-wrap: wrap;
                        overflow-x: hidden;
                    }
                    .card {
                        width: 100% !important;
                    }
                }

                /* 🔴 Красная цветовая схема аккордеона */
                .accordion-button {
                    background-color: #ad0909;
                    color: #fff;
                    font-weight: bold;
                }
                .accordion-button:not(.collapsed) {
                    background-color: #7e0606;
                    color: #fff;
                }
                .accordion-button:focus {
                    border-color: #ad0909;
                    box-shadow: 0 0 0 0.25rem rgba(173, 9, 9, 0.5);
                }
                .accordion-body {
                    border-left: 3px solid #ad0909;
                }
            </style>
        `
    );
}



    getData() {
        return [
            {
                id: 1,
                src: "https://i.pinimg.com/736x/8b/0a/01/8b0a018a47efdc60b0cf1ad31a2e2688.jpg",
                title: "Лабрадор",
                text: "Дружелюбная и умная порода, идеальная для семьи."
            },
            {
                id: 2,
                src: "https://i.pinimg.com/736x/1f/08/fe/1f08fe84642e3f82f1218de5dfa7bc9f.jpg",
                title: "Немецкая овчарка",
                text: "Верный и защитный компаньон, отличный для службы."
            },
            {
                id: 3,
                src: "https://i.pinimg.com/736x/e1/eb/92/e1eb9236fe6ea55e0c15155403110521.jpg",
                title: "Немецкая овчарка",
                text: "Верный и защитный компаньон, отличный для службы."
            },
            {
                id: 4,
                src: "https://i.pinimg.com/736x/81/0a/70/810a7044dd27406bc41db23e066a29bb.jpg",
                title: "Немецкая овчарка",
                text: "Верный и защитный компаньон, отличный для службы."
            },
            {
                id: 5,
                src: "https://i.pinimg.com/originals/57/bb/90/57bb9060ec92c24e09a15e52a7d19036.jpg",
                title: "Немецкая овчарка",
                text: "Верный и защитный компаньон, отличный для службы."
            }
        ];
    }

    clickCard(e) {
        const cardId = e.target.dataset.id;
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const header = new HeaderComponent(document.getElementById('header'));
        header.render();

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}