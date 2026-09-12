window.direcionarInicio = function(){
    window.location.href = "home.html";
};

window.direcionarPedidos = function() {
    window.location.href = "pedidos.html";
};

window.direcionarPerfil = function(){
    window.location.href = "perfil.html"
}

window.filtrarPedidos = function (filtro, botao) {
    document.querySelectorAll("header ul li").forEach(function (item) {
        item.classList.remove("ativo");
    });

    botao.classList.add("ativo");
};