// Модуль предварительной загрузки (без изменений)
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver(o => {
    for (const i of o)
      if (i.type === "childList")
        for (const s of i.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = e(o);
    fetch(o.href, i);
  }
})();

// Глобальная корзина
let cart = [];

// Функция обновления количества в корзине
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = document.getElementById('cart-count');
  if (cartBadge) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = cartCount > 0 ? 'inline' : 'none';
  }
}

class ApiService {
  constructor() {
    this.baseUrl = "http://localhost:3000";
  }
  getStocks() {
    return `${this.baseUrl}/stocks`;
  }
  getStockById(t) {
    return `${this.baseUrl}/stocks/${t}`;
  }
  updateStockById(t) {
    return `${this.baseUrl}/stocks/${t}`;
  }
}

const apiService = new ApiService();

class HttpService {
  async get(t) {
    try {
      const e = await fetch(t);
      if (!e.ok) throw new Error(`HTTP error! status: ${e.status}`);
      return await e.json();
    } catch (e) {
      console.error("Ошибка при выполнении GET-запроса:", e);
      throw e;
    }
  }
  async patch(t, e) {
    try {
      const r = await fetch(t, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e),
      });
      if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
      return await r.json();
    } catch (r) {
      console.error("Ошибка при выполнении PATCH-запроса:", r);
      throw r;
    }
  }
  async post(t, e) {
    try {
      const r = await fetch(t, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e),
      });
      if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
      return await r.json();
    } catch (r) {
      console.error("Ошибка при выполнении POST-запроса:", r);
      throw r;
    }
  }
}

const httpService = new HttpService();

class Card {
  constructor(parent) {
    this.parent = parent;
  }

  textStyles = {
    fontSizeTitle: "1.2rem",
    fontSizeText: "2rem",
    fontWeightTitle: "normal",
    fontWeightText: "bold",
    color: "white",
    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.4)",
    textAlign: "left",
    marginBottomTitle: "0.5rem",
    marginBottomText: "0.5rem",
    padding: "10px",
    lineHeight: "1",
  };

  getHTML(e, isSelected) {
    return `
      <div class="card m-2 card-hover ${isSelected ? 'border' : ''}" style="width: 355px; position: relative; border-radius: 2rem; overflow: hidden; background: #f8f9fa; ${isSelected ? 'border: 2px solid #FFC107;' : ''}">
        <div style="position: relative; width: 100%; height: 600px; overflow: hidden; border-radius: 0.5rem;">
          <img class="card-img-top card-image" src="${e.src}" alt="${e.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.5rem; transition: transform 0.5s ease;">
          <div style="position: absolute; top: 12px; left: 10px; right: 10px; padding: ${this.textStyles.padding}; color: ${this.textStyles.color}; text-shadow: ${this.textStyles.textShadow}; text-align: ${this.textStyles.textAlign}; line-height: ${this.textStyles.lineHeight};">
            <h5 class="card-title mb-${this.textStyles.marginBottomTitle.replace("rem","")}" style="font-size: ${this.textStyles.fontSizeTitle}; font-weight: ${this.textStyles.fontWeightTitle};">${e.title}</h5>
            <p class="card-text mb-${this.textStyles.marginBottomText.replace("rem","")}" style="font-size: ${this.textStyles.fontSizeText}; font-weight: ${this.textStyles.fontWeightText}; line-height: ${this.textStyles.lineHeight};">${e.text}</p>
          </div>
          <div style="position: absolute; bottom: 20px; left: 95px; right: 95px;">
            <button class="btn w-100 select-button" id="select-card-${e.id}" data-id="${e.id}" style="border-radius: 1rem; background-color: ${isSelected ? '#FFC107' : '#FFC107'}; color: white; border: none; font-weight: bold; padding: 8px 16px; transition: transform 0.3s ease;">${isSelected ? 'Добавлено' : 'Выбрать'}</button>
            <div id="quantity-div-${e.id}" style="display: none; text-align: center;">
              <input type="number" id="quantity-input-${e.id}" min="1" value="1" style="width: 60px; margin-right: 5px;">
              <button class="btn btn-sm" id="add-to-cart-${e.id}" style="border-radius: 1rem; background-color: #FFC107; color: white; border: none;">Добавить в корзину</button>
            </div>
            <button class="btn w-100 mt-2" id="click-card-${e.id}" data-id="${e.id}" style="border-radius: 1rem; background-color: #FFC107; color: white; border: none; font-weight: bold; padding: 8px 16px; transition: transform 0.3s ease;">Подробнее</button>
          </div>
        </div>
      </div>
      <style>
        .btn:hover { transform: scale(1.05); }
        .card-hover:hover .card-image { transform: scale(1.1); }
      </style>
    `;
  }

  addListeners(e, detailCallback) {
    const selectButton = document.getElementById(`select-card-${e.id}`);
    if (selectButton) {
      selectButton.addEventListener("click", () => {
        selectButton.style.display = 'none';
        const quantityDiv = document.getElementById(`quantity-div-${e.id}`);
        if (quantityDiv) quantityDiv.style.display = 'block';
      });
    } else {
      console.warn(`Select button select-card-${e.id} not found`);
    }
    const addToCartButton = document.getElementById(`add-to-cart-${e.id}`);
    if (addToCartButton) {
      addToCartButton.addEventListener("click", () => {
        const quantityInput = document.getElementById(`quantity-input-${e.id}`);
        const quantity = parseInt(quantityInput.value) || 1;
        const existingItem = cart.find(item => item.id === e.id);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.push({ id: e.id, quantity });
        }
        updateCartCount();
        const quantityDiv = document.getElementById(`quantity-div-${e.id}`);
        if (quantityDiv) quantityDiv.style.display = 'none';
        selectButton.textContent = 'Добавлено';
        selectButton.style.display = 'block';
      });
    } else {
      console.warn(`Add to cart button add-to-cart-${e.id} not found`);
    }
    const detailButton = document.getElementById(`click-card-${e.id}`);
    if (detailButton) {
      detailButton.addEventListener("click", detailCallback);
    } else {
      console.warn(`Button click-card-${e.id} not found`);
    }
  }

  render(e, detailCallback) {
    const o = this.getHTML(e, cart.some(item => item.id === e.id));
    this.parent.insertAdjacentHTML("beforeend", o);
    this.addListeners(e, detailCallback);
  }
}

