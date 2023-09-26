// Selecciono todos mis elementos del DOM 
const registerForm = document.getElementById("login-form");
const nameInput = document.getElementById("name");
const apellidoInput = document.getElementById("apellido");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("telefono");
const passInput = document.getElementById("password");


// traigo usuarios del localStorage o creo un array vacío
const users = JSON.parse(localStorage.getItem("users")) || [];
//guardo los usuarios en una f
const saveToLocalStorage = () => {
    localStorage.setItem("users", JSON.stringify(users));
};

//--------------------------------------------------------//

// FUNCIONES AUXILIARES

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
    return users.some(user => user.email === input.value.trim());
};

const isTelValid = (input) => {
    const re = /^[0-9]{10}$/;
    //test
    return re.test(input.value.trim());
};

const passSecure = (input) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    //test
    return re.test(input.value.trim());
};


//--------------------------------------------------------//


// f validacion para inputs solo texto 

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
        showError(input, `El email ya está registrado`);
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

// f validación para intputs password

const validPasswordInput = (input) => {
    let valid = false;
    if (inputEmpty(input)) {
        showError(input, `Completar campo obligatorio`);
        return;
    };
    if (!passSecure(input)) {
        showError(
        input,
        `Contraseña inválida debe tener al menos 8 caracteres, una mayúscula y una minúscula`
        );
        return;
    };
    showSuccess(input);
    valid = true;
    return valid;
};

//--------------------------------------------------------//


// f Validación & Almacenamiento
const validateForm = (e) => {
    e.parentDefault()  // evitar comportamiento por default
    let nameValid = validEmailInput(nameInput);
    let apellidoValid = validPasswordInput(apellidoInput);
    let emailValid = validEmailInput(emailInput);
    let telValid = validTelInput(telInput);
    let passValid = validPasswordInput(passInput);
    //guardo todas las funciones sueltas de arriba en una variable 
    let formValid =
        nameValid &&
        apellidoValid &&
        emailValid &&
        telValid &&
        passValid;
    
    if (formValid) {
        users.push({
            name: nameInput.value,
            lastName: apellidoInput.value,
            email: emailInput.value,
            tel: telInput.value,
            password: passInput.value
        });
        saveToLocalStorage(users);
        alert("Tu cuenta fue creada con éxito");
        window.location.href="login.html";
    };
};

//--------------------------------------------------------//


// f Inicializadora

const init = () => {
    registerForm.addEventListener("submit", validateForm);
    nameInput.addEventListener("input", () => validTextInput(nameInput));
    apellidoInput.addEventListener("input", () => validTextInput(apellidoInput));
    emailInput.addEventListener("input", () => validEmailInput(emailInput));
    telInput.addEventListener("input", () => validTelInput(telInput));
    passInput.addEventListener("input", () => validPasswordInput(passInput));
};

init();