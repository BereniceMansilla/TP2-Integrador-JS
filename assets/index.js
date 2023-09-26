const productsContainer = document.querySelector(".productos-container");
const productsContainer2 = document.querySelector("#product-maquillaje");
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category")

// Productos Sección PERFUMES
const CreateProductTemplate = (product) => {
    const { id, name, precio, category, img, descriptionProduct, cuotas} = product
    return `
    <div class="producto">
        <div class="producto-img">
        <img src="${img}" alt="${name}">
        </div>
        <div class="producto-info">
            <div class="producto-info-top">
                <h3>${name}</h3>
                <h5>${descriptionProduct}</h5>
            </div>
            <div class="producto-info-mid">
                <h2>${precio}</h2>
            </div>
            <div class="producto-info-bot">
                <div class="bot-text">
                <h5>6 CUOTAS DE ${cuotas}</h5><span>SIN INTERÉS</span>
                </div>
                <button class="button-81" role="button"
                data-id ='${id}' 
                data-name = '${name}'
                data-precio = '${precio}'
                data-img = '${img}'
                >COMPRAR</button>
            </div>
        </div>
    </div>`;
};

const renderProducts = (productsList) => {
    productsContainer.innerHTML += productsList
    .map(CreateProductTemplate)
    .join("");
};


// Productos Sección MAQUILLAJE
const CreateProductTemplate2 = (product) => {
    const { id, name, precio, img, descriptionProduct, cuotas } =
    product;
    return `
    <div class="producto">
        <div class="producto-img">
        <img src="${img}" alt="${name}">
        </div>
        <div class="producto-info">
            <div class="producto-info-top">
                <h3>${name}</h3>
                <h5>${descriptionProduct}</h5>
            </div>
            <div class="producto-info-mid">
                <h2>${precio}</h2>
            </div>
            <div class="producto-info-bot">
                <div class="bot-text">
                <h5>6 CUOTAS DE ${cuotas}</h5><span>SIN INTERÉS</span>
                </div>
                <button class="button-81" role="button"
                data-id ='${id}' 
                data-name = '${name}'
                data-precio = '${precio}'
                data-img = '${img}'
                >COMPRAR</button>
            </div>
        </div>
    </div>`;
};

const renderProducts2 = (productsList) => {
    productsContainer2.innerHTML += productsList
    .map(CreateProductTemplate2)
    .join("");
};



const init = () => {
    renderProducts(productsData);
    renderProducts2(productsData2);
    categoriesContainer.addEventListener("click", applyFilter);
};
init();

// FUNCIONES AUXILIARES


