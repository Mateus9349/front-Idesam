import api from './linkAPI.js';

async function listaMaquinas(){
    const conexao = await fetch(`${api}/maquinas`)
    const conexaoConvertida = await conexao.json();
    
    return conexaoConvertida
}

async function inputMaquinas (){
    const dadosMaquinas = await listaMaquinas();
    
    const maquinas = [];
    dadosMaquinas.forEach(element => {
        maquinas.push(element.tipo_processo);
    });

    let select = document.querySelector('[data-tipoMaquina]');
    select.innerHTML = '';

    for (var i = 0; i < maquinas.length; i++) {
        var option = document.createElement("option");
        option.value = maquinas[i];
        option.text = maquinas[i];
        select.appendChild(option);
    }
}

async function listaColaboradores(){
    const conexao = await fetch(`${api}/funcionarios`)
    const conexaoConvertida = await conexao.json();
    
    return conexaoConvertida
}

async function inputFuncionario (){
    const dadosFuncionario = await listaColaboradores();
    
    const funcionarios = [];
    dadosFuncionario.forEach(element => {
        funcionarios.push(element.nome);
    });

    let select = document.querySelector('[data-funcionario]');
    select.innerHTML = '';

    for (var i = 0; i < funcionarios.length; i++) {
        var option = document.createElement("option");
        option.value = funcionarios[i];
        option.text = funcionarios[i];
        select.appendChild(option);
    }
}

async function listaEmbalagens(){
    const conexao = await fetch(`${api}/embalagens`)
    const conexaoConvertida = await conexao.json();
    
    return conexaoConvertida
}

async function inputEmbalagem(){
    const dadosEmbalagem = await listaEmbalagens();
    
    const embalagens = [];
    dadosEmbalagem.forEach(element => {
        embalagens.push(element.nome);
    });

    let select = document.querySelector('[data-embalagem]');
    select.innerHTML = '';

    for (var i = 0; i < embalagens.length; i++) {
        var option = document.createElement("option");
        option.value = embalagens[i];
        option.text = embalagens[i];
        select.appendChild(option);
    }
}

export const lista = {
    inputMaquinas,
    inputFuncionario,
    inputEmbalagem,
}

