import api from '../../js/linkAPI.js';

const container = document.querySelector('[data-container]');

async function listarMaquinas() {
    const maquinas = await getMaquinas();
    maquinas.forEach((element) => {
        container.appendChild(constroiCard(element.id, element.tipo_processo, element.valor, element.data_aquisicao, element.vida_util, element.dias_utilizados));
    });
    calcularDepreciacaoMaquina()
    atualizarMaquina()
    //apagarFuncionario();
}

async function getMaquinas() {
    const conexao = await fetch(`${api}/maquinas`);
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

function constroiCard(id, nome, valor, data, vida, utilizados) {
    const maquina = document.createElement('div');
    maquina.className = 'maquina';
    maquina.innerHTML = `
                <img src="../../assets/img/icon-maquinas.svg" alt="icon-maquina">
                <div class="itens-maquina">
                    <p class="text">Máquina: <span>${nome}</span></p>
                    <p class="text">Valor: <span>${valor}</span> R$</p>
                    <p class="text">Data de aquisição: <span>${data}</span></p>
                    <p class="text">Vida útil: <span>${vida}</span></p>
                    <p class="text">Dias utilizados: <span>${utilizados}</span></p>
                </div>
                <div class="btns-icon">
                    <button class="btns">
                        <img id="${id}" data-depreciacao src="../../assets/img/icon-pagar.svg" alt="icon-depreciacao" title="pagar">
                    </button>
                    <button class="btns">
                        <img id="${id}" data-editar src="../../assets/img/icon-editar.svg" alt="icon-editar" title="editar">
                    </button>
                    <button class="btns">
                        <img id="${id}" data-deletar src="../../assets/img/icon-deletar.svg" alt="icon-deletar" title="deletar">
                    </button>
                </div>
        `
    return maquina;
}

listarMaquinas()

//-----------------------------------------------   Calcular depreciacao   -----------------------------------------------//

async function calcularDepreciacaoMaquina() {
    const depreciacao = document.querySelectorAll('[data-depreciacao]');
    for (let i = 0; i < depreciacao.length; i++) {
        depreciacao[i].addEventListener('click', (e) => {
            calcularDepreciacaoAnual(e.target.id)
        })
    }
}

async function calcularDepreciacaoAnual(id) {
    const conexao = await fetch(`${api}/maquinas/${id}`);
    const conexaoConvertida = await conexao.json();
    container.innerHTML = `
    <form action="">
        <fieldset>
            <legend>Depreciação por dia</legend>

            <label for="">Valor residual</label>
            <input data-residual type="number">

            <button data-calcular>Calcular</button>
        </fieldset>
    </form>
    `
    const calcular = document.querySelector('[data-calcular]');
    calcular.addEventListener('click', () => {
        let custoAtivo = conexaoConvertida.valor;
        let valorResidual = document.querySelector('[data-residual]').value;
        let vidaUtilAnos = conexaoConvertida.vida_util;
        let resultado = calcularDepreciacaoPorDia(custoAtivo, valorResidual, vidaUtilAnos);
        container.innerHTML = `
            A maquina, ${conexaoConvertida.tipo_processo} tem a deprecição de ${resultado} R$ por dia!
        `
    })
}

function calcularDepreciacaoPorDia(custoAtivo, valorResidual, vidaUtilAnos) {
    let vidaUtilDias = vidaUtilAnos * 365; // Conversão de anos para dias
    let depreciacaoPorDia = (custoAtivo - valorResidual) / vidaUtilDias;
    return depreciacaoPorDia;
}


//--------------------------------------------------------  editar Maquina  -------------------------------------------------------------//
async function atualizarMaquina() {
    const atualizar = document.querySelectorAll('[data-editar]');
    for (let i = 0; i < atualizar.length; i++) {
        atualizar[i].addEventListener('click', (e) => {
            formAtualizarMaquina(e.target.id)
        })
    }
}

async function formAtualizarMaquina(id) {
    const conexao = await fetch(`${api}/maquinas/${id}`);
    const conexaoConvertida = await conexao.json();
    container.innerHTML = `
    <form action="" class="extra">
        <label for="">Nome:</label>
        <input data-nome type="text" placeholder="Insira o nome">

        <label for="">Valor</label>
        <input data-valor type="number">

        <label for="">Data de aquisição</label>
        <input data-aquisicao type="date">

        <label for="">Vida útil em anos</label>
        <input data-util type="nuimber" placeholder="Insira a vida útil do equipamento">

        <label for="">Dias utilizados</label>
        <input data-dias type="number">

        <button data-atualizar type="submit">Atualizar</button>
    </form>
    `
    let nome = document.querySelector('[data-nome]');
    let valor = document.querySelector('[data-valor]');
    let aquisicao = document.querySelector('[data-aquisicao]');
    let util = document.querySelector('[data-util]');
    let dias = document.querySelector('[data-dias]');
    nome.value = conexaoConvertida.nome;
    valor.value = conexaoConvertida.valor;
    util.value = conexaoConvertida.vida_util;
    dias.value = conexaoConvertida.dias_utilizados;
    //formatando a data//
    let data = new Date(conexaoConvertida.data_aquisicao)
    let dia = data.getUTCDate().toString().padStart(2, '0');
    let mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
    let ano = data.getUTCFullYear();
    let dataFormatada = `${ano}-${mes}-${dia}`;
    aquisicao.value = dataFormatada


    const atualizar = document.querySelector('[data-atualizar]');
    atualizar.addEventListener('click', () => {
        nome = document.querySelector('[data-nome]').value;
        valor = document.querySelector('[data-valor]').value;
        aquisicao = document.querySelector('[data-aquisicao]').value;
        util = document.querySelector('[data-util]').value;
        dias = document.querySelector('[data-dias]').value;
        putMaquina(id, nome, valor, aquisicao, util, dias);
    })
}

async function putMaquina(id, nome, valor, aquisicao, util, dias) {
    const conexao = await fetch(`${api}/maquinas/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            valor: valor,
            data_aquisicao: aquisicao,
            vida_util: util,
            dias_utilizados: dias
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    alert('Informações atualizadas com sucesso!')
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

//------------------------------------------    APAGAR FUNCIONARIO  -------------------------------------//

async function apagarMaquina() {
    const apagar = document.querySelectorAll('[data-deletar]');
    for (let i = 0; i < apagar.length; i++) {
        apagar[i].addEventListener('click', (e) => {
            deleteMaquina(e.target.id)
        })
    }
}

async function deleteMaquina(id) {
    const conexao = await fetch(`${api}/maquinas/${id}`, {
        method: "DELETE",
    });
    window.location.reload()
    return alert('Maquina deletada!');
}


//--------------------------------- exports -------------------------------------------//

export const dep = {
    calcularDepreciacaoPorDia
}