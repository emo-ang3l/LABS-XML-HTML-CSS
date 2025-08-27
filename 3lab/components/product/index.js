export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-4 shadow-sm card-hover" 
                 style="max-width: 2000px; margin: 0 auto; border-radius: 1.5rem; overflow: hidden; background: #ffffff;">
                
                <div class="row g-0">
                    <!-- Блок картинки -->
                    <div class="col-md-4 d-flex align-items-center justify-content-center p-3" 
                         style="background: linear-gradient(135deg, #faf8f8ff, #e9ecef);">
                        <img src="${data.src}" class="img-fluid rounded-3" 
                             alt="${data.title}" 
                             style="max-height: 250px; object-fit: contain;">
                    </div>

                    <!-- Блок текста -->
                    <div class="col-md-8">
                        <div class="card-body" style="padding: 1.5rem;">
                            <h4 class="card-title mb-3" 
                                style="font-size: 1.5rem; font-weight: 700; color: #212529;">
                                ${data.title}
                            </h4>
                            <p class="card-text mb-4" style="color: #495057; font-size: 1rem; line-height: 1.5;">
                                ${data.text}
                            </p>

                            <!-- Аккордеон -->
                            <div class="accordion" id="accordion-${data.id}">
                                <div class="accordion-item" style="border: none;">
                                    <h2 class="accordion-header" id="headingOne-${data.id}">
                                        <button class="accordion-button" type="button" 
                                                data-bs-toggle="collapse" 
                                                data-bs-target="#collapseOne-${data.id}" 
                                                aria-expanded="true" aria-controls="collapseOne-${data.id}">
                                            История
                                        </button>
                                    </h2>
                                    <div id="collapseOne-${data.id}" 
                                         class="accordion-collapse collapse show" 
                                         aria-labelledby="headingOne-${data.id}" 
                                         data-bs-parent="#accordion-${data.id}">
                                        <div class="accordion-body" style="font-size: 0.95rem; color: #343a40;">
                                            ${data.details.history}
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item" style="border: none;">
                                    <h2 class="accordion-header" id="headingTwo-${data.id}">
                                        <button class="accordion-button collapsed" type="button" 
                                                data-bs-toggle="collapse" 
                                                data-bs-target="#collapseTwo-${data.id}" 
                                                aria-expanded="false" aria-controls="collapseTwo-${data.id}">
                                            Характеристики
                                        </button>
                                    </h2>
                                    <div id="collapseTwo-${data.id}" 
                                         class="accordion-collapse collapse" 
                                         aria-labelledby="headingTwo-${data.id}" 
                                         data-bs-parent="#accordion-${data.id}">
                                        <div class="accordion-body" style="font-size: 0.95rem; color: #343a40;">
                                            ${data.details.traits}
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item" style="border: none;">
                                    <h2 class="accordion-header" id="headingThree-${data.id}">
                                        <button class="accordion-button collapsed" type="button" 
                                                data-bs-toggle="collapse" 
                                                data-bs-target="#collapseThree-${data.id}" 
                                                aria-expanded="false" aria-controls="collapseThree-${data.id}">
                                            Уход
                                        </button>
                                    </h2>
                                    <div id="collapseThree-${data.id}" 
                                         class="accordion-collapse collapse" 
                                         aria-labelledby="headingThree-${data.id}" 
                                         data-bs-parent="#accordion-${data.id}">
                                        <div class="accordion-body" style="font-size: 0.95rem; color: #343a40;">
                                            ${data.details.care}
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

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}
