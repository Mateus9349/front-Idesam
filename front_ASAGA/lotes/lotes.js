import api from '../js/linkAPI.js'

const container = document.querySelector('[data-lotes]');



/*-----------------------------------------seleção do produto-------------------------------------*/

function constroiCard(produto, quantidade, extrativistas, local, data) {
    //selecionando a imagem correta de acordo com o produto
    let Obj = escolheImagem(produto);
    let imagem = Obj.imagem;
    let valorL = Obj.valor;
    let valorTotal = Obj.valor * Number(quantidade);
    //formatando a data
    data = new Date(data);
    const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    };
    data = data.toLocaleString(undefined, options);

    const lotes = document.createElement('div')
    lotes.className = 'card-lote'
    lotes.innerHTML = `
        <img id="img" src="${imagem}"/>
        <p id="produto" class="text"><span>${produto}</span></p>
        <p id="data" class="text"><span>${data}</span></p>
        <p id="associacao" class="text">ASAGA</p>
        <p id="quantidade" class="text"><span>${quantidade}</span> Kg</p>
        <p id="valor" class="text">Valor L: R$ <span>${valorL}</span></p>
        <p id="total" class="text">Valor total: R$ <span>${valorTotal.toLocaleString()}</span></p>
        <button id="pdf" data-btnPDF><img src="../assets/img/pdf.svg"/></button>
    `
    return lotes;
}

async function listarLotes() {
    const conexao = await fetch(`${api}/loteFinal`)
    const conexaoConvertida = await conexao.json();

    conexaoConvertida.forEach((element) => {
        container.appendChild(constroiCard(element.produto, element.quantidade, element.extrativistas, element.local, element.createdAt))
    });
}

function escolheImagem(produto) {
    let imagem = '';
    let valorL = 0;
    switch (produto) {
        case 'cafe verde':
            imagem = `../assets/icons_novos/café verde.svg`
            valorL = 900
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'buriti':
            imagem = `../assets/icons_novos/buriti.svg`
            valorL = 120
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'açai':
            imagem = `../assets/icons_novos/açaí.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'andiroba':
            imagem = `../assets/icons_novos/andiroba.svg`
            valorL = 65
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'breu':
            imagem = `../assets/icons_novos/breu.svg`
            valorL = 1200
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'cacau':
            imagem = `../assets/icons_novos/cacau.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'castanha':
            imagem = `../assets/icons_novos/castanha.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'castanha semente':
            imagem = `../assets/icons_novos/castanha semente.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'copaiba':
            imagem = `../assets/icons_novos/copaíba.svg`
            valorL = 95
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'citronela':
            imagem = `../assets/icons_novos/citronela.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'cumaru':
            imagem = `../assets/icons_novos/cumaru.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'cupuaçu':
            imagem = `../assets/icons_novos/cupuaçu.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'latex':
            imagem = `../assets/icons_novos/látex.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'murumuru':
            imagem = `../assets/icons_novos/murumuru.svg`
            valorL = 65
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'pataua':
            imagem = `../assets/icons_novos/pataua.svg`
            valorL = 140
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'pau rosa':
            imagem = `../assets/icons_novos/pau rosa.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'pimenta de macaco':
            imagem = `../assets/icons_novos/pimenta de macaco.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'pitanga':
            imagem = `../assets/icons_novos/pitanga.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'priprioca':
            imagem = `../assets/icons_novos/priprioca.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'sangue de dragao':
            imagem = `../assets/icons_novos/sangue de dragão.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'tucuma amendoa':
            imagem = `../assets/icons_novos/tucumã amêndoa.svg`
            valorL = 65
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'tucuma semente':
            imagem = `../assets/icons_novos/tucumã semente.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        case 'ucuuba':
            imagem = `../assets/icons_novos/ucuuba.svg`
            valorL = 0
            return {
                imagem: imagem,
                    valor: valorL
            };
        default:
            console.log('error');
    }
}

listarLotes()

//---------------------------------------   gerar PDF   -------------------------------------------------------//


//---------------------------------------   gerar PDFQrcode   -------------------------------------------------------//