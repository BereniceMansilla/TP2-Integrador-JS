
// contenedor de productos
const productsContainer = document.querySelector(".productos-container");
const productsContainer2 = document.querySelector("#product-maquillaje");
// contenedor de botón "ver más"
const btnLoadMore = document.querySelector(".loadMore");
// contedor de categorias
const categoriesContainer = document.querySelector(".categories");
const categoriesList = document.querySelectorAll(".category");
// contendor carrito
const btnCart = document.querySelector(".cart-label");
const menuCart = document.querySelector(".carrito");
// contenedor navbar
const navbarMenu = document.querySelector(".navbar-list");
const menuBtn = document.querySelector(".menu-label");
// overlay
const overlay = document.querySelector(".overlay");
// productos del carrito
const productsCarrito = document.querySelector(".carrito-container");
const total = document.querySelector(".total");
// msgs
const succesMsg = document.querySelector(".add-modal");

// FORM
const registerForm = document.getElementById("login-form");
const nameInput = document.getElementById("name");
const apellidoInput = document.getElementById("apellido");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("telefono");


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
                <h2>$${precio}</h2>
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

// f para cerrar el menu y carrito cuando ocurra un clik en el overlay
const closeOverlayClick = () => {
    navbarMenu.classList.remove("open-menu");
    menuCart.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};


// --------------- RENDERIZADO DEL CARRITO --------------- //
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// guardo el carrito
const saveCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};
// renderizado
const renderCarrito = () => {
    // si el carrito vacio
    if (!carrito.length) {
        productsCarrito.innerHTML = `
        <p class="empty-msg">Carrito vacío</p>
        `;
        return;
    }
    // productos en el carrito
    productsCarrito.innerHTML = carrito.map(createCartProduct).join("");
};

// f template de producto del carrito
const createCartProduct = (carritoProduct) => {
    const { id, name, precio, img, descriptionProduct, quantity } = carritoProduct;
    return `
    <div class="carrito-item">
        <img src=${img} alt="item">
        <div class="item-info">
            <h3 class="item-title">${name}</h3>
            <p class="item-bid">${descriptionProduct}</p>
            <span class="item-price">$ ${precio}</span>
        </div>

        <div class="item-cantidad">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
            </div>
    `
};

// f agregar productos al carrito
const addProducto = (e) => {
    if (!e.target.classList.contains("button-81")) { return };

    const product = createProductData(e.target.dataset);

    if (existCarritoProduct(product)) {
        addQuantityPorduct(product);
        // feedback
        showSuccesMsg("Se agregó una unidad al carrito");
    } else {
        createObjCartProduct(product);
        showSuccesMsg("Se agregó el producto al carrito");
    };

    updateCarritoState();
};

// f objeto del producto que se agregue
const createObjCartProduct = (product) => {
    carrito = [...carrito, { ...product, quantity: 1 }];
};

// f actualización del carrito
const updateCarritoState = () => {
    saveCarrito();
    renderCarrito();
    carritoTotal();
};

// f desestructuradora
const createProductData = (product) => {
    const { id, name, precio, img } = product;
    return { id, name, precio, img };
};

// f comprobar si el producto fue agregado al carrito
const existCarritoProduct = (product) => {
    return carrito.find((item) => item.id === product.id);
};

// f agregar 1 unidad al producto que tengo en el carrito
const addQuantityPorduct = (product) => {
    carrito = carrito.map((carritoProduct) =>
        carritoProduct.id === product.id
            ? { ...carritoProduct, quantity: carritoProduct.quantity + 1 }
            : carritoProduct
    );
};

// f devolcuión al usuario
const showSuccesMsg = (msg) => {
    succesMsg.classList.add("active-modal");
    succesMsg.textContent = msg;
    setTimeout(() => {
        succesMsg.classList.remove("active-modal")
    }, 1500);
};

// f para ver el total de la compra 
const carritoTotal = () => {
    total.innerHTML = `$ ${getCarritoTotal().toFixed(2)}`
};

