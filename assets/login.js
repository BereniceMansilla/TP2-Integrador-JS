// Selecciono todos mis elementos del DOM
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");


// traigo usuarios del localStorage o creo un array vacío
const users = JSON.parse(localStorage.getItem("users")) || [];
//guardo los usuarios en una f
const saveToLocalStorage = () => {
    localStorage.setItem("users", JSON.stringify(users));
};

// FUNCIONES AUXILIARES

const inputEmpty = (input) => {
    return !input.value.trim().length;
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
    return users.some((user) => user.email === input.value.trim());
};

const passSecure = (input) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    //test
    return re.test(input.value.trim());
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
    let emailValid = validEmailInput(emailInput);
    let passValid = validPasswordInput(passInput);
    //guardo todas las funciones sueltas de arriba en una variable 
    let formValid =
        emailValid &&
        passValid;
    
    if (formValid) {
        users.push({
            email: emailInput.value,
            password: passInput.value
        });
        saveToLocalStorage(users);
        alert("Incio de sesión exitoso");
        window.location.href="../index.html";
    };
};


// f inicializadora

const init = () => {
    loginForm.addEventListener("submit", validateForm);
    emailInput.addEventListener("input", () => validEmailInput(emailInput));
    passInput.addEventListener("input", () => validPasswordInput(passInput));
};

init();