const nome = localStorage.getItem("nome");
const nomeUsuario = document.getElementById("userName");
if (nome && nomeUsuario) {
    nomeUsuario.textContent = nome;
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