import api from '../js/linkAPI.js'

const extrativista = document.querySelector('[data-containerExtrativista]');
const funcionario = document.querySelector('[data-containerFuncionario]');
const maquinario = document.querySelector('[data-containerMaquinario]');
const ferramenta = document.querySelector('[data-containerFerramenta]');
const embalagem = document.querySelector('[data-containerEmbalagem]');

const btt_extrativista = document.querySelector('#btt_Extrativista');
const btt_funcionario = document.querySelector('#btt_Funcionario');
const btt_maquinario = document.querySelector('#btt_Maquinario');
const btt_ferramenta = document.querySelector('#btt_Ferramenta');
const btt_embalagem = document.querySelector('#btt_Embalagem');

btt_extrativista.addEventListener('click', ()=>{
    extrativista.classList.toggle('extrativista-cadastro-inativo');
    funcionario.classList.add('funcionario-cadastro-inativo');
    maquinario.classList.add('maquinario-cadastro-inativo');  
    ferramenta.classList.add('ferramenta-cadastro-inativo');
    embalagem.classList.add('embalagem-cadastro-inativo');
})

btt_funcionario.addEventListener('click', ()=>{
    extrativista.classList.add('extrativista-cadastro-inativo');
    funcionario.classList.toggle('funcionario-cadastro-inativo');
    maquinario.classList.add('maquinario-cadastro-inativo');  
    ferramenta.classList.add('ferramenta-cadastro-inativo');
    embalagem.classList.add('embalagem-cadastro-inativo');  
})

btt_maquinario.addEventListener('click', ()=>{
    extrativista.classList.add('extrativista-cadastro-inativo');
    funcionario.classList.add('funcionario-cadastro-inativo');
    maquinario.classList.toggle('maquinario-cadastro-inativo');  
    ferramenta.classList.add('ferramenta-cadastro-inativo');
    embalagem.classList.add('embalagem-cadastro-inativo');  
})

btt_ferramenta.addEventListener('click', ()=>{
    extrativista.classList.add('extrativista-cadastro-inativo');
    funcionario.classList.add('funcionario-cadastro-inativo');
    maquinario.classList.add('maquinario-cadastro-inativo');  
    ferramenta.classList.toggle('ferramenta-cadastro-inativo');
    embalagem.classList.add('embalagem-cadastro-inativo');  
})

btt_embalagem.addEventListener('click', ()=>{
    extrativista.classList.add('extrativista-cadastro-inativo');
    funcionario.classList.add('funcionario-cadastro-inativo');
    maquinario.classList.add('maquinario-cadastro-inativo');  
    ferramenta.classList.add('ferramenta-cadastro-inativo');
    embalagem.classList.toggle('embalagem-cadastro-inativo');  
})

// Cadastrar extrativista //

const btn_cadastrarExtrativista = document.querySelector('[data-cadastrarExtrativista]')

btn_cadastrarExtrativista.addEventListener('click', () => {
    const nomeExtrativista = document.querySelector('[data-nomeExtrativista]').value;
    const sexoExtrativista = document.querySelector('[data-sexoExtrativista]').value;
    const cpfExtrativista = document.querySelector('[data-cpfExtrativista]').value;
    const idadeExtrativista = document.querySelector('[data-idadeExtrativista]').value;
    const apelidoExtrativista = document.querySelector('[data-apelidoExtrativista]').value;
    const comunidadeExtrativista = document.querySelector('[data-comunidadeExtrativista]').value;
    
    cadastraExtrativista(nomeExtrativista,sexoExtrativista,cpfExtrativista,idadeExtrativista,apelidoExtrativista,comunidadeExtrativista);
    alert('extrativista cadastrado com sucesso!');
    location.reload();
});

async function cadastraExtrativista(nome, sexo, cpf, idade, apelido, comunidade) {
    const conexao = await fetch(`${api}/extrativistas`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            sexo: sexo,
            cpf: cpf,
            idade: idade,
            apelido: apelido,
            comunidade: comunidade
        })
    });

    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }

    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

// fim cadastrar extrativista//

// Cadastrar funcionario //

const btn_cadastrarFuncionario = document.querySelector('[data-cadastrarFuncionario]')

