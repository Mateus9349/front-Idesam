import {
    conectaApi
} from '../js/conectaApi.js';
import api from '../js/linkAPI.js';

const container = document.querySelector('[data-main]');

const container_2 = document.querySelector('[data-main2]');

localStorage.removeItem('quantidade');

//------troca cores-------//

function trocaCores(){
    const cards = document.querySelectorAll('.coleta-item');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) => {
            let id = e.target.id
            cards[i].classList.add('coleta-item-inativo');
        })
    }
}

//Escolher processo a ser feito//

function mostraProcessos() {
    const processos = document.createElement('div')
    processos.className = 'processos-item'
    processos.innerHTML = `
    <h1 id="text-processos">Escolha o item a ser processado</h1>

    <div class="container-processos">
        <button class="escolhe-processos" id="copaiba" data-processo >copaíba</button>
        <button class="escolhe-processos" id="cafeVerde" data-processo >café verde</button>
        <button class="escolhe-processos" id="pataua" data-processo >óleo de patauá</button>
        <button class="escolhe-processos" id="cacau" data-processo >manteiga de cacau</button>
        <button class="escolhe-processos" id="buriti" data-processo >óleo de buriti</button>
        <button class="escolhe-processos" id="açai" data-processo >óleo de açaí</button>
        <button class="escolhe-processos" id="citronela" data-processo >óleo essen. de cítronela</button>
        <button class="escolhe-processos" id="breu" data-processo >óleo de breu</button>
        <button class="escolhe-processos" id="castanha" data-processo >castanha</button>
    </div>
    `
    return container.appendChild(processos)
}

mostraProcessos()

//preparando lote de entrada//

const escolha = document.querySelectorAll("[data-processo]");

for (let i = 0; i < escolha.length; i++) {
    escolha[i].addEventListener('click', (e) => {
        let escolhido = e.target.id
        listarColetas(escolhido)
    })
}

function constroiCard(id, data_entrada, materia_prima, extrativista, local, quantidade, valor_pago) {
    let data = new Date(data_entrada);
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;

    quantidade = Number(quantidade);
    let quantidadeFormatada = quantidade.toLocaleString('pt-BR');

    valor_pago = Number(valor_pago);
    let valor_pagoFormatada = valor_pago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'});

    const coleta = document.createElement('div')
    coleta.className = "coleta-item";
    coleta.innerHTML = `
        <p class="text-item item-id" id="id">${id}</p>
        <p class="text-item" id="data">${dataFormatada}</p>
        <p class="text-item" id="materia-prima">${materia_prima}</p>
        <p class="text-item" id="extrativista">${extrativista}</p>
        <p class="text-item" id="local">${local}</p>
        <p class="text-item" id="quantidade">${quantidadeFormatada}</p>
        <p class="text-item" id="preco"><span id="preço">${valor_pagoFormatada}</span></p>
        `

    return coleta;
}

async function listarColetas(escolhido) {
    const containerApi = await conectaApi.listaColetas()
    if (escolhido == 'cafeVerde') {
        escolhido = 'cafe verde'
    };
    const text = await formataTexto(escolhido);
    container.innerHTML = `
    <h1>Criar lote de entrada</h1>
    <button id="encerra-lote">Finalizar lote de entrada</button>
    `

    containerApi.forEach((element) => {
        if (element.materia_prima == escolhido && element.ativo != false) {
            container.appendChild(constroiCard(element.id, element.data_entrada, element.materia_prima, element.extrativista, element.local,
                element.quantidade, element.valor_pago))
        }
    });

    loteEntrada(escolhido)
}

async function formataTexto(escolhido){
    let textoFormatado = '';
    if(escolhido == 'cafe verde'){
        textoFormatado = 'Café Verde';
    }else if(escolhido == 'pataua'){
        textoFormatado = 'Patauá'
    }else if(escolhido == 'cacau'){
        textoFormatado == 'Cacau'
    }else if(escolhido == 'buriti'){
        textoFormatado == 'Buriti'
    }else if(escolhido == 'açai'){
        textoFormatado == 'Açaí'
    }else if(escolhido == 'citronela'){
        textoFormatado == 'Cítronela'
    }else if(escolhido == 'breu'){
        textoFormatado == 'Breu'
    }else if(escolhido == 'castanha'){
        textoFormatado == 'Castanha'
    }else if(escolhido == 'copaiba'){
        textoFormatado == 'Copaíba'
    }

    return textoFormatado;
}

