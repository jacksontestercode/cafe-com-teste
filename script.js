const VALID_USER = "jackson.mendes";
const VALID_PASS = "123";

let isPhoneRequired = false;
const phoneLabelSpan = document.querySelector('.phone-required');
const phoneField = document.getElementById('phone');
const loginContainer = document.getElementById('login-container');
const mainContainer = document.getElementById('main-container');
const loginForm = document.getElementById('login-form');
const contactForm = document.getElementById('contact-form');
const fileInput = document.getElementById('file-upload');
const fileContainer = document.querySelector('.file');

// === LOGIN COM ERRO NO HTML (SEM ALERT) ===
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');

    // Limpa erro anterior
    errorDiv.style.display = 'none';

    // Validações
    if (!username && !password) return showLoginError("Usuário e senha são obrigatórios.");
    if (!username) return showLoginError("Informe o nome de usuário.");
    if (!password) return showLoginError("Informe a senha.");
    if (!/^[a-zA-Z0-9.]+$/.test(username)) return showLoginError("Usuário inválido. Use apenas letras, números e ponto.");
    if (username !== VALID_USER || password !== VALID_PASS) return showLoginError("Usuário ou senha incorretos.");

    // SUCESSO: entra no sistema
    loginContainer.style.display = 'none';
    mainContainer.style.display = 'block';
});

function showLoginError(message) {
    const errorText = document.getElementById('error-text');
    const errorDiv = document.getElementById('login-error');
    errorText.textContent = message;
    errorDiv.style.display = 'flex';
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// === TELEFONE OBRIGATÓRIO ===
document.getElementById('phone-checkbox').addEventListener('change', function () {
    if (this.checked) {
        phoneLabelSpan.style.display = 'inline';
        phoneField.required = true;
        isPhoneRequired = true;
    } else {
        phoneLabelSpan.style.display = 'none';
        phoneField.required = false;
        isPhoneRequired = false;
    }
});

// === ENVIO DO FORMULÁRIO ===
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('open-text-area').value.trim();

    // Validação obrigatória
    if (!firstName || !lastName || !email || !message) return showMessage('error');
    if (isPhoneRequired && !phoneField.value.trim()) return showMessage('error');

    // Validação de e-mail
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(emailRegex)) return showMessage('error');

    // RESET COMPLETO
    contactForm.reset();
    document.getElementById('product').selectedIndex = 0;
    document.querySelector('input[value="ajuda"]').checked = true;
    document.getElementById('email-checkbox').checked = false;
    document.getElementById('phone-checkbox').checked = false;
    phoneLabelSpan.style.display = 'none';
    isPhoneRequired = false;
    phoneField.required = false;
    fileContainer.setAttribute('data-file-name', 'Nenhum arquivo escolhido');

    // SUCESSO
    showMessage('success');
});

function showMessage(type) {
    const msg = document.querySelector(`.message.${type}`);
    msg.style.display = 'block';
    window.scrollTo(0, 0); // Rola pro topo
    setTimeout(() => {
        msg.style.display = 'none';
    }, 3000);
}

// === BOTÃO SAIR COM CONFIRMAÇÃO ===
document.getElementById('back-to-login').addEventListener('click', function () {
    if (confirm('Deseja sair do sistema?')) {
        mainContainer.style.display = 'none';
        loginContainer.style.display = 'flex';

        // Limpa login
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('login-error').style.display = 'none';
    }
});

// === ATUALIZA NOME DO ARQUIVO AO SELECIONAR ===
fileInput.addEventListener('change', function () {
    const fileName = this.files.length > 0 ? this.files[0].name : 'Nenhum arquivo escolhido';
    fileContainer.setAttribute('data-file-name', fileName);
});