btn_cadastrarFuncionario.addEventListener('click', () => {
    const nomeFuncionario = document.querySelector('[data-nomeFuncionario]').value;
    const idadeFuncionario = document.querySelector('[data-idadeFuncionario]').value;
    const sexoFuncionario = document.querySelector('[data-sexoFuncionario]').value;
    const comunidadeFuncionario = document.querySelector('[data-comunidadeFuncionario]').value;
    const funcaoFuncionario = document.querySelector('[data-funcaoFuncionario]').value;
    const valorHoraFuncionario = document.querySelector('[data-valorHoraFuncionario]').value;
    const valorDiariaFuncionario = document.querySelector('[data-valorDiariaFuncionario]').value;
    
    cadastraFuncionario(nomeFuncionario,idadeFuncionario,sexoFuncionario,comunidadeFuncionario,funcaoFuncionario,valorHoraFuncionario,valorDiariaFuncionario);
    alert('Funcionario cadastrado com sucesso!');
    location.reload();
});

async function cadastraFuncionario(nome, idade, sexo, comunidade, funcao, valor_hora, valor_diaria) {
    const conexao = await fetch(`${api}/funcionarios`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            idade: idade,
            sexo: sexo,
            comunidade: comunidade,
            funcao: funcao,
            valor_hora: valor_hora,
            valor_diaria: valor_diaria
        })
    });

    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }

    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

// fim cadastrar funcionario//

// Cadastrar maquina //

const btn_cadastrarMaquina = document.querySelector('[data-cadastrarMaquina]');

btn_cadastrarMaquina.addEventListener('click', () => {
    const nomeMaquina = document.querySelector('[data-nomeMaquina]').value;
    const tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
    const valorMaquina = document.querySelector('[data-valorMaquina]').value;
    const dataAquisicaoMaquina = document.querySelector('[data-dataAquisicaoMaquina]').value;
    const vidaUtilMaquina = document.querySelector('[data-vidaUtilMaquina]').value;
    const depreciacaoAno = 0;
    const depreciacaoDia = 0;
    const diasUtilizados = document.querySelector('[data-diasUtilizados]').value;
    const tipoEnergia = document.querySelector('[data-tipoEnergia]').value;
    const horasTrabalhadas = document.querySelector('[data-horasTrabalhadas]').value;
    const potencia = document.querySelector('[data-potencia]').value;
    
    cadastraMaquina(nomeMaquina, tipoMaquina,tipoEnergia, valorMaquina, dataAquisicaoMaquina, vidaUtilMaquina, depreciacaoAno, depreciacaoDia,
    diasUtilizados, horasTrabalhadas, potencia);
    alert('Maquina cadastrada com sucesso!');
    location.reload();
});

async function cadastraMaquina(nome, tipo, energia, valor, aquisicao, vida_util, depreciacao_anual, depreciacao_dia, dias_utilizados, horas_trabalhadas, potencia) {
    const conexao = await fetch(`${api}/maquinas`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            tipo_processo: tipo,
            fonte_energia: energia,
            valor: valor,
            data_aquisicao: aquisicao,
            vida_util: vida_util,
            depreciacao_anual: depreciacao_anual,
            depreciacao_dia: depreciacao_dia,
            dias_utilizados: dias_utilizados,
            horas_trabalhadas: horas_trabalhadas,
            potencia: potencia
        })
    });

    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }

    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

// fim cadastrar maquina//


//-----------------------------------------------   embalagens  ------------------------------------------------------------------//

const btn_cadastrarEmbalagem = document.querySelector('[data-cadastrarEmbalagem]');

btn_cadastrarEmbalagem.addEventListener('click', async () => {
    const nome = document.querySelector('[data-nomeEmbalagem]').value;
    const tamanho = document.querySelector('[data-tamanhoEmbalagem]').value;
    const quantidade = document.querySelector('[data-quantidadeEmbalagem]').value;
    const valor = document.querySelector('[data-valorEmbalagem]').value;
    
    cadastraEmbalagem(nome, tamanho, quantidade, valor);
    alert('Embalagem cadastrada com sucesso!');
    location.reload();
});

async function cadastraEmbalagem(nome, tamanho, quantidade, valor) {
    const conexao = await fetch(`${api}/embalagens`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            tamanho: tamanho,
            quantidade: quantidade,
            valor: valor
        })
    });

    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }

    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

//-------------------------------------------------------   Mostrar forms   ---------------------------------------------------//