//lista de coletas selecionadas//
function constroiListaColetasSelecionadas(id, data_entrada, materia_prima, extrativista, local, quantidade, valor_pago) {
    container_2.innerHTML = '';
    let quantidadeAntiga = localStorage.getItem('quantidade');
    localStorage.setItem('quantidade', quantidade);
    quantidadeAntiga = quantidadeAntiga == null ? '0': quantidadeAntiga;
    quantidadeAntiga = parseFloat(quantidadeAntiga.replace(/\./g, '').replace(',', '.'));
    quantidade = parseFloat(quantidade.replace(/\./g, '').replace(',', '.'));
    let total = quantidadeAntiga + quantidade;
    localStorage.setItem('quantidade', total);
    
    const listaColetas = document.createElement('div')
    listaColetas.className = "listaColetas"
    listaColetas.innerHTML = `
        <h2>Peso total: <span>${total}</span> Kg</h2>
    `
    return listaColetas
}

function loteEntrada(escolhido) {
    const encerraLote = document.getElementById('encerra-lote')

    var lote_entrada = []

    const itensColeta = document.querySelectorAll('.coleta-item');

    for (let i = 0; i < itensColeta.length; i++) {
        itensColeta[i].addEventListener('click', () => {
            trocaCores()

            setTimeout(trocaCores, 2000)
        
            let array = itensColeta[i].innerText.split('\n');
        
            let id = array[0]
            let data_entrada = array[2]
            let materia_prima = array[4]
            let extrativista = array[6]
            let local = array[8]
            let quantidade = array[10]
            let valor_pago = array[12]

            if(itensColeta[i].classList.item(1)==null){
                itensColeta[i].classList.add('coleta-item-inativo');
                itensColeta[i].children[0].classList.remove('item-id');
                itensColeta[i].children[0].classList.add('item-id-check');
                container_2.appendChild(constroiListaColetasSelecionadas(id, data_entrada, materia_prima, extrativista, local, quantidade, valor_pago))
                lote_entrada.push(itensColeta[i].innerText.split('\n'))
            }
        })
    }

    encerraLote.addEventListener('click', async () => {
        let materia_prima = ''
        let extrativistas = ''
        let locais = ''
        let quantidade_total_lote = 0
        let valor_pago = 0
        let arrayDeColetasIndoParaProcesso = [];

        for (let i = 0; i < lote_entrada.length; i++) {
            let array = lote_entrada[i];
            arrayDeColetasIndoParaProcesso.push(array[0]);
        }

        for (let i = 0; i < lote_entrada.length; i++) {
            let array = lote_entrada[i];
            materia_prima = materia_prima + array[4] + ',';
        }

        for (let i = 0; i < lote_entrada.length; i++) {
            let array = lote_entrada[i];
            extrativistas = extrativistas + array[6] + ',';
        }

        for (let i = 0; i < lote_entrada.length; i++) {
            let array = lote_entrada[i];
            locais = locais + array[8] + ',';
        }

        for (let i = 0; i < lote_entrada.length; i++) {
            let array = lote_entrada[i];
            let aux = array[10];
            aux = parseFloat(aux.replace(/\./g, '').replace(',', '.'));
            quantidade_total_lote = quantidade_total_lote + aux;
        }

        for (let i = 0; i < lote_entrada.length; i++) {
            let array = lote_entrada[i];
            let num = array[12];
            num = parseFloat(num.replace(/[^\d,]/g, '').replace(',', '.'));
            valor_pago = parseFloat(valor_pago) + parseFloat(num);
        }

        localStorage.removeItem('quantidade')
        for(let i = 0 ; i < arrayDeColetasIndoParaProcesso.length; i++){
            atualizaColetasSelecionadas(arrayDeColetasIndoParaProcesso[i]);
        }
        await criaLoteEntrada(materia_prima, extrativistas, locais, quantidade_total_lote, valor_pago);
        encaminhaParaProcessos(escolhido)
    })
}

async function atualizaColetasSelecionadas(id){
    const atualiza = await fetch(`${api}/coletas/${id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            ativo: false
        })
    });
    return atualiza;
}

async function criaLoteEntrada(materia_prima, extrativistas, locais, quantidade_total_lote, valor_pago) {
    const conexao = await fetch(`${api}/loteEntradas`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            materia_prima: materia_prima,
            extrativista: extrativistas,
            local: locais,
            quantidade: quantidade_total_lote,
            valor_pago: valor_pago,
            ativo: true
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    const conexaoConvertida = conexao.json();

    return conexaoConvertida;
}

function encaminhaParaProcessos(escolhido) {
    let link = escolhido;

    if (link == 'cacau') {
        link = 'manteigaDeCacau';
    } else if (link == 'cafe verde') {
        link = 'oleoDeCafeVerde';
    } else if (link == 'buriti') {
        link = 'oleoDeBuriti';
    } else if (link == 'pataua') {
        link = 'oleoDePataua';
    } else if (link == 'açai') {
        link = 'oleoDeAcai';
    } else if (link == 'citronela'){
        link = 'oleoDeCitronela'
    } else if (link == 'breu'){
        link = 'oleoDeBreu'
    } else if (link == 'castanha'){
        link = 'castanha'
    } else if(link == 'copaiba'){
        link = 'oleoDeCopaiba'
    }

    window.location.href = `./${link}/${link}.html`;
}