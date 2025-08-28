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

class Card {
  constructor(parent) {
    this.parent = parent;
  }

  textStyles = {
    fontSizeTitle: "1.2rem",
    fontSizeText: "1.6rem",
    fontSizePrice: "1.4rem",
    fontWeightTitle: "normal",
    fontWeightText: "bold",
    fontWeightPrice: "bold",
    color: "white",
    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.4)",
    textAlign: "left",
    marginBottomTitle: "0.5rem",
    marginBottomText: "0.5rem",
    padding: "10px",
    lineHeight: "1"
  };

  getHTML(e, isSelected) {
    return `
      <div class="card m-2 card-hover ${isSelected ? 'border' : ''}" style="width: 330px; position: relative; border-radius: 2rem; overflow: hidden; background: #f8f9fa; ${isSelected ? 'border: 2px solid #00838f;' : ''}">
        <div style="position: relative; width: 100%; height: 550px; overflow: hidden; border-radius: 0.5rem;">
          ${e.model ? `<div id="model-${e.id}" style="width: 100%; height: 100%;"></div>` : `<img class="card-img-top card-image" src="${e.src}" alt="${e.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.5rem; transition: transform 0.5s ease;">`}
          <div style="position: absolute; top: 12px; left: 10px; right: 10px; padding: ${this.textStyles.padding}; color: ${this.textStyles.color}; text-shadow: ${this.textStyles.textShadow}; text-align: ${this.textStyles.textAlign}; line-height: ${this.textStyles.lineHeight};">
            <h5 class="card-title mb-${this.textStyles.marginBottomTitle.replace("rem","")}" style="font-size: ${this.textStyles.fontSizeTitle}; font-weight: ${this.textStyles.fontWeightTitle};">${e.title}</h5>
            <p class="card-text mb-${this.textStyles.marginBottomText.replace("rem","")}" style="font-size: ${this.textStyles.fontSizeText}; font-weight: ${this.textStyles.fontWeightText}; line-height: ${this.textStyles.lineHeight};">${e.text}</p>
            <p class="card-price" style="font-size: ${this.textStyles.fontSizePrice}; font-weight: ${this.textStyles.fontWeightPrice}; color: #00bcd4;">${e.price ? e.price + ' ₽' : 'Цена не указана'}</p>
          </div>
          <div style="position: absolute; bottom: 20px; left: 95px; right: 95px;">
            <button class="btn w-100 select-button" id="select-card-${e.id}" data-id="${e.id}" style="border-radius: 1rem; background-color: ${isSelected ? '#00838f' : '#00bcd4'}; color: white; border: none; font-weight: bold; padding: 8px 16px; transition: transform 0.3s ease;">${isSelected ? 'Добавлено' : 'Выбрать'}</button>
            <div id="quantity-div-${e.id}" style="display: none; text-align: center;">
              <input type="number" id="quantity-input-${e.id}" min="1" value="1" style="width: 60px; margin-right: 5px;">
              <button class="btn btn-sm" id="add-to-cart-${e.id}" style="border-radius: 1rem; background-color: #00bcd4; color: white; border: none;">Добавить в корзину</button>
            </div>
            <button class="btn w-100 mt-2" id="click-card-${e.id}" data-id="${e.id}" style="border-radius: 1rem; background-color: #00bcd4; color: white; border: none; font-weight: bold; padding: 8px 16px; transition: transform 0.3s ease;">Подробнее</button>
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

  render3D(e, i) {
    const o = document.getElementById(e);
    if (!o) return;
    const t = new THREE.Scene();
    const r = new THREE.PerspectiveCamera(45, o.clientWidth / o.clientHeight, 0.1, 1000);
    r.position.z = 5;
    const n = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    n.setSize(o.clientWidth, o.clientHeight);
    o.appendChild(n.domElement);
    const d = new THREE.DirectionalLight(0xffffff, 1);
    d.position.set(0, 5, 5).normalize();
    t.add(d);
    new THREE.GLTFLoader().load(i, h => {
      const s = h.scene;
      s.scale.set(2, 2, 2);
      t.add(s);
      function c() {
        requestAnimationFrame(c);
        s.rotation.y += 0.01;
        n.render(t, r);
      }
      c();
    }, undefined, err => console.error('GLTFLoader error:', err));
  }

  render(e, detailCallback) {
    const o = this.getHTML(e, cart.some(item => item.id === e.id)); // isSelected зависит от наличия в корзине
    this.parent.insertAdjacentHTML("beforeend", o);
    this.addListeners(e, detailCallback);
    if (e.model) this.render3D(`model-${e.id}`, e.model);
  }
}

class DetailCard {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML(e) {
    return `
      <div class="card mb-4 shadow-sm card-hover" 
           style="max-width: 2000px; margin: 0 auto; border-radius: 1.5rem; overflow: hidden; background: #ffffff;">
        <div class="row g-0">
          <div class="col-md-4 d-flex align-items-center justify-content-center p-3" 
               style="background: linear-gradient(135deg, #faf8f8ff, #e9ecef);">
            <img src="${e.src || ''}" class="img-fluid rounded-3" 
                 alt="${e.title || 'Без названия'}" 
                 style="max-height: 250px; object-fit: contain;">
          </div>
          <div class="col-md-8">
            <div class="card-body" style="padding: 1.5rem;">
              <h4 class="card-title mb-2" 
                  style="font-size: 1.5rem; font-weight: 700; color: #212529;">
                ${e.title || 'Без названия'}
              </h4>
              <p class="card-price mb-3" style="font-size: 1.2rem; font-weight: bold; color: #00bcd4;">
                ${e.price ? e.price + ' ₽' : 'Цена не указана'}
              </p>
              <p class="card-text mb-4" style="color: #495057; font-size: 1rem; line-height: 1.5;">
                ${e.text || 'Описание отсутствует'}
              </p>
              <div class="accordion" id="accordion-${e.id}">
                <div class="accordion-item" style="border: none;">
                  <h2 class="accordion-header" id="headingOne-${e.id}">
                    <button class="accordion-button" type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseOne-${e.id}" 
                            aria-expanded="true" aria-controls="collapseOne-${e.id}"
                            style="background-color: #00bcd4; color: #fff; font-weight: bold;">
                      О бренде
                    </button>
                  </h2>
                  <div id="collapseOne-${e.id}" 
                       class="accordion-collapse collapse show" 
                       aria-labelledby="headingOne-${e.id}" 
                       data-bs-parent="#accordion-${e.id}">
                    <div class="accordion-body" style="font-size: 0.95rem; color: #343a40; border-left: 3px solid #00bcd4;">
                      ${e.brand || 'Информация о бренде отсутствует'}
                    </div>
                  </div>
                </div>
                <div class="accordion-item" style="border: none;">
                  <h2 class="accordion-header" id="headingTwo-${e.id}">
                    <button class="accordion-button collapsed" type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseTwo-${e.id}" 
                            aria-expanded="false" aria-controls="collapseTwo-${e.id}"
                            style="background-color: #00bcd4; color: #fff; font-weight: bold;">
                      Состав
                    </button>
                  </h2>
                  <div id="collapseTwo-${e.id}" 
                       class="accordion-collapse collapse" 
                       aria-labelledby="headingTwo-${e.id}" 
                       data-bs-parent="#accordion-${e.id}">
                    <div class="accordion-body" style="font-size: 0.95rem; color: #343a40; border-left: 3px solid #00bcd4;">
                      ${e.composition || 'Состав не указан'}
                    </div>
                  </div>
                </div>
                <div class="accordion-item" style="border: none;">
                  <h2 class="accordion-header" id="headingThree-${e.id}">
                    <button class="accordion-button collapsed" type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseThree-${e.id}" 
                            aria-expanded="false" aria-controls="collapseThree-${e.id}"
                            style="background-color: #00bcd4; color: #fff; font-weight: bold;">
                      Применение
                    </button>
                  </h2>
                  <div id="collapseThree-${e.id}" 
                       class="accordion-collapse collapse" 
                       aria-labelledby="headingThree-${e.id}" 
                       data-bs-parent="#accordion-${e.id}">
                    <div class="accordion-body" style="font-size: 0.95rem; color: #343a40; border-left: 3px solid #00bcd4;">
                      ${e.application || 'Инструкция по применению не указана'}
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
          background-color: #00838f;
          color: #fff;
        }
        .accordion-button:focus {
          border-color: #00bcd4;
          box-shadow: 0 0 0 0.25rem rgba(0, 188, 212, 0.5);
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
      <button id="back-button" class="btn btn mb-3" type="button" style="border-radius: 1rem; background-color: #00bcd4; color: white; border: none; font-weight: bold; padding: 8px 16px; transition: transform 0.3s ease;">Назад</button>
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
            <img src="https://i.pinimg.com/736x/d7/39/48/d7394825291fd4e13402f35b9cfc7858.jpg" alt="Logo" style="height: 60px; width: auto; margin-left: -5px;">
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
              <button id="cart-button" class="btn btn-light" style="background-color: #00bcd4; color: white;">
                Корзина <span id="cart-count" class="badge bg-light text-dark" style="background-color: #00838f; color: white; display: none;">0</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>
        .nav-link:hover {
          text-decoration: underline;
          color: #00838f;
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
        <h2 class="mb-4">Добавить новый продукт</h2>
        <form id="stockForm">
          <div class="mb-3">
            <label for="src" class="form-label">URL изображения</label>
            <input type="text" class="form-control" id="src" required>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">Название продукта</label>
            <input type="text" class="form-control" id="title" required>
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Цена (₽)</label>
            <input type="number" class="form-control" id="price" min="0" step="1" required>
          </div>
          <div class="mb-3">
            <label for="text" class="form-label">Краткое описание</label>
            <textarea class="form-control" id="text" required></textarea>
          </div>
          <div class="mb-3">
            <label for="brand" class="form-label">О бренде</label>
            <textarea class="form-control" id="brand" required></textarea>
          </div>
          <div class="mb-3">
            <label for="composition" class="form-label">Состав</label>
            <textarea class="form-control" id="composition" required></textarea>
          </div>
          <div class="mb-3">
            <label for="application" class="form-label">Применение</label>
            <textarea class="form-control" id="application" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="background-color: #00bcd4; border-color: #00bcd4;">Сохранить</button>
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
        console.log('Add form submitted');
        const body = {
          src: document.getElementById('src').value,
          title: document.getElementById('title').value,
          price: parseInt(document.getElementById('price').value),
          text: document.getElementById('text').value,
          brand: document.getElementById('brand').value,
          composition: document.getElementById('composition').value,
          application: document.getElementById('application').value
        };
        console.log('Sending POST request:', { url: 'http://localhost:3000/stocks', body });
        try {
          const response = await fetch('http://localhost:3000/stocks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to save: ${response.status} ${response.statusText} - ${errorText}`);
          }
          console.log('Data saved successfully');
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
        <h2 class="mb-4">Редактировать продукт</h2>
        <form id="stockForm">
          <input type="hidden" id="stockId" value="${data.id}">
          <div class="mb-3">
            <label for="src" class="form-label">URL изображения</label>
            <input type="text" class="form-control" id="src" value="${data.src || ''}" required>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">Название продукта</label>
            <input type="text" class="form-control" id="title" value="${data.title || ''}" required>
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Цена (₽)</label>
            <input type="number" class="form-control" id="price" value="${data.price || ''}" min="0" step="1" required>
          </div>
          <div class="mb-3">
            <label for="text" class="form-label">Краткое описание</label>
            <textarea class="form-control" id="text" required>${data.text || ''}</textarea>
          </div>
          <div class="mb-3">
            <label for="brand" class="form-label">О бренде</label>
            <textarea class="form-control" id="brand" required>${data.brand || ''}</textarea>
          </div>
          <div class="mb-3">
            <label for="composition" class="form-label">Состав</label>
            <textarea class="form-control" id="composition" required>${data.composition || ''}</textarea>
          </div>
          <div class="mb-3">
            <label for="application" class="form-label">Применение</label>
            <textarea class="form-control" id="application" required>${data.application || ''}</textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="background-color: #00bcd4; border-color: #00bcd4;">Сохранить</button>
        </form>
      </div>
    `;
  }

  async getData() {
    try {
      console.log('Fetching data for ID:', this.id, 'Type:', typeof this.id);
      const response = await fetch(`http://localhost:3000/stocks/${this.id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch data for ID ${this.id}: ${response.status} ${response.statusText} - ${errorText}`);
      }
      const data = await response.json();
      console.log('Fetched stock data for ID:', this.id, data);
      return {
        ...data,
        price: data.price || 0,
        brand: data.brand || 'Информация о бренде отсутствует',
        composition: data.composition || 'Состав не указан',
        application: data.application || 'Инструкция по применению не указана'
      };
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      return {
        id: this.id,
        src: '',
        title: 'Не найдено',
        text: 'Данные недоступны',
        price: 0,
        brand: 'Информация о бренде отсутствует',
        composition: 'Состав не указан',
        application: 'Инструкция по применению не указана'
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
        console.log('Edit form submitted');
        const body = {
          src: document.getElementById('src').value,
          title: document.getElementById('title').value,
          price: parseInt(document.getElementById('price').value),
          text: document.getElementById('text').value,
          brand: document.getElementById('brand').value,
          composition: document.getElementById('composition').value,
          application: document.getElementById('application').value
        };
        console.log('Sending PATCH request:', { url: `http://localhost:3000/stocks/${this.id}`, body });
        try {
          const response = await fetch(`http://localhost:3000/stocks/${this.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update: ${response.status} ${response.statusText} - ${errorText}`);
          }
          console.log('Data updated successfully');
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
        <button id="edit-button" class="btn mt-3" style="background-color: #00bcd4; color: white; border: none; border-radius: 1rem; font-weight: bold;">Редактировать</button>
      </div>
    `;
  }

  async getData() {
    try {
      console.log('Fetching data for ID:', this.id, 'Type:', typeof this.id);
      const response = await fetch(`http://localhost:3000/stocks/${this.id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch data for ID ${this.id}: ${response.status} ${response.statusText} - ${errorText}`);
      }
      const data = await response.json();
      console.log('Fetched stock data for ID:', this.id, data);
      return {
        ...data,
        price: data.price || 0,
        brand: data.brand || 'Информация о бренде отсутствует',
        composition: data.composition || 'Состав не указан',
        application: data.application || 'Инструкция по применению не указана'
      };
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      return {
        id: this.id,
        src: '',
        title: 'Не найдено',
        text: 'Данные недоступны',
        price: 0,
        brand: 'Информация о бренде отсутствует',
        composition: 'Состав не указан',
        application: 'Инструкция по применению не указана'
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
  }

  get pageRoot() {
    return document.getElementById("main-page");
  }

  getHTML() {
    return `
      <div id="header"></div>
      <div class="container mt-3">
        <button class="btn mb-3" id="add-button" style="background-color: #00bcd4; color: white; border: none; border-radius: 1rem; font-weight: bold;">Добавить продукт</button>
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
    try {
      const response = await fetch('http://localhost:3000/stocks');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch stocks: ${response.status} ${response.statusText} - ${errorText}`);
      }
      const data = await response.json();
      console.log('Fetched stocks:', data);
      return data.map(item => ({
        ...item,
        price: item.price || 0,
        brand: item.brand || 'Информация о бренде отсутствует',
        composition: item.composition || 'Состав не указан',
        application: item.application || 'Инструкция по применению не указана'
      }));
    } catch (error) {
      console.error('Ошибка загрузки списка:', error);
      return [];
    }
  }

  clickCard(e) {
    const id = parseInt(e.target.dataset.id);
    console.log('Navigating to product page with ID:', id, 'Type:', typeof id);
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
        console.log('Add button clicked');
        new AddPage(this.parent).render();
      });
    } else {
      console.warn('Add button not found');
    }
  }

  async render() {
    this.parent.innerHTML = "";
    const e = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", e);
    new Header(document.getElementById("header")).render();
    this.addListeners();
    const data = await this.getData();
    data.forEach(t => {
      new Card(this.pageRoot).render(t, this.clickCard.bind(this));
    });
    setTimeout(() => {
      const grid = document.querySelector('.card-container');
      if (grid) {
        new Masonry(grid, {
          itemSelector: '.card',
          columnWidth: 330,
          gutter: 20,
          horizontalOrder: true,
          percentPosition: true
        });
      } else {
        console.warn('Card container not found for Masonry');
      }
    }, 300);
  }
}

// Инициализация приложения
const u = document.getElementById("root");
const v = new MainPage(u);
v.render();
