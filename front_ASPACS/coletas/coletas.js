import api from '../js/linkAPI.js'
import {uteis} from  '../js/funcoesUteis.js'

const container = document.querySelector('[data-container]');
const containerColetas = document.querySelector('[data-containerColetas]');
const containerFiltros = document.querySelector('[data-filtros]');

async function criaColeta(data_entrada, materia_prima, extrativista, local, quantidade, valor_pago) {
    const conexao = await fetch(`${api}/coletas`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            data_entrada: data_entrada,
            materia_prima: materia_prima,
            extrativista: extrativista,
            local: local,
            quantidade: quantidade,
            valor_pago: valor_pago,
            ativo: true
        })
    });

    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }

    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

/* -------------------------------------------- ocultar/mostrar form receber coleta ------------------------------------*/

const btn_mostrarColeta = document.querySelector('[data-btnMostrarColeta]');

btn_mostrarColeta.addEventListener('click', ()=>{
    containerColetas.innerHTML = '';
    containerColetas.appendChild(constroiFormColeta());

    const btn_receberColeta = document.querySelector('[data-btnReceberColeta]');

    btn_receberColeta.addEventListener('click', () => {
    const data_entrada = document.querySelector('[data-dataEntrada]').value;
    const materia_prima = document.querySelector('[data-materiaPrima]').value;
    const extrativista = document.querySelector('[data-extrativista]').value;
    const local = document.querySelector('[data-local]').value;
    const quantidade = document.querySelector('[data-quantidade]').value;
    const valor_pago = document.querySelector('[data-valorPago]').value;
    
    criaColeta(data_entrada, materia_prima, extrativista, local, quantidade, valor_pago);
    alert('coleta recebida com sucesso!');
    location.reload();
    });
});

function constroiFormColeta(){
    const form = document.createElement('form');
    form.className = 'formColeta'
    form.innerHTML=`
                    <fieldset class="extra">
                        <label for="">Data de Entrada</label>
                        <input data-dataEntrada type="date">
        
                        <label for="">Matéria-prima</label>
                        <select data-materiaPrima name="materia-prima" id="">
                            <option value="açai">Açaí</option>
                            <option value="andiroba">Andiroba</option>
                            <option value="breu">Breu</option>
                            <option value="buriti">Buriti</option>
                            <option value="cacau">Cacau</option>
                            <option value="cafe verde">Café Verde</option>
                            <option value="castanha">Castanha</option>
                            <option value="copaiba">Copaíba</option>
                            <option value="citronela">Citronela</option>
                            <option value="cumaru">Cumaru</option>
                            <option value="cupuacu">Cupuaçu</option>
                            <option value="latex">Látex</option>
                            <option value="murumuru">Murumuru</option>
                            <option value="pataua">Patauá</option>
                            <option value="pau rosa">Pau rosa</option>
                            <option value="pimenta de macaco">Pimenta de macaco</option>
                            <option value="pitanga">Pitanga</option>
                            <option value="priprioca">Priprioca</option>
                            <option value="sangue de dragao">Sangue de dragão</option>
                            <option value="tucuma amendoa">Tucumã amêndoa</option>
                            <option value="tucuma semente">Tucumã semente</option>
                            <option value="ucuuba">Ucuuba</option>
                        </select>
        
                        <label for="">Produtor/Extrativista</label>
                        <input data-extrativista type="text">
        
                        <label for="">Local de Coleta</label>
                        <input data-local type="text">
        
                        <label for="">Quantidade</label>
                        <input data-quantidade type="number">
        
                        <label for="">Valor Pago</label>
                        <input data-valorPago type="number">
                    </fieldset>

                    <button class="bt2" data-btnReceberColeta>Receber coleta</button>
    `
    return form;
}
/* --------------------------------------------Exibir coletas recebidas -----------------------------------------*/

const btn_coletasRecebidas = document.querySelector('[data-btnColetasRecebidas]');

btn_coletasRecebidas.addEventListener('click', ()=>{
    containerFiltros.innerHTML = '';
    container.innerHTML = '';
    const materiasPrimas = ['açaí','andiroba','breu','buriti','cacau','café verde','castanha','copaíba','cacau',
    'citronela', 'cumaru','cupuaçu','látex','murumuru','pataua','pau rosa','pimenta de macaco','pitanga','priprioca','sangue de dragão','tucumã amêndoa',
    'tucumã semente','ucuuba']
    containerColetas.innerHTML = "<h1>Selecione a materia prima</h1>";
    for(let i = 0; i < materiasPrimas.length; i++){
        containerColetas.appendChild(constroiCardMateriaPrima(materiasPrimas[i]));
    }
    selecionaMateriaPrima()
})

function constroiCardMateriaPrima(nome){
    const materiaPrima = document.createElement('div');
    materiaPrima.className = 'card-materiaPrima'
    materiaPrima.innerHTML=`
    <p id="${nome}">
        <img src="../assets/icons_novos/${nome}.svg" alt="logo-${nome}" class="icon">
        <span>${nome}</span>
    </p>
    `
    return materiaPrima;
}

