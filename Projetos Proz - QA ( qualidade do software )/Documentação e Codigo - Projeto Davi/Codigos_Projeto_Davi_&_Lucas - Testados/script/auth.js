const usuarioLogado = sessionStorage.getItem("usuarioLogado");

if (!usuarioLogado) {
    window.location.href = "index.html";
}