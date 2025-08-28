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

  getHTML(e) {
    return `
      <div class="card m-2 card-hover" style="width: 330px; position: relative; border-radius: 2rem; overflow: hidden; background: #f8f9fa;">
        <div style="position: relative; width: 100%; height: 550px; overflow: hidden; border-radius: 0.5rem;">
          ${e.model ? `<div id="model-${e.id}" style="width: 100%; height: 100%;"></div>` : `<img class="card-img-top card-image" src="${e.src}" alt="${e.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.5rem; transition: transform 0.5s ease;">`}
          <div style="position: absolute; top: 12px; left: 10px; right: 10px; padding: ${this.textStyles.padding}; color: ${this.textStyles.color}; text-shadow: ${this.textStyles.textShadow}; text-align: ${this.textStyles.textAlign}; line-height: ${this.textStyles.lineHeight};">
            <h5 class="card-title mb-${this.textStyles.marginBottomTitle.replace("rem","")}" style="font-size: ${this.textStyles.fontSizeTitle}; font-weight: ${this.textStyles.fontWeightTitle};">${e.title}</h5>
            <p class="card-text" style="font-size: ${this.textStyles.fontSizeText}; font-weight: ${this.textStyles.fontWeightText}; line-height: ${this.textStyles.lineHeight};">${e.text}</p>
          </div>
          <div style="position: absolute; bottom: 20px; left: 95px; right: 95px;">
            <button class="btn w-100" id="click-card-${e.id}" data-id="${e.id}" style="border-radius: 1rem; background-color: #ad0909ff; color: white; border: none; font-weight: bold; padding: 8px 16px; transition: transform 0.3s ease;">Подробнее</button>
          </div>
        </div>
      </div>
      <style>
        .btn:hover { transform: scale(1.05); }
        .card-hover:hover .card-image { transform: scale(1.1); }
      </style>
    `;
  }

  addListeners(e, i) {
    const button = document.getElementById(`click-card-${e.id}`);
    if (button) {
      button.addEventListener("click", i);
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

  render(e, i) {
    const o = this.getHTML(e);
    this.parent.insertAdjacentHTML("beforeend", o);
    this.addListeners(e, i);
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
                            aria-expanded="true" aria-controls="collapseOne-${e.id}">
                      История
                    </button>
                  </h2>
                  <div id="collapseOne-${e.id}" 
                       class="accordion-collapse collapse show" 
                       aria-labelledby="headingOne-${e.id}" 
                       data-bs-parent="#accordion-${e.id}">
                    <div class="accordion-body" style="font-size: 0.95rem; color: #343a40;">
                      ${e.history || 'История не указана'}
                    </div>
                  </div>
                </div>
                <div class="accordion-item" style="border: none;">
                  <h2 class="accordion-header" id="headingTwo-${e.id}">
                    <button class="accordion-button collapsed" type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseTwo-${e.id}" 
                            aria-expanded="false" aria-controls="collapseTwo-${e.id}">
                      Характеристики
                    </button>
                  </h2>
                  <div id="collapseTwo-${e.id}" 
                       class="accordion-collapse collapse" 
                       aria-labelledby="headingTwo-${e.id}" 
                       data-bs-parent="#accordion-${e.id}">
                    <div class="accordion-body" style="font-size: 0.95rem; color: #343a40;">
                      ${e.traits || 'Характеристики не указаны'}
                    </div>
                  </div>
                </div>
                <div class="accordion-item" style="border: none;">
                  <h2 class="accordion-header" id="headingThree-${e.id}">
                    <button class="accordion-button collapsed" type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseThree-${e.id}" 
                            aria-expanded="false" aria-controls="collapseThree-${e.id}">
                      Уход
                    </button>
                  </h2>
                  <div id="collapseThree-${e.id}" 
                       class="accordion-collapse collapse" 
                       aria-labelledby="headingThree-${e.id}" 
                       data-bs-parent="#accordion-${e.id}">
                    <div class="accordion-body" style="font-size: 0.95rem; color: #343a40;">
                      ${e.care || 'Уход не указан'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

class ProductPage {
  constructor(parent, id) {
    this.parent = parent;
    this.id = parseInt(id); // Преобразуем id в число
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
  }

  get pageRoot() {
    return document.getElementById("main-page");
  }

  getHTML() {
    return `
      <div id="header"></div>
      <div class="container mt-3">
        <button class="btn btn-danger mb-3" id="add-button">+</button>
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

  clickCard(e) {
    const i = parseInt(e.target.dataset.id); // Преобразуем id в число
    console.log('Navigating to product page with ID:', i, 'Type:', typeof i);
    if (isNaN(i)) {
      console.error('Invalid ID for navigation:', e.target.dataset.id);
      return;
    }
    new ProductPage(this.parent, i).render();
  }

  addListeners() {
    const addButton = document.getElementById('add-button');
    if (addButton) {
      addButton.addEventListener('click', () => {
        console.log('Add button clicked');
        const form = document.getElementById('stockForm');
        if (form) {
          form.reset();
          const stockId = document.getElementById('stockId');
          if (stockId) stockId.value = '';
        } else {
          console.warn('Stock form not found');
        }
        const modalElement = document.getElementById('stockModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement, {
            backdrop: 'static',
            keyboard: false
          });
          modal.show();
        } else {
          console.error('Stock modal not found');
        }
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

// Обработчик формы
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  const stockForm = document.getElementById('stockForm');
  if (stockForm) {
    stockForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('Form submitted');
      const body = {
        src: document.getElementById('src').value,
        title: document.getElementById('title').value,
        text: document.getElementById('text').value,
        history: document.getElementById('history').value,
        traits: document.getElementById('traits').value,
        care: document.getElementById('care').value
      };
      console.log('Sending data:', { id: 'new', body });

      try {
        console.log('Sending POST request:', { url: 'http://localhost:3000/stocks', body });
        const response = await fetch('http://localhost:3000/stocks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to save: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const responseData = await response.json();
        console.log('Data saved successfully:', responseData);
        const modalElement = document.getElementById('stockModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
        new MainPage(document.getElementById('root')).render();
      } catch (error) {
        console.error('Ошибка сохранения:', error);
        alert(`Ошибка сохранения данных: ${error.message}`);
      }
    });
  } else {
    console.warn('Stock form not found in DOMContentLoaded');
  }
});

// Инициализация приложения
const u = document.getElementById("root");
const v = new MainPage(u);
v.render();