class DetailCard {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(e) {
    return `
      <div class="card mb-4 shadow-sm card-hover" style="max-width: 2000px; margin: 0 auto; border-radius: 1.5rem; overflow: hidden; background: #ffffff;">
        <div class="row g-0">
          <div class="col-md-4 d-flex align-items-center justify-content-center p-3" style="background: linear-gradient(135deg, #faf8f8ff, #e9ecef);">
            <img src="${e.src || ''}" class="img-fluid rounded-3" alt="${e.title || 'Без названия'}" style="max-height: 250px; object-fit: contain;">
          </div>
          <div class="col-md-8">
            <div class="card-body" style="padding: 1.5rem;">
              <h4 class="card-title mb-2" style="font-size: 1.5rem; font-weight: 700; color: #212529;">${e.title || 'Без названия'}</h4>
              <p class="card-text mb-4" style="color: #495057; font-size: 1rem; line-height: 1.5;">${e.text || 'Описание отсутствует'}</p>
              <div class="accordion" id="accordion-${e.id}">
                <div class="accordion-item" style="border: none;">
                  <h2 class="accordion-header" id="headingOne-${e.id}">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne-${e.id}" aria-expanded="true" aria-controls="collapseOne-${e.id}" style="background-color: #FFC107; color: #fff; font-weight: bold;">
                      Подробное описание
                    </button>
                  </h2>
                  <div id="collapseOne-${e.id}" class="accordion-collapse collapse show" aria-labelledby="headingOne-${e.id}" data-bs-parent="#accordion-${e.id}">
                    <div class="accordion-body" style="font-size: 0.95rem; color: #343a40; border-left: 3px solid #FFC107;">
                      ${e.description || 'Подробного описания пока нет.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        .accordion-button:not(.collapsed) {
          background-color: #FFC107;
          color: #fff;
        }
        .accordion-button:focus {
          box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);
        }
      </style>
    `;
  }

  render(e) {
    const i = this.getHTML(e);
    this.parent.insertAdjacentHTML("beforeend", i);
  }
}

class BackButton {
  constructor(parent) {
    this.parent = parent;
  }

  addListeners(e) {
    const backButton = document.getElementById("back-button");
    if (backButton) {
      backButton.addEventListener("click", e);
    } else {
      console.warn('Back button not found');
    }
  }

  getHTML() {
    return `
      <button id="back-button" class="btn btn mb-3" type="button" style="border-radius: 1rem; background-color: #FFC107; color: white; border: none; font-weight: bold; padding: 8px 16px; transition: transform 0.3s ease;">Назад</button>
    `;
  }

  render(e) {
    const i = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", i);
    this.addListeners(e);
  }
}

