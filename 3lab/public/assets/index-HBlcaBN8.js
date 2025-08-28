(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();class g{constructor(e){this.parent=e}textStyles={fontSizeTitle:"1.2rem",fontSizeText:"1.6rem",fontWeightTitle:"normal",fontWeightText:"bold",color:"white",textShadow:"1px 1px 1px rgba(0, 0, 0, 0.4)",textAlign:"left",marginBottomTitle:"0.5rem",padding:"10px",lineHeight:"1"};getHTML(e){return`
                <div class="card m-2 card-hover" style="width: 330px; position: relative; border-radius: 2rem; overflow: hidden; background: #f8f9fa;">
                    <div style="position: relative; width: 100%; height: 550px; overflow: hidden; border-radius: 0.5rem;">
                        ${e.model?`<div id="model-${e.id}" style="width: 100%; height: 100%;"></div>`:`<img class="card-img-top card-image" src="${e.src}" alt="${e.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.5rem; transition: transform 0.5s ease;">`}
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
            `}addListeners(e,i){document.getElementById(`click-card-${e.id}`).addEventListener("click",i)}render3D(e,i){const o=document.getElementById(e),t=new THREE.Scene,r=new THREE.PerspectiveCamera(45,o.clientWidth/o.clientHeight,.1,1e3);r.position.z=5;const n=new THREE.WebGLRenderer({antialias:!0,alpha:!0});n.setSize(o.clientWidth,o.clientHeight),o.appendChild(n.domElement);const d=new THREE.DirectionalLight(16777215,1);d.position.set(0,5,5).normalize(),t.add(d),new THREE.GLTFLoader().load(i,h=>{const s=h.scene;s.scale.set(2,2,2),t.add(s);function c(){requestAnimationFrame(c),s.rotation.y+=.01,n.render(t,r)}c()})}render(e,i){const o=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",o),this.addListeners(e,i),e.model&&this.render3D(`model-${e.id}`,e.model)}}class m{constructor(e){this.parent=e}getHTML(e){return`
            <div class="card mb-4 shadow-sm card-hover" 
                 style="max-width: 2000px; margin: 0 auto; border-radius: 1.5rem; overflow: hidden; background: #ffffff;">
                
                <div class="row g-0">
                    <!-- Блок картинки -->
                    <div class="col-md-4 d-flex align-items-center justify-content-center p-3" 
                         style="background: linear-gradient(135deg, #faf8f8ff, #e9ecef);">
                        <img src="${e.src}" class="img-fluid rounded-3" 
                             alt="${e.title}" 
                             style="max-height: 250px; object-fit: contain;">
                    </div>

                    <!-- Блок текста -->
                    <div class="col-md-8">
                        <div class="card-body" style="padding: 1.5rem;">
                            <h4 class="card-title mb-3" 
                                style="font-size: 1.5rem; font-weight: 700; color: #212529;">
                                ${e.title}
                            </h4>
                            <p class="card-text mb-4" style="color: #495057; font-size: 1rem; line-height: 1.5;">
                                ${e.text}
                            </p>

                            <!-- Аккордеон -->
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
                                            ${e.details.history}
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
                                            ${e.details.traits}
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
                                            ${e.details.care}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}render(e){const i=this.getHTML(e);this.parent.insertAdjacentHTML("beforeend",i)}}class b{constructor(e){this.parent=e}addListeners(e){document.getElementById("back-button").addEventListener("click",e)}getHTML(){return`
                <button id="back-button" class="btn btn mb-3" type="button" style="border-radius: 1rem; background-color: #ad0909ff; color: white; border: none; font-weight: bold; padding: 8px 16px; transition: transform 0.3s ease;">Назад</button>
            `}render(e){const i=this.getHTML();this.parent.insertAdjacentHTML("beforeend",i),this.addListeners(e)}}class l{constructor(e){this.parent=e}getHTML(){return`
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
            `}render(){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e)}}class f{constructor(e,i){this.parent=e,this.id=i}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
                <div id="header"></div>
                <div id="product-page" class="container mt-3"></div>
            `}getData(){const e={1:{id:1,src:"https://i.pinimg.com/736x/8b/0a/01/8b0a018a47efdc60b0cf1ad31a2e2688.jpg",title:"Лабрадор",text:"Лабрадоры известны своей дружелюбностью и универсальностью.",details:{history:"Происходят из Ньюфаундленда, использовались рыбаками.",traits:"Дружелюбные, умные, энергичные.",care:"Нуждаются в регулярных прогулках и уходе за шерстью."}},2:{id:2,src:"https://i.pinimg.com/736x/1f/08/fe/1f08fe84642e3f82f1218de5dfa7bc9f.jpg",title:"Немецкая овчарка",text:"Надежная порода, часто используемая в полиции.",details:{history:"Выведены в Германии в конце 19 века.",traits:"Лояльные, уверенные, смелые.",care:"Требуют активных тренировок и социализации."}},3:{id:3,src:"https://i.pinimg.com/736x/e1/eb/92/e1eb9236fe6ea55e0c15155403110521.jpg",title:"Немецкая овчарка",text:"Надежная порода, часто используемая в полиции.",details:{history:"Выведены в Германии в конце 19 века.",traits:"Лояльные, уверенные, смелые.",care:"Требуют активных тренировок и социализации."}},4:{id:4,src:"https://i.pinimg.com/736x/81/0a/70/810a7044dd27406bc41db23e066a29bb.jpg",title:"Бигль",text:"Маленькие, но энергичные охотничьи собаки.",details:{history:"Использовались для охоты на зайцев в Англии.",traits:"Любознательные, дружелюбные, упрямые.",care:"Нуждаются в длительных прогулках и контроле питания."}},5:{id:5,src:"https://i.pinimg.com/originals/57/bb/90/57bb9060ec92c24e09a15e52a7d19036.jpg",title:"Бигль",text:"Маленькие, но энергичные охотничьи собаки.",details:{history:"Использовались для охоты на зайцев в Англии.",traits:"Любознательные, дружелюбные, упрямые.",care:"Нуждаются в длительных прогулках и контроле питания."}}};return e[this.id]||e[1]}clickBack(){new p(this.parent).render()}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),new l(document.getElementById("header")).render(),new b(this.pageRoot).render(this.clickBack.bind(this));const t=this.getData();new m(this.pageRoot).render(t)}}class p{constructor(e){this.parent=e}get pageRoot(){return document.getElementById("main-page")}getHTML(){return`
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
        `}getData(){return[{id:1,src:"https://i.pinimg.com/736x/8b/0a/01/8b0a018a47efdc60b0cf1ad31a2e2688.jpg",title:"Лабрадор",text:"Дружелюбная и умная порода, идеальная для семьи."},{id:2,src:"https://i.pinimg.com/736x/1f/08/fe/1f08fe84642e3f82f1218de5dfa7bc9f.jpg",title:"Немецкая овчарка",text:"Верный и защитный компаньон, отличный для службы."},{id:3,src:"https://i.pinimg.com/736x/e1/eb/92/e1eb9236fe6ea55e0c15155403110521.jpg",title:"Немецкая овчарка",text:"Верный и защитный компаньон, отличный для службы."},{id:4,src:"https://i.pinimg.com/736x/81/0a/70/810a7044dd27406bc41db23e066a29bb.jpg",title:"Немецкая овчарка",text:"Верный и защитный компаньон, отличный для службы."},{id:5,src:"https://i.pinimg.com/originals/57/bb/90/57bb9060ec92c24e09a15e52a7d19036.jpg",title:"Немецкая овчарка",text:"Верный и защитный компаньон, отличный для службы."}]}clickCard(e){const i=e.target.dataset.id;new f(this.parent,i).render()}render(){this.parent.innerHTML="";const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),new l(document.getElementById("header")).render(),this.getData().forEach(t=>{new g(this.pageRoot).render(t,this.clickCard.bind(this))})}}const u=document.getElementById("root"),v=new p(u);v.render();
