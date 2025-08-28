(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const r of c.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(o){if(o.ep)return;o.ep=!0;const c=e(o);fetch(o.href,c)}})();const d={_handleResponse(s,t){try{console.log("Raw response:",s.responseText);const e=s.responseText?JSON.parse(s.responseText):null;t(e,s.status)}catch(e){console.error("Ошибка парсинга JSON:",e,"Response:",s.responseText),t(null,s.status)}},get(s,t,e=3){const n=new XMLHttpRequest;n.open("GET",s),n.send(),n.onreadystatechange=()=>{n.readyState===4&&(n.status===200?this._handleResponse(n,t):e>0?(console.warn(`Retry ${e} for ${s}`),setTimeout(()=>this.get(s,t,e-1),1e3)):this._handleResponse(n,t))}},post(s,t,e,n=3){const o=new XMLHttpRequest;o.open("POST",s),o.setRequestHeader("Content-Type","application/json"),o.send(JSON.stringify(t)),o.onreadystatechange=()=>{o.readyState===4&&(o.status===201||o.status===200?this._handleResponse(o,e):n>0?(console.warn(`Retry ${n} for ${s}`),setTimeout(()=>this.post(s,t,e,n-1),1e3)):this._handleResponse(o,e))}}},h={getStocks:()=>"http://localhost:3000/stocks",getStockById:s=>`http://localhost:3000/stocks/${s}`,createStock:()=>"http://localhost:3000/stocks"};class m{constructor(t){this.parent=t}getHTML(t){return`
            <div class="card m-2" style="width: 300px;" data-id="${t.id}">
                <img class="card-img-top" src="${t.src||"https://via.placeholder.com/300x180"}" alt="${t.title||"Акция"}">
                <div class="card-body">
                    <h5 class="card-title">${t.title||"Без названия"}</h5>
                    <p class="card-text">${t.text||"Без описания"}</p>
                    <button class="btn btn-primary" id="click-card-${t.id}" data-id="${t.id}">Подробнее</button>
                </div>
            </div>
        `}render(t,e=null){console.log("Rendering card with data:",t);const n=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",n),e&&this.parent.querySelector(`#click-card-${t.id}`).addEventListener("click",()=>e(t.id))}}class f{constructor(t){this.parent=t}getHTML(){return`
            <div class="main-page container">
                <h1 class="text-center mb-4">Список акций</h1>
                <button id="create-stock-btn" class="btn btn-success mb-3">Создать акцию</button>
                <div id="main-page-content" class="d-flex flex-wrap"></div>
            </div>
        `}get pageRoot(){return document.getElementById("main-page-content")}getData(){d.get(h.getStocks(),(t,e)=>{console.log("Data from /stocks:",t,"Status:",e),e===200&&t?this.renderData(t):(console.error("Ошибка загрузки данных:",e),this.pageRoot.insertAdjacentHTML("beforeend",'<p class="text-danger text-center">Ошибка загрузки данных</p>'))})}renderData(t){t.forEach(e=>{new m(this.pageRoot).render(e,this.clickCard.bind(this))})}clickCard(t){window.location.hash=`#stock/${t}`}clickCreate(){console.log("Create button clicked"),window.location.hash="#create"}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t);const e=this.parent.querySelector("#create-stock-btn");e?e.addEventListener("click",this.clickCreate.bind(this)):console.error("Create button not found"),this.getData()}}class g{constructor(t){this.parent=t}getHTML(){return`
            <button id="back-button" class="btn btn-primary mb-3">Назад</button>
        `}render(t){const e=this.getHTML();this.parent.insertAdjacentHTML("beforeend",e),this.parent.querySelector("#back-button").addEventListener("click",t)}}class b{constructor(t,e){this.parent=t,this.id=e}getHTML(){return`
            <div class="stock-page container">
                <h1 class="text-center mb-4">Акция #${this.id}</h1>
                <div id="stock-page-content"></div>
            </div>
        `}get pageRoot(){return document.getElementById("stock-page-content")}getData(){d.get(h.getStockById(this.id),(t,e)=>{console.log("Data from /stocks/"+this.id+":",t,"Status:",e),e===200&&t?this.renderData(t):(console.error("Ошибка загрузки карточки:",e),this.pageRoot.insertAdjacentHTML("beforeend",'<p class="text-danger">Ошибка загрузки карточки</p>'))})}renderData(t){const e=`
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${t.src||"https://via.placeholder.com/300x180"}" class="img-fluid rounded-start" alt="${t.title||"Акция"}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${t.title||"Без названия"}</h5>
                            <p class="card-text">${t.text||"Без описания"}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;this.pageRoot.insertAdjacentHTML("beforeend",e)}clickBack(){window.location.hash=""}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new g(this.pageRoot).render(this.clickBack.bind(this)),this.getData()}}class k{constructor(t,e){this.parent=t,this.onStockCreated=e}getHTML(){return`
            <div class="create-stock-page container">
                <h1 class="text-center mb-4">Создать новую акцию</h1>
                <div id="create-stock-content">
                    <form id="create-stock-form" class="card p-4 mx-auto" style="max-width: 500px;">
                        <div class="mb-3">
                            <label for="stock-src" class="form-label">URL изображения</label>
                            <input type="url" class="form-control" id="stock-src" placeholder="https://example.com/image.jpg">
                        </div>
                        <div class="mb-3">
                            <label for="stock-title" class="form-label">Название акции</label>
                            <input type="text" class="form-control" id="stock-title" placeholder="Акция 1">
                        </div>
                        <div class="mb-3">
                            <label for="stock-text" class="form-label">Описание акции</label>
                            <textarea class="form-control" id="stock-text" rows="4" placeholder="Описание акции"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Создать</button>
                    </form>
                    <div id="form-message" class="mt-3"></div>
                </div>
            </div>
        `}get pageRoot(){return document.getElementById("create-stock-content")}clickBack(){window.location.hash=""}handleSubmit(t){t.preventDefault();const e=document.getElementById("stock-src").value,n=document.getElementById("stock-title").value,o=document.getElementById("stock-text").value,c=document.getElementById("form-message");if(!e||!n||!o){c.innerHTML='<p class="text-danger">Заполните все поля!</p>';return}const r={src:e,title:n,text:o};console.log("Sending POST data:",r),d.post(h.createStock(),r,(a,i)=>{if(console.log("POST response:",a,"Status:",i),i===201||i===200)c.innerHTML='<p class="text-success">Акция успешно создана!</p>',document.getElementById("create-stock-form").reset(),this.onStockCreated&&(console.log("Calling onStockCreated to refresh main page"),this.onStockCreated()),setTimeout(()=>{console.log("Redirecting to main page"),window.location.hash=""},2e3);else{const p=a&&a.error?a.error:`Ошибка ${i}: Не удалось создать акцию`;console.error("POST error:",p),c.innerHTML=`<p class="text-danger">${p}</p>`}})}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new g(this.pageRoot).render(this.clickBack.bind(this));const n=document.getElementById("create-stock-form");n?n.addEventListener("submit",this.handleSubmit.bind(this)):console.error("Form element not found")}}const l=document.getElementById("root");function u(){const s=window.location.hash;if(console.log("Navigating to:",s),s.startsWith("#stock/")){const t=s.split("/")[1];console.log("Loading StockPage with ID:",t),new b(l,t).render()}else s==="#create"?(console.log("Loading CreateStockPage"),new k(l).render()):(console.log("Loading MainPage"),new f(l).render())}window.addEventListener("hashchange",u);u();
