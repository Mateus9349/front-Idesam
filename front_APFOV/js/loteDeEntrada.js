import api from './linkAPI.js'

async function listaLotesDeEntrada(){
    const conexao = await fetch(`${api}/loteEntradas`)
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida
}

function constroiCard(id, extrativista, local, quantidade, materiaPrima) {
    const lote = document.createElement('div')
    lote.className = "loteItem";
    lote.innerHTML = `
        <p id="id">${id}</p>
        <p id="materia-prima">${materiaPrima}</p>
        <p id="extrativista"></p>
        <p id="local"></p>
        <p id="quantidade"><span>${quantidade}</span> Kg</p>
        <button data-btnDividir class="btn-dividir">Dividir</button>
        `
    return lote;
}

async function listarLotes(materiaPrima) {
    const dadosApi = await listaLotesDeEntrada()
    const container = document.querySelector('[data-containerLotes]');
    if(dadosApi.length != 0){
        container.innerHTML = `
        <h1 id="titulo-lote">Selecione o lote de entrada</h1>
    `
    }
    dadosApi.forEach((element) => {
        //tratatando a string para que apareça a materia-prima uma unica vez//
        let result = element.materia_prima.indexOf(materiaPrima)
        element.materia_prima = element.materia_prima.slice(result, materiaPrima.length)
        if (element.materia_prima == /* materia prima em questão */ materiaPrima && element.ativo == true) {
            container.appendChild(constroiCard(element.id, element.extrativista, element.local, element.quantidade, materiaPrima))
        }
    });

    //selecionando lote de entrada que foi processado//
    const loteSelecionado = document.querySelectorAll('.loteItem');

    for (let i = 0; i < loteSelecionado.length; i++) {
        loteSelecionado[i].addEventListener('click', () => {
            let quantidade = loteSelecionado[i].children[4].children[0].innerText
            let id = loteSelecionado[i].children[0].innerText
            preencheInput(quantidade, id);
        })
    }

    const divir = document.querySelectorAll('[data-btnDividir]');
    for (let i = 0; i < divir.length; i++) {
        divir[i].addEventListener('click', () => {
            let quantidade = loteSelecionado[i].children[4].innerText
            let id = loteSelecionado[i].children[0].innerText
            CriaCardDivisao(id, materiaPrima)
        })
    }
}

function preencheInput(quantidade, id) {
    const inputQuantidade = document.querySelector('[data-quantidadeDeEntrada]');
    const inputId = document.querySelector('[data-id]');
    inputQuantidade.value = quantidade;
    inputId.value = id;
}

function CriaCardDivisao(id, materiaPrima){
    let container = document.querySelector('[data-containerLotes]');
    container.innerHTML = `
    <div>
        <label class="text-dividir" for="">Quanto gostaria de processar?</label>
        <input data-quantidadeProcesso type="number">
            
        <button data-btnDividir>Processar</button>
    </div>
    `
    let Dividir = document.querySelector('[data-btnDividir]');
    Dividir.addEventListener('click', ()=>{
        let valor = document.querySelector('[data-quantidadeProcesso]').value;
        criaLote(id, valor, materiaPrima);
    })
}

async function criaLote(lote_de_entrada, valor, materiaPrima) {
    let dadosApi = await fetch(`${api}/loteEntradas/${lote_de_entrada}`);
    let dadosConvertidos = await dadosApi.json();
    let quantidade_de_entrada = valor;
    let extrativistas = dadosConvertidos.extrativista;
    let locais = dadosConvertidos.local;

    let quantidadeAtualLoteAntigo = dadosConvertidos.quantidade - valor;
    atualizaLote(lote_de_entrada, quantidadeAtualLoteAntigo)

    const conexao = await fetch(`${api}/loteEntradas`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            materia_prima: materiaPrima,
            extrativista: extrativistas,
            local: locais,
            quantidade: quantidade_de_entrada
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function atualizaLote(id, quantidade_de_entrada) {
    const conexao = await fetch(`${api}/loteEntradas/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            quantidade: quantidade_de_entrada
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    const conexaoConvertida = await conexao.json();
    location.reload()

    return conexaoConvertida;
}

export const lotes = {
    listarLotes,
}