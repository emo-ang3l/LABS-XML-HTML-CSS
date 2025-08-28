class Card {
  constructor(parent) {
    this.parent = parent;
  }

  textStyles = {
    fontSizeTitle: "1.2rem",
    fontSizeText: "1.6rem",
    fontWeightTitle: "normal",
    fontWeightText: "bold",
    color: "white",
    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.4)",
    textAlign: "left",
    marginBottomTitle: "0.5rem",
    padding: "10px",
    lineHeight: "1"
  };

  getHTML(e, isSelected) {
    return `
      <div class="card m-2 card-hover ${isSelected ? 'border' : ''}" style="width: 330px; position: relative; border-radius: 2rem; overflow: hidden; background: #f8f9fa; ${isSelected ? 'border: 2px solid #7e0606;' : ''}">
        <div style="position: relative; width: 100%; height: 550px; overflow: hidden; border-radius: 0.5rem;">
          ${e.model ? `<div id="model-${e.id}" style="width: 100%; height: 100%;"></div>` : `<img class="card-img-top card-image" src="${e.src}" alt="${e.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.5rem; transition: transform 0.5s ease;">`}
          <div style="position: absolute; top: 12px; left: 10px; right: 10px; padding: ${this.textStyles.padding}; color: ${this.textStyles.color}; text-shadow: ${this.textStyles.textShadow}; text-align: ${this.textStyles.textAlign}; line-height: ${this.textStyles.lineHeight};">
            <h5 class="card-title mb-${this.textStyles.marginBottomTitle.replace("rem","")}" style="font-size: ${this.textStyles.fontSizeTitle}; font-weight: ${this.textStyles.fontWeightTitle};">${e.title}</h5>
            <p class="card-text" style="font-size: ${this.textStyles.fontSizeText}; font-weight: ${this.textStyles.fontWeightText}; line-height: ${this.textStyles.lineHeight};">${e.text}</p>
          </div>
          <div style="position: absolute; bottom: 20px; left: 95px; right: 95px;">
            <button class="btn w-100 select-button" id="select-card-${e.id}" data-id="${e.id}" style="border-radius: 1rem; background-color: ${isSelected ? '#7e0606' : '#ad0909ff'}; color: white; border: none; font-weight: bold; padding: 8px 16px; transition: transform 0.3s ease;">${isSelected ? 'Выбрано' : 'Выбрать'}</button>
            <button class="btn w-100 mt-2" id="click-card-${e.id}" data-id="${e.id}" style="border-radius: 1rem; background-color: #ad0909ff; color: white; border: none; font-weight: bold; padding: 8px 16px; transition: transform 0.3s ease;">Подробнее</button>
          </div>
        </div>
      </div>
      <style>
        .btn:hover { transform: scale(1.05); }
        .card-hover:hover .card-image { transform: scale(1.1); }
      </style>
    `;
  }

  addListeners(e, selectCallback, detailCallback) {
    const selectButton = document.getElementById(`select-card-${e.id}`);
    if (selectButton) {
      selectButton.addEventListener("click", selectCallback);
    } else {
      console.warn(`Select button select-card-${e.id} not found`);
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

  render(e, selectCallback, detailCallback, isSelected) {
    const o = this.getHTML(e, isSelected);
    this.parent.insertAdjacentHTML("beforeend", o);
    this.addListeners(e, selectCallback, detailCallback);
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
              <h4 class="card-title mb-3" 
                  style="font-size: 1.5rem; font-weight: 700; color: #212529;">
                ${e.title || 'Без названия'}
              </h4>
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
                            style="background-color: #ad0909; color: #fff; font-weight: bold;">
                      История
                    </button>
                  </h2>
                  <div id="collapseOne-${e.id}" 
                       class="accordion-collapse collapse show" 
                       aria-labelledby="headingOne-${e.id}" 
                       data-bs-parent="#accordion-${e.id}">
                    <div class="accordion-body" style="font-size: 0.95rem; color: #343a40; border-left: 3px solid #ad0909;">
                      ${e.history || 'История не указана'}
                    </div>
                  </div>
                </div>
                <div class="accordion-item" style="border: none;">
                  <h2 class="accordion-header" id="headingTwo-${e.id}">
                    <button class="accordion-button collapsed" type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseTwo-${e.id}" 
                            aria-expanded="false" aria-controls="collapseTwo-${e.id}"
                            style="background-color: #ad0909; color: #fff; font-weight: bold;">
                      Характеристики
                    </button>
                  </h2>
                  <div id="collapseTwo-${e.id}" 
                       class="accordion-collapse collapse" 
                       aria-labelledby="headingTwo-${e.id}" 
                       data-bs-parent="#accordion-${e.id}">
                    <div class="accordion-body" style="font-size: 0.95rem; color: #343a40; border-left: 3px solid #ad0909;">
                      ${e.traits || 'Характеристики не указаны'}
                    </div>
                  </div>
                </div>
                <div class="accordion-item" style="border: none;">
                  <h2 class="accordion-header" id="headingThree-${e.id}">
                    <button class="accordion-button collapsed" type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseThree-${e.id}" 
                            aria-expanded="false" aria-controls="collapseThree-${e.id}"
                            style="background-color: #ad0909; color: #fff; font-weight: bold;">
                      Уход
                    </button>
                  </h2>
                  <div id="collapseThree-${e.id}" 
                       class="accordion-collapse collapse" 
                       aria-labelledby="headingThree-${e.id}" 
                       data-bs-parent="#accordion-${e.id}">
                    <div class="accordion-body" style="font-size: 0.95rem; color: #343a40; border-left: 3px solid #ad0909;">
                      ${e.care || 'Уход не указан'}
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
          background-color: #7e0606;
          color: #fff;
        }
        .accordion-button:focus {
          border-color: #ad0909;
          box-shadow: 0 0 0 0.25rem rgba(173, 9, 9, 0.5);
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
      <button id="back-button" class="btn btn mb-3" type="button" style="border-radius: 1rem; background-color: #ad0909ff; color: white; border: none; font-weight: bold; padding: 8px 16px; transition: transform 0.3s ease;">Назад</button>
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
            <img src="https://i.pinimg.com/1200x/61/b4/2e/61b42efb740b83b33ebc9fabc7ee0e19.jpg" alt="Logo" style="height: 60px; width: auto; margin-left: -5px;">
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
    `;
  }

  render() {
    const e = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", e);
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
        <h2 class="mb-4">Добавить новую породу</h2>
        <form id="stockForm">
          <div class="mb-3">
            <label for="src" class="form-label">URL изображения</label>
            <input type="text" class="form-control" id="src" required>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">Название</label>
            <input type="text" class="form-control" id="title" required>
          </div>
          <div class="mb-3">
            <label for="text" class="form-label">Описание</label>
            <textarea class="form-control" id="text" required></textarea>
          </div>
          <div class="mb-3">
            <label for="history" class="form-label">История</label>
            <textarea class="form-control" id="history" required></textarea>
          </div>
          <div class="mb-3">
            <label for="traits" class="form-label">Характеристики</label>
            <textarea class="form-control" id="traits" required></textarea>
          </div>
          <div class="mb-3">
            <label for="care" class="form-label">Уход</label>
            <textarea class="form-control" id="care" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="background-color: #ad0909; border-color: #ad0909;">Сохранить</button>
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
          text: document.getElementById('text').value,
          history: document.getElementById('history').value,
          traits: document.getElementById('traits').value,
          care: document.getElementById('care').value
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
        <h2 class="mb-4">Редактировать породу</h2>
        <form id="stockForm">
          <input type="hidden" id="stockId" value="${data.id}">
          <div class="mb-3">
            <label for="src" class="form-label">URL изображения</label>
            <input type="text" class="form-control" id="src" value="${data.src || ''}" required>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">Название</label>
            <input type="text" class="form-control" id="title" value="${data.title || ''}" required>
          </div>
          <div class="mb-3">
            <label for="text" class="form-label">Описание</label>
            <textarea class="form-control" id="text" required>${data.text || ''}</textarea>
          </div>
          <div class="mb-3">
            <label for="history" class="form-label">История</label>
            <textarea class="form-control" id="history" required>${data.history || ''}</textarea>
          </div>
          <div class="mb-3">
            <label for="traits" class="form-label">Характеристики</label>
            <textarea class="form-control" id="traits" required>${data.traits || ''}</textarea>
          </div>
          <div class="mb-3">
            <label for="care" class="form-label">Уход</label>
            <textarea class="form-control" id="care" required>${data.care || ''}</textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="background-color: #ad0909; border-color: #ad0909;">Сохранить</button>
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
        history: data.history || 'История не указана',
        traits: data.traits || 'Характеристики не указаны',
        care: data.care || 'Уход не указан'
      };
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      return {
        id: this.id,
        src: '',
        title: 'Не найдено',
        text: 'Данные недоступны',
        history: 'История не указана',
        traits: 'Характеристики не указаны',
        care: 'Уход не указан'
      };
    }
  }

  clickBack() {
    new MainPage(this.parent).render();
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
          text: document.getElementById('text').value,
          history: document.getElementById('history').value,
          traits: document.getElementById('traits').value,
          care: document.getElementById('care').value
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
          new MainPage(this.parent).render();
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
      <div id="product-page" class="container mt-3"></div>
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
        history: data.history || 'История не указана',
        traits: data.traits || 'Характеристики не указаны',
        care: data.care || 'Уход не указан'
      };
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      return {
        id: this.id,
        src: '',
        title: 'Не найдено',
        text: 'Данные недоступны',
        history: 'История не указана',
        traits: 'Характеристики не указаны',
        care: 'Уход не указан'
      };
    }
  }

  clickBack() {
    new MainPage(this.parent).render();
  }

  async render() {
    this.parent.innerHTML = "";
    const e = this.getHTML();
    this.parent.insertAdjacentHTML("beforeend", e);
    new Header(document.getElementById("header")).render();
    new BackButton(this.pageRoot).render(this.clickBack.bind(this));
    const t = await this.getData();
    new DetailCard(this.pageRoot).render(t);
  }
}

class MainPage {
  constructor(parent) {
    this.parent = parent;
    this.selectedCardId = null;
  }

  get pageRoot() {
    return document.getElementById("main-page");
  }

  getHTML() {
    return `
      <div id="header"></div>
      <div class="container mt-3">
        <button class="btn btn-danger mb-3" id="add-button">Добавить породу</button>
        ${this.selectedCardId !== null ? '<button class="btn btn-primary mb-3 ms-2" id="edit-button" style="background-color: #ad0909; border-color: #ad0909;">Редактировать</button>' : ''}
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
        history: item.history || 'История не указана',
        traits: item.traits || 'Характеристики не указаны',
        care: item.care || 'Уход не указан'
      }));
    } catch (error) {
      console.error('Ошибка загрузки списка:', error);
      return [];
    }
  }

  selectCard(e) {
    const id = parseInt(e.target.dataset.id);
    console.log('Selected card ID:', id, 'Type:', typeof id);
    if (isNaN(id)) {
      console.error('Invalid ID for selection:', e.target.dataset.id);
      return;
    }
    this.selectedCardId = id;
    this.render();
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

  clickEdit() {
    if (this.selectedCardId === null) {
      console.warn('No card selected for editing');
      return;
    }
    console.log('Navigating to edit page with ID:', this.selectedCardId);
    new EditPage(this.parent, this.selectedCardId).render();
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
    const editButton = document.getElementById('edit-button');
    if (editButton) {
      editButton.addEventListener('click', this.clickEdit.bind(this));
    } else if (this.selectedCardId !== null) {
      console.warn('Edit button not found');
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
      new Card(this.pageRoot).render(t, this.selectCard.bind(this), this.clickCard.bind(this), t.id === this.selectedCardId);
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