class Header {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML() {
    return `
      <div class="bg-white py-2">
        <div class="container">
          <div class="d-flex justify-content-between align-items-center">
            <h1 style="font-size: 1.5rem; font-weight: bold; color: #212529; margin-left: -5px; margin-bottom: 0;">Яндекс Крауд</h1>
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
            <div class="position-relative ms-3">
              <button id="cart-button" class="btn btn-light" style="background-color: #FFC107; color: white;">
                Корзина <span id="cart-count" class="badge bg-light text-dark" style="background-color: #FFC107; color: white; display: none;">0</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>
        .nav-link:hover {
          text-decoration: underline;
          color: #FFC107;
        }
      </style>
    `;
  }

  render() {
    const e = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", e);
    updateCartCount();
  }
}

class AddPage {
  constructor(parent) {
    this.parent = parent;
  }

  get pageRoot() {
    return document.getElementById("add-page");
  }

  getHTML() {
    return `
      <div id="header"></div>
      <div id="add-page" class="container mt-3">
        <h2 class="mb-4">Добавить</h2>
        <form id="stockForm">
          <div class="mb-3">
            <label for="src" class="form-label">URL изображения</label>
            <input type="text" class="form-control" id="src" required>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">Имя персонажа</label>
            <input type="text" class="form-control" id="title" required>
          </div>
          <div class="mb-3">
            <label for="text" class="form-label">Краткое описание</label>
            <textarea class="form-control" id="text" required></textarea>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Подробное описание</label>
            <textarea class="form-control" id="description" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="background-color: #FFC107; border-color: #FFC107;">Сохранить</button>
        </form>
      </div>
    `;
  }

  clickBack() {
    new MainPage(this.parent).render();
  }

  addListeners() {
    const stockForm = document.getElementById('stockForm');
    if (stockForm) {
      stockForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const body = {
          src: document.getElementById('src').value,
          title: document.getElementById('title').value,
          text: document.getElementById('text').value,
          description: document.getElementById('description').value,
        };
        try {
          const response = await httpService.post(apiService.getStocks(), body);
          new MainPage(this.parent).render();
        } catch (error) {
          console.error('Ошибка сохранения:', error);
          alert(`Ошибка сохранения данных: ${error.message}`);
        }
      });
    } else {
      console.warn('Stock form not found');
    }
  }

  render() {
    this.parent.innerHTML = "";
    const e = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", e);
    new Header(document.getElementById("header")).render();
    new BackButton(this.pageRoot).render(this.clickBack.bind(this));
    this.addListeners();
  }
}

class EditPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = parseInt(id);
  }

  get pageRoot() {
    return document.getElementById("edit-page");
  }

  getHTML(data) {
    return `
      <div id="header"></div>
      <div id="edit-page" class="container mt-3">
        <h2 class="mb-4">Редактировать персонажа</h2>
        <form id="stockForm">
          <input type="hidden" id="stockId" value="${data.id}">
          <div class="mb-3">
            <label for="src" class="form-label">URL изображения</label>
            <input type="text" class="form-control" id="src" value="${data.src || ''}" required>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">Имя персонажа</label>
            <input type="text" class="form-control" id="title" value="${data.title || ''}" required>
          </div>
          <div class="mb-3">
            <label for="text" class="form-label">Краткое описание</label>
            <textarea class="form-control" id="text" required>${data.text || ''}</textarea>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Подробное описание</label>
            <textarea class="form-control" id="description" required>${data.description || ''}</textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="background-color: #FFC107; border-color: #FFC107;">Сохранить</button>
        </form>
      </div>
    `;
  }

  async getData() {
    try {
      const data = await httpService.get(apiService.getStockById(this.id));
      return {
        ...data,
        description: data.description || 'Подробного описания пока нет.',
      };
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      return {
        id: this.id,
        src: '',
        title: 'Не найдено',
        text: 'Данные недоступны',
        description: 'Подробного описания пока нет.',
      };
    }
  }

  clickBack() {
    new ProductPage(this.parent, this.id).render();
  }

  addListeners() {
    const stockForm = document.getElementById('stockForm');
    if (stockForm) {
      stockForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const body = {
          src: document.getElementById('src').value,
          title: document.getElementById('title').value,
          text: document.getElementById('text').value,
          description: document.getElementById('description').value,
        };
        try {
          await httpService.patch(apiService.updateStockById(this.id), body);
          new ProductPage(this.parent, this.id).render();
        } catch (error) {
          console.error('Ошибка обновления:', error);
          alert(`Ошибка обновления данных: ${error.message}`);
        }
      });
    } else {
      console.warn('Stock form not found');
    }
  }

  async render() {
    this.parent.innerHTML = "";
    const data = await this.getData();
    const e = this.getHTML(data);
    this.parent.insertAdjacentHTML("beforeend", e);
    new Header(document.getElementById("header")).render();
    new BackButton(this.pageRoot).render(this.clickBack.bind(this));
    this.addListeners();
  }
}

class ProductPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = parseInt(id);
  }

  get pageRoot() {
    return document.getElementById("product-page");
  }

  getHTML() {
    return `
      <div id="header"></div>
      <div id="product-page" class="container mt-3">
        <div id="detail-card"></div>
        <button id="edit-button" class="btn mt-3" style="background-color: #FFC107; color: white; border: none; border-radius: 1rem; font-weight: bold;">Редактировать</button>
      </div>
    `;
  }

  async getData() {
    try {
      const data = await httpService.get(apiService.getStockById(this.id));
      return {
        ...data,
        description: data.description || 'Подробного описания пока нет.',
      };
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      return {
        id: this.id,
        src: '',
        title: 'Не найдено',
        text: 'Данные недоступны',
        description: 'Подробного описания пока нет.',
      };
    }
  }

  clickBack() {
    new MainPage(this.parent).render();
  }

  clickEdit() {
    new EditPage(this.parent, this.id).render();
  }

  async render() {
    this.parent.innerHTML = "";
    const e = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", e);
    new Header(document.getElementById("header")).render();
    new BackButton(this.pageRoot).render(this.clickBack.bind(this));
    const t = await this.getData();
    new DetailCard(document.getElementById('detail-card')).render(t);
    const editButton = document.getElementById('edit-button');
    if (editButton) {
      editButton.addEventListener('click', this.clickEdit.bind(this));
    }
  }
}

class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.query = "";
    this.limit = 20;
  }

  get pageRoot() {
    return document.getElementById("main-page");
  }

  getHTML() {
    return `
      <div id="header"></div>
      <div class="container mt-3">
        <div style=" margarine-bottom: 1rem; display: flex; gap: 1rem;">
          <input 
            id="search-input" 
            type="text" 
            placeholder="Поиск по имени..." 
            style="
              padding: 0.5rem 1rem;
              flex: 1;
              border: 1px solid #444;
              border-radius: 8px;
              outline: none;
              font-size: 1rem;
              background-color: #f8f9fa;
              color: #212529;
            "
            onfocus="this.style.borderColor='#FFC107';"
            onblur="this.style.borderColor='#444';"
          />
          <input 
            id="limit-input" 
            type="number" 
            min="1" 
            value="${this.limit}" 
            style="
              width: 80px;
              padding: 0.5rem;
              border: 1px solid #444;
              border-radius: 8px;
              outline: none;
              font-size: 1rem;
              text-align: center;
              background-color: #f8f9fa;
              color: #212529;
            "
          />
        </div>
        <button class="btn mb-3" id="add-button" style="background-color: #FFC107; color: white; border: none; border-radius: 1rem; font-weight: bold;">Добавить</button>
      </div>
      <div id="main-page" class="card-container"></div>
      <style>
        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 20px;
          padding: 15px;
        }
        .card-container .card {
          width: 100%;
        }
        @media (max-width: 768px) {
          .card-container {
            grid-template-columns: 1fr;
          }
        }
      </style>
    `;
  }

  async getData() {
    let t = apiService.getStocks();
    this.query.trim() && (t += `?title=${encodeURIComponent(this.query.trim())}`);
    try {
      const e = await httpService.get(t);
      const r = e ? e.slice(0, this.limit) : [];
      this.renderData(r);
    } catch (e) {
      console.error("Ошибка при получении данных:", e);
    }
  }

  renderData(t) {
    this.pageRoot.innerHTML = "";
    t.forEach(e => {
      new Card(this.pageRoot).render(e, this.clickCard.bind(this));
    });
  }

  clickCard(e) {
    const id = parseInt(e.target.dataset.id);
    if (isNaN(id)) {
      console.error('Invalid ID for navigation:', e.target.dataset.id);
      return;
    }
    new ProductPage(this.parent, id).render();
  }

  addListeners() {
    const addButton = document.getElementById('add-button');
    if (addButton) {
      addButton.addEventListener('click', () => {
        new AddPage(this.parent).render();
      });
    } else {
      console.warn('Add button not found');
    }
    const searchInput = document.getElementById("search-input");
    const limitInput = document.getElementById("limit-input");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        this.query = searchInput.value;
        this.getData();
      });
    }
    if (limitInput) {
      limitInput.addEventListener("input", () => {
        const r = parseInt(limitInput.value, 10);
        this.limit = isNaN(r) || r < 1 ? 1 : r;
        this.getData();
      });
    }
  }

  async render() {
    this.parent.innerHTML = "";
    const e = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", e);
    new Header(document.getElementById("header")).render();
    this.addListeners();
    await this.getData();
  }
}

// Инициализация приложения
const root = document.getElementById("root");
const mainPage = new MainPage(root);
mainPage.render();
