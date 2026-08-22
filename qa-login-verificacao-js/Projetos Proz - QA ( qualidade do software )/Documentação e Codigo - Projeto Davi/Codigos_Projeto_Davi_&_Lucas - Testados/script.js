const formulario = document.getElementById("formLogin");

formulario.addEventListener("submit", function(event){
    event.preventDefault();

    let msg = document.getElementById("mensagem");

    let nome = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value.trim();


     if(nome === "" || nome.split(" ").length < 2){
        msg.innerHTML = "Digite seu nome completo.";
        return;
     }

    // Validação do email
    let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
    msg.innerHTML = "Digite um email válido.";
    return;
    }

     // Validação da senha
     if(senha.length < 6){
            msg.innerHTML = "A senha precisa ter no mínimo 6 caracteres.";
            return;
        }
     
    msg.innerHTML = "Login realizado!";
    setTimeout(() => {
                window.location.href = "home.html";
            }, 2000);

});