function selecionaMateriaPrima(){
    const todasAsMateriasPrimas = document.querySelectorAll('.card-materiaPrima');
    for(let i = 0; i < todasAsMateriasPrimas.length; i++){
        todasAsMateriasPrimas[i].addEventListener('click',()=>{
            let materiaPrimaSelecionada = todasAsMateriasPrimas[i].children[0].children[1].innerText;
            mostraColetasRecebidas(materiaPrimaSelecionada)
        })
    }
}

function mostraColetasRecebidas(materia_prima){
    containerColetas.innerHTML = '';
    containerFiltros.appendChild(constroiFiltros(materia_prima));
    listarColetas(materia_prima)
}

function constroiFiltros(materia_prima){
    const filtros = document.createElement('div');
    filtros.className = 'filtro';
    filtros.innerHTML = `
            <div class="titulo-form">
                <div class="div-titulo">
                    <img src="../assets/icons_novos/${materia_prima}.svg"/>
                    <h1>${materia_prima}</h1>
                </div>
                <h2 for="">Ordenar por:</h2>
                <form action="" class="form-filtro">
                    <div>
                        <input type="radio" name="nome" value="alfabetica">
                        <label for="">Ordem alfabetica</label>
                    </div>
                    <div>
                        <input type="radio" name="nome" value="data">
                        <label for="">Data</label>
                    </div>
                    <div>
                        <input type="radio" name="nome" value="quantidade">
                        <label for="">Quantidade Kg</label>
                    </div>
                    <div>
                        <input type="radio" name="nome" value="preco">
                        <label for="">Valor pago</label>
                    </div>
                </form>
            </div>
            <div class="buscas">
                <input data-valorBusca type="text">
                <button data-busca>Buscar</button>
            </div>
    `
    return filtros;
}

function constroiCardColetas(materia_prima, nome, data, quantidade, preco, ativo){
    let situacao = ativo == false ? "Processado" : "Não processado";
    data = uteis.formatarData(data);
    const coleta = document.createElement('div');
    coleta.className = 'coleta';
    coleta.innerHTML = `
            <div>
                <img id="imagem" src="../assets/img/icon-funcionarios.svg" alt="#">
                <p id="nome">${nome}</p>
                <p id="data">${data}</p>
                <p id="quantidade">${quantidade} kg</p>
                <p id="preco">R$ ${preco}</p>
            </div>
    `
    return coleta;
}

function formataNomeMateriaPrima(materia_prima){
    let materiaPrimaFormatada = '';

    if(materia_prima == 'açaí'){
        materiaPrimaFormatada = 'açai';
    }else if(materia_prima == 'café verde'){
        materiaPrimaFormatada = 'cafe verde'
    }else if(materia_prima == 'castanha amêndoa'){
        materiaPrimaFormatada = 'castanha amendoa'
    }else if(materia_prima == 'copaíba'){
        materiaPrimaFormatada = 'copaiba'
    }else if(materia_prima == 'cupuaçu'){
        materiaPrimaFormatada = 'cupuacu'
    }else if( materia_prima == 'látex'){
        materiaPrimaFormatada = 'latex'
    }else if( materia_prima == 'patauá'){
        materiaPrimaFormatada = 'pataua'
    }else if(materia_prima == 'sangue de dragão'){
        materiaPrimaFormatada = 'sangue de dragao'
    }else if(materia_prima == 'tucumã amêndoa'){
        materiaPrimaFormatada = 'tucuma amendoa'
    }else if(materia_prima == 'tucumã semente'){
        materiaPrimaFormatada = 'tucuma semente'
    }else{
        materiaPrimaFormatada = materia_prima
    }

    return materiaPrimaFormatada;
}

async function listarColetas(materia_prima) {
    const conexao = await fetch(`${api}/coletas`);
    const conexaoConvertida = await conexao.json();

    let materiaPrimaFormatada = formataNomeMateriaPrima(materia_prima);

    conexaoConvertida.forEach((element) => {
        if (element.materia_prima == materiaPrimaFormatada) {
            containerColetas.appendChild(constroiCardColetas(materia_prima, element.extrativista, element.data_entrada, element.quantidade, element.valor_pago, element.ativo))
        }
    });
}

/*---------------------------------------------- Filtros coletas recebidas -----------------------------------------*/

function iniciaBuscas(){
    const buscar = document.querySelector('[data-busca]');

    buscar.addEventListener('click',()=>{
        const palavra = document.querySelector('[data-valorBusca]').value;
        buscarApi(palavra)
    })
}

async function buscarApi(palavra){
    const conexao = await fetch(`${api}/coletas`);
    const conexaoConvertida = await conexao.json();

    containerColetas.innerHTML = ''
    conexaoConvertida.forEach(element => {
        if(element.extrativista == palavra){
            containerColetas.appendChild(constroiCardColetas(element.extrativista, element.data_entrada, element.quantidade, element.valor_pago))
        }
    });
}




