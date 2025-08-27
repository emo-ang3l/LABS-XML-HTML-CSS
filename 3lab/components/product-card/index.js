export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    textStyles = {
        fontSizeTitle: '1.2rem',
        fontSizeText: '1.6rem',
        fontWeightTitle: 'normal',
        fontWeightText: 'bold',
        color: 'white',
        textShadow: '1px 1px 1px rgba(0, 0, 0, 0.4)',
        textAlign: 'left',
        marginBottomTitle: '0.5rem',
        padding: '10px',
        lineHeight: '1'
    };

    getHTML(data) {
        return (
            `
                <div class="card m-2 card-hover" style="width: 330px; position: relative; border-radius: 2rem; overflow: hidden; background: #f8f9fa;">
                    <div style="position: relative; width: 100%; height: 550px; overflow: hidden; border-radius: 0.5rem;">
                        ${data.model 
                            ? `<div id="model-${data.id}" style="width: 100%; height: 100%;"></div>` 
                            : `<img class="card-img-top card-image" src="${data.src}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.5rem; transition: transform 0.5s ease;">`
                        }
                        <div style="position: absolute; top: 12px; left: 10px; right: 10px; padding: ${this.textStyles.padding}; color: ${this.textStyles.color}; text-shadow: ${this.textStyles.textShadow}; text-align: ${this.textStyles.textAlign}; line-height: ${this.textStyles.lineHeight};">
                            <h5 class="card-title mb-${this.textStyles.marginBottomTitle.replace('rem', '')}" style="font-size: ${this.textStyles.fontSizeTitle}; font-weight: ${this.textStyles.fontWeightTitle};">${data.title}</h5>
                            <p class="card-text" style="font-size: ${this.textStyles.fontSizeText}; font-weight: ${this.textStyles.fontWeightText}; line-height: ${this.textStyles.lineHeight};">${data.text}</p>
                        </div>
                        <div style="position: absolute; bottom: 20px; left: 95px; right: 95px;">
                            <button class="btn w-100" id="click-card-${data.id}" data-id="${data.id}" style="border-radius: 1rem; background-color: #ad0909ff; color: white; border: none; font-weight: bold; padding: 8px 16px; transition: transform 0.3s ease;">Подробнее</button>
                        </div>
                    </div>
                </div>
                <style>
                    .btn:hover { transform: scale(1.05); }
                    .card-hover:hover .card-image { transform: scale(1.1); }
                </style>
            `
        );
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
    }

    render3D(containerId, modelPath) {
        const container = document.getElementById(containerId);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 5, 5).normalize();
        scene.add(light);

        const loader = new THREE.GLTFLoader();
        loader.load(modelPath, (gltf) => {
            const model = gltf.scene;
            model.scale.set(2, 2, 2);
            scene.add(model);

            function animate() {
                requestAnimationFrame(animate);
                model.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
            animate();
        });
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);

        if (data.model) {
            this.render3D(`model-${data.id}`, data.model);
        }
    }
}
