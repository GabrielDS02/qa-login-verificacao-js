const formulario = document.getElementById("formLogin");


formulario.addEventListener("submit", function(event){
    event.preventDefault();

    let msg = document.getElementById("mensagem");

    let nome = document.getElementById("nome").value.trim();
    localStorage.setItem("nome", nome);
    let email = document.getElementById("email").value.trim();
    localStorage.setItem("email", email);
    let senha = document.getElementById("senha").value.trim();


    if(nome === "" || nome.split(" ").length < 2){
        msg.innerHTML = "Digite seu nome e sobrenome.";
        return;
    }

    // Validação do email
    let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
    msg.innerHTML = "Digite um email válido.";
    return;
    }

     // Validação da senha
     //regex de senha
     let senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
     if(!senhaRegex.test(senha)){
            msg.innerHTML = "A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.";
            return;
        }
     
    msg.innerHTML = "Login realizado!";

    sessionStorage.setItem("usuarioLogado", "true");
    
    setTimeout(() => {
                window.location.href = "home.html";
            }, 2000);

});