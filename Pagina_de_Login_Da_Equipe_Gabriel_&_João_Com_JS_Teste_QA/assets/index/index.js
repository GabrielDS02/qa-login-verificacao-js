function submitForm()
{
    // Get the form data
    const get = (id) => document.getElementById(id);

    // puxando os ids do html
    let name = get("name").value.trim();
    let email = get("email").value.trim();
    let password = get("password").value.trim();

    // puxando o id da div de erro 
    const error_div = get("mensagem_error");

    // puxando o id do botão de submit
    let button_form = get("submit-btn");

    ////////////////////////////////////////////////////

    // variavel local para verificar se o usuario ja esta cadastrado no sistema
    let usuarios_cadastrados = false; 

    // regex para validar a senha 
    const senha_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 

    // Validação de email pelo regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // matriz com os dados dos usuarios ja cadastrados no sistema
    const users_cadastrados = [
        {name: "carlos mendes", email: "carlos.mendes@gmail.com", password: "carlos123"},
        {name: "gabriel antunes", email: "gabriel99@gmail.com", password: "1234567"},
        {name: "joao silva", email: "joao.silva@gmail.com", password: "joao1234"},
        {name: "maria santos", email: "maria.santos@gmail.com", password: "maria5678"},
        {name: "lucas oliveira", email: "lucas.oliveira@gmail.com", password: "lucas9876"},
        {name: "ana costa", email: "ana.costa@gmail.com", password: "ana2026"},
        {name: "pedro almeida", email: "pedro.almeida@gmail.com", password: "pedro4321"},
        {name: "carolina rocha", email: "carolina.rocha@gmail.com", password: "carolina789"},
        {name: "rafael souza", email: "rafael.souza@gmail.com", password: "rafael123"},
        {name: "beatriz lima", email: "beatriz.lima@gmail.com", password: "beatriz456"},
        {name: "matheus ferreira", email: "matheus.ferreira@gmail.com", password: "matheus321"}
    ];

    // Função auxiliar para exibir erro na div e desabilitar botão temporariamente
    function showError(message, shake = true) {
        error_div.textContent = message;
        error_div.className = ''; // limpa classes anteriores
        error_div.classList.add('show');
        if (shake) error_div.classList.add('shake');
        
        button_form.innerHTML = "Enviando dados...";
        button_form.disabled = true;

        // Após 2 segundos, restaura o botão e mantém a mensagem visível por mais 3 segundos
        setTimeout(() => {
            button_form.innerHTML = "Sign up";
            button_form.disabled = false;
        }, 2000);

        // Remove a mensagem de erro após 5 segundos (para não ficar eternamente)
        setTimeout(() => {
            error_div.classList.remove('show', 'shake');
        }, 5000);
    }

    // condicionais 
    if (name == "" || email == "" || password == "") 
    {
        showError("Por favor, preencha todos os campos.");
        return;
    }

    else if (name.split(/\s+/).length < 2) 
    {
        showError("Digite seu nome completo.");
        return; 
    }

    else if (!emailRegex.test(email))
    {
        showError("Digite um e-mail válido.");
        return;
    }
    
    // Validação de senha usando a regex definida (maiúscula, minúscula, número, especial, 8+)
    else if (!senha_regex.test(password))
    {
        showError("A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial.");
        return;
    } 

    // for para percorrres todos os usuarios cadastrados no sistema e verificar se o email ja esta cadastrado
    // Agora com comparação case-insensitive
    for (let i = 0; i < users_cadastrados.length; i++)
    {
        if (users_cadastrados[i].email.toLowerCase() === email.toLowerCase()) 
        {
            usuarios_cadastrados = true; // usuario ja cadastrado no sistema
            break; // sai do for
        }
    }
    

    // se a variavel usuarios_cadastrados for true, significa que o email ja esta cadastrado no sistema
    if (usuarios_cadastrados)
    {
        // usuario ja cadastrado no sistema
        showError("O e-mail " + email + " já está cadastrado no sistema.", false);
        // A mensagem de erro já será exibida e o botão será restaurado pela função showError
        return;
    }


    // se chegar aqui o usuario não esta cadastrado no sistema, então ele sera cadastrado e redirecionado para a pagina de home
    // Se todos os campos estiverem preenchidos corretamente, exibe uma mensagem para o suaurio e redireciona ele para a pagina de home 
    button_form.innerHTML = "Enviando dados...";
    button_form.disabled = true; // desabilita o botão de submit para evitar múltiplos cliques

        setTimeout(() => {
            // Mostra mensagem de sucesso (usando a mesma div, mas com estilo diferente - você pode adicionar classe 'success' se quiser)
            error_div.textContent = "✅ Dados validados com sucesso, " + name + "! Cadastrando novo usuário...";
            error_div.className = ''; // limpa
            error_div.classList.add('show', 'success'); // usa a classe .success definida no CSS

                setTimeout(() => {
                    window.location.href = "home.html";
                }, 2500);

        }, 2000);
    
    return;
}