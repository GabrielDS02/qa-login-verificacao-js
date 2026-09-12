const nome = localStorage.getItem("nome");
const nomeUsuario = document.getElementById("userName");
if (nome && nomeUsuario) {
    nomeUsuario.textContent = nome;
}

const email = localStorage.getItem("email");
const emailUsuario = document.getElementById("userEmail");
if (email && emailUsuario) {
    emailUsuario.textContent = email;
}

window.direcionarInicio = function(){
    window.location.href = "home.html";
};

window.direcionarPedidos = function() {
    window.location.href = "pedidos.html";
};

window.direcionarPerfil = function(){
    window.location.href = "perfil.html"
}

function sair() {
    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "index.html";
}