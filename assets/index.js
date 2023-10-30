
// contenedor de productos
const productsContainer = document.querySelector(".productos-container");
const productsContainer2 = document.querySelector("#product-maquillaje");
// contenedor de botón "ver más"
const btnLoadMore = document.querySelector(".loadMore");
// contedor de categorias
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
// contendor carrito
const btnCart = document.querySelector(".cart-icon");
const menuCart = document.querySelector(".carrito");
// contenedor navbar
const navbarMenu = document.querySelector(".navbar-list");
const menuBtn = document.querySelector(".menu-label");
const overlay = document.querySelector(".overlay");


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



// --------------- BOTÓN "VER MÁS" --------------- 

// f para que el botón "ver más" cargue más elementos al click
const loadMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let { products, currentProductsIndex } = appState;
    renderProducts(products[currentProductsIndex]);
    if (limitIndex()) {
        btnLoadMore.classList.add("hidden");
    }
};

//f para saber si el indice acutual de la lista de productos es = al limite de productos
const limitIndex = () => {
    return appState.currentProductsIndex === appState.productsLimit - 1;
};



// --------------- BOTONES DE CATEGORIA --------------- // 

// f para aplicar filtro de click btn category
const applyFilter = ({ target }) => { // desestructurar el target del elemento
    if (!inactiveBtnFilter(target)) return;
    changeFilterState(target);
    productsContainer.innerHTML = '';
    if (appState.activeFilter) {
        renderFilteredProducts();
        appState.currentProductsIndex = 0;
        return;
    }
    renderProducts(appState.products[0]);
};


// f para saber si el botón contiene category y no contiene active
const inactiveBtnFilter = (element) => {
    return (
        element.classList.contains("category") && 
        !element.classList.contains("active")
    );
};

// f para cambiar el estado del filtro
const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category;
    activeBtnState(appState.activeFilter);
    showMoreBtn();
};

// f para cambiar el estado de los botones
const activeBtnState = (selectCategory) => {
    const categories = [...categoriesList];
    categories.forEach((categoryBtn) => {
        if (categoryBtn.dataset.category !== selectCategory) {
            categoryBtn.classList.remove("active");
            return;
        }
        categoryBtn.classList.add("active");
    })
};

//f para ocultar o mostrar btn "ver más" según la cantidad de productos en cada categoria
const showMoreBtn = () => {
    if (!appState.activeFilter) {
        btnLoadMore.classList.remove("hidden")
        return
    }
    btnLoadMore.classList.add("hidden")
};

// f para renderizar los productos filtrados
const renderFilteredProducts = () => {
    const filteredProducts = productsData.filter(
        (product) => product.category === appState.activeFilter
    );
    renderProducts(filteredProducts);
};

// --------------- CARRITO --------------- //
const toggleCart = () => {
    menuCart.classList.toggle("open-cart");
    if (navbarMenu.classList.contains("open-menu")) {
        navbarMenu.classList.remove("open-menu");
        return;
    }
    overlay.classList.toggle("show-overlay");
};

// --------------- MENÚ --------------- //
const toggleMenu = () => {
    navbarMenu.classList.toggle("open-menu");
    if (menuCart.classList.contains("open-cart")) {
        menuCart.classList.remove("open-cart");
        return;
    }
    overlay.classList.toggle("show-overlay");
};

// f para cerrar menú o carrito y ocultar el overlay cuando scroll
const closeScroll = () => {
    if (
        !navbarMenu.classList.contains("open-menu") && 
        !menuCart.classList.contains("open-cart")
    ) {
        return
    };
    navbarMenu.classList.remove("open-menu");
    menuCart.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

// --------------- FUNCION INIT --------------- //
const init = () => {
    renderProducts(appState.products[0]);
    renderProducts2(productsData2);
    btnLoadMore.addEventListener("click", loadMoreProducts);
    categoriesContainer.addEventListener("click", applyFilter);
    btnCart.addEventListener("click", toggleCart);
    menuBtn.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", closeScroll);
};
init();
