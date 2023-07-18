import api from './js/linkAPI.js';

const containerPocessosInacabados = document.querySelector('[data-processosInacabados]');

async function pegaProcessos() {
    const processos = await fetch(`${api}/processos`);
    const processosJson = await processos.json();

    return processosJson;
}

async function imprimeProcessos(id, processoNome) {
    const processo = document.createElement('div')
    processo.className = "processo-div";
    processo.innerHTML = `
        <p class="processo-item processo-item-id"># <span>${id}</span></p>
        <p class="processo-item processo-item-nome"><span>${processoNome}</span></p>
        <img class="processo-item-btn" src="assets/img/icon=continue.svg" />
    `

    return processo;
}

async function listarProcessos() {
    const dadosApi = await pegaProcessos();
    let aux = false;
    for (let i = 0; i < dadosApi.length; i++) {
        if (dadosApi[i].Finalizado == false) {
            aux = true
        }
    }

    if(aux == true){
        containerPocessosInacabados.classList.remove('container-processos-pendentes');
        containerPocessosInacabados.classList.add('remove-background');
        containerPocessosInacabados.innerHTML = `
        <h1 class="title">Processos produtivos pendentes</h1>
        `
        for (let i = 0; i < dadosApi.length; i++) {
            if (dadosApi[i].Finalizado == false) {
                containerPocessosInacabados.append(await imprimeProcessos(dadosApi[i].id, dadosApi[i].processo))
            }
        }
    } else {
        containerPocessosInacabados.innerHTML = `
            <div class="box-text">
                <h1 class="titulo-1">Bem-vindo!</h1>
                <p class="titulo-2" >Seus processos irão aparecer aqui</p>
            </div>
        `
    }

    const escolha = document.querySelectorAll(".processo-div");

    for (let i = 0; i < escolha.length; i++) {
        escolha[i].addEventListener('click', (e) => {
            e.preventDefault()
            let processo = escolha[i].children[1].children[0].innerText;

            if (processo == 'cacau') {
                processo = 'manteigaDeCacau';
            } else if (processo == 'cafe') {
                processo = 'oleoDeCafe';
            } else if (processo == 'buriti') {
                processo = 'oleoDeBuriti';
            } else if (processo == 'açai' || processo == 'acai' || processo == 'açaí') {
                processo = 'oleoDeAcai';
            } else if (processo == 'citronela') {
                processo = 'oleoDeCitronela';
            } else if (processo == 'breu') {
                processo = 'oleoDeBreu';
            } else if (processo == 'cafe verde') {
                processo = 'oleoDeCafeVerde'
            } else if (processo == 'copaiba'){
                processo = 'oleoDeCopaiba'
            }

            window.location.href = `processos/${processo}/${processo}.html`;
        })
    }
}

listarProcessos()