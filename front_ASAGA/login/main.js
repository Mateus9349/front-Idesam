import api from '../js/linkAPI.js'

const btn_Entrar = document.querySelector('[data-btn_entrar]');

btn_Entrar.addEventListener('click', (e) => {
    e.preventDefault()
    verificaPermissao();
})

async function verificaPermissao() {
    const pessoa = document.querySelector('.input').value;
    const senha = document.querySelector('.input1').value;
    const logins = await getLogins();

    let hasInvalidInput = false; // Variável para controlar se as entradas são inválidas

    if (pessoa === '' || senha === '') {
        hasInvalidInput = true;
    }

    if (hasInvalidInput) {
        alert('Preencha todos os campos!');
    } else {
        let foundMatch = false; // Variável para controlar se uma correspondência foi encontrada

        for (const element of logins) {
            if (element.nome === pessoa && element.senha === senha) {
                foundMatch = true;
                break; // Interrompe o loop assim que uma correspondência válida for encontrada
            }
        }

        if (foundMatch) {
            window.location.href = "../index.html";
        } else {
            alert('Usuário ou senha incorretos!');
        }
    }
}


async function getLogins() {
    const conexao = await fetch(`${api}/logins`);
    const conexaoJ = await conexao.json();
    return conexaoJ;
}