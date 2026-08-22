function submitForm()
{
    // Get the form data
    const get = (id) => document.getElementById(id);

    // puxando os ids do html
    let name = get("name").value.trim();
    let email = get("email").value.trim();
    let password = get("password").value.trim();

    // puxando o id do botão de submit
    let button_form = get("submit-btn");

    ////////////////////////////////////////////////////

    // variavel local para verificar se o usuario ja esta cadastrado no sistema
    let usuarios_cadastrados = false; 

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

    // condicionais 
    if (name == "" || email == "" || password == "") 
        {
            button_form.innerHTML = "Enviando dados...";
            button_form.disabled = true; // desabilita o botão de submit para evitar múltiplos cliques

                setTimeout(() => {
                    alert("Por favor, preencha todos os campos. " + name + "!");
                    button_form.innerHTML = "Sign up";
                    button_form.disabled = false; // habilita o botão de submit novamente
                }, 2000);

            return;
        }

    else if (name.split(/\s+/).length < 2) 
        {
            button_form.innerHTML = "Enviando dados...";
            button_form.disabled = true; // desabilita o botão de submit para evitar múltiplos cliques

                setTimeout(() => {
                    alert("Digite seu nome completo. " + name + "!");
                    button_form.innerHTML = "Sign up";
                    button_form.disabled = false; // habilita o botão de submit novamente
                }, 2000);

            return; 
        }

    else if (email.indexOf("@") == -1 || email.indexOf(".") == -1)
        {
            button_form.innerHTML = "Enviando dados...";
            button_form.disabled = true; // desabilita o botão de submit para evitar múltiplos cliques

                setTimeout(() => {
                    alert("Digite um email válido. " + name + "!");
                    button_form.innerHTML = "Sign up";
                    button_form.disabled = false; // habilita o botão de submit novamente
                }, 2000);

            return;
        }
    
    else if (password.length < 6)
        {
            button_form.innerHTML = "Enviando dados...";
            button_form.disabled = true; // desabilita o botão de submit para evitar múltiplos cliques

                setTimeout(() => {
                    alert("A senha deve ter pelo menos 6 caracteres. " + name + "!");
                    button_form.innerHTML = "Sign up";
                    button_form.disabled = false; // habilita o botão de submit novamente
                }, 2000);

            return;
        } 


    // for para percorrres todos os usuarios cadastrados no sistema e verificar se o email ja esta cadastrado
    for (let i = 0; i < users_cadastrados.length; i++)
        {
            if (users_cadastrados[i].email === email) 
            {
                usuarios_cadastrados = true; // usuario ja cadastrado no sistema
                break; // sai do for
            }
        }
    

    // se a variavel usuarios_cadastrados for true, significa que o email ja esta cadastrado no sistema
    if (usuarios_cadastrados)
        {
            // usuario ja cadastrado no sistema
            button_form.innerHTML = "Enviando dados...";
            button_form.disabled = true; // desabilita o botão de submit para evitar múltiplos cliques

                setTimeout(() => {
                    button_form.innerHTML = "Email já cadastrado!";
                    alert("O email " + email + " já está cadastrado no sistema.");
                    button_form.innerHTML = "Sign up";
                    button_form.disabled = false; // habilita o botão de submit novamente
                }, 2000);

            return;
        }


    // se chegar aqui o usuario não esta cadastrado no sistema, então ele sera cadastrado e redirecionado para a pagina de home
    // Se todos os campos estiverem preenchidos corretamente, exibe uma mensagem para o suaurio e redireciona ele para a pagina de home 
    button_form.innerHTML = "Enviando dados...";
    button_form.disabled = true; // desabilita o botão de submit para evitar múltiplos cliques

        setTimeout(() => {
            button_form.innerHTML = "dados validados com sucesso " + name + "!";
            alert("Dados validados com sucesso! Cadastrando novo usuário e redirecionando para a página inicial...");

                setTimeout(() => {
                    window.location.href = "home.html";
                }, 2500);

        }, 2000);
    
    return;
}