// f para conseguir total de la compra
const getCarritoTotal = () => {
    return carrito.reduce((acumulador, actual) => acumulador + Number(actual.precio) * actual.quantity, 0)
};






// FORMULARIO
const contactUs = JSON.parse(localStorage.getItem("contact-us")) || [];

const saveToLocalStorage = () => {
    localStorage.setItem("contact-us", JSON.stringify(contactUs));
};

//--------------------------------------------------------//

const inputEmpty = (input) => {
    return !input.value.trim().length;
};

const isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length < max;
};

const showError = (input, message) => {
    const formField = input.parentElement; //agarro el div contenedor del input y lo guardo
    formField.classList.remove("success"); // por las dudas elimino el success
    formField.classList.add("error"); // agrego el error
    const error = formField.querySelector("small"); // guardo la etiqueta small en const error
    error.style.display = "block"; // le saco el display:none para que muestre el style
    error.textContent = message; // agrego un mensaje que se mostrará cuando ocurra el error
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const error = formField.querySelector("small");
    error.textContent = "";
};

const isEmailValid = (input) => {
    const re = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    // test
    return re.test(input.value.trim());
};

const existingEmail = (input) => {
    return contactUs.some(user => contactUs.email === input.value.trim());
};

const isTelValid = (input) => {
    const re = /^[0-9]{10}$/;
    //test
    return re.test(input.value.trim());
};

//--------------------------------------------------------//

const validTextInput = (input) => {
    let valid = false;
    const minChar = 4;
    const maxChar = 15;
    // si el input está vacío:
    if (inputEmpty(input)) {
        showError(input, `Completar campo obligatorio`);
        return
    };
    // si el input NO está entre el min y max de caracteres
    if (!isBetween(input, minChar, maxChar)) { //niego con ! que no está entre el min y max
        showError(input, `Debe contener entre ${minChar} y ${maxChar} caracteres`);//mostramos el mensaje de error
        return;
    };
    // si el input es correcto
    showSuccess(input);
    valid = true;
    return valid;
};

// f validación para inputs email

const validEmailInput = (input) => {
    let valid = false;
    if (inputEmpty(input)) {
        showError(input, `Completar campo obligatorio`);
        return;
    };
    if (!isEmailValid(input)) {
        showError(input, `El email no es válido`);
        return;
    };
    if (existingEmail(input)) {
        showError(input, `El email ya está registrado, inicia sesión`);
        return;
    };
    showSuccess(input);
    valid = true;
    return valid;
};

// f validación para inputs tel

const validTelInput = (input) => {
    let valid = false;
    if (inputEmpty(input)) {
        showError(input, `Completar campo obligatorio`);
        return;
    };
    if (!isTelValid(input)) {
        showError(input, `El teléfono no es válido`);
        return;
    };
    showSuccess(input);
    valid = true;
    return valid;
};

//--------------------------------------------------------//

const validateForm = (e) => {
    e.preventDefault();  // evitar comportamiento por default
    
    let nameValid = validTextInput(nameInput);
    let apellidoValid = validTextInput(apellidoInput);
    let emailValid = validEmailInput(emailInput);
    let telValid = validTelInput(telInput);

    //guardo todas las funciones sueltas de arriba en una variable 
    let formValid =
        nameValid &&
        apellidoValid &&
        emailValid &&
        telValid;
    
    if (formValid) {
        contactUs.push({
            name: nameInput.value,
            lastName: apellidoInput.value,
            email: emailInput.value,
            tel: telInput.value
        });
        saveToLocalStorage(contactUs);
        alert("Datos Enviados con exito");
        window.location.href="index.html";    
    }
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
    overlay.addEventListener("click", closeOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCarrito);
    document.addEventListener("DOMContentLoaded", carritoTotal);
    productsContainer.addEventListener("click", addProducto);

    registerForm.addEventListener("submit", validateForm);
    nameInput.addEventListener("input", () => validTextInput(nameInput));
    apellidoInput.addEventListener("input", () => validTextInput(apellidoInput));
    emailInput.addEventListener("input", () => validEmailInput(emailInput));
    telInput.addEventListener("input", () => validTelInput(telInput));
};
init();