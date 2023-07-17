import { lotes } from '../../js/loteDeEntrada.js';
import { forms } from '../../js/forms.js';
import { process } from '../../js/controleProcessos.js';
import api from '../../js/linkAPI.js';


const container = document.querySelector('[data-container]');
container.innerHTML = `
    <div class="divEscolheEtapa">
        <div data-SelecionarLoteDeEntrada class="selecionarLoteDeEntrada">
            <img src="../../assets/img/paper.svg"/>
            <h1>Selecionar lote de entrada</h1>
        </div>
        <div data-ContinuarProcesso class="continuarProcesso">
            <img src="../../assets/img/gears.svg"/>
            <h1>Continuar Processo</h1>
        </div>
    </div>
`
const SelecionarLoteDeEntrada = document.querySelector('[data-SelecionarLoteDeEntrada]');
SelecionarLoteDeEntrada.addEventListener('click', ()=>{
    container.innerHTML = ''
    //função passando a materia prima para filtrar de  outras//
    lotes.listarLotes('buriti');
    forms.FormIniciaProcesso();

    const iniciarProcesso = document.querySelector('[data-btnIniciar]');
    iniciarProcesso.addEventListener('click', async (e)=>{
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let quantidade = document.querySelector('[data-quantidadeDeEntrada]').value;

        const conexao = await fetch(`${api}/loteEntradas/${id}`)
        const conexaoConvertida = await conexao.json();

        let extrativistas = conexaoConvertida.extrativista;
        let locais = conexaoConvertida.local;

        //dever ser inicializado com o primeiro processo e materia prima//
        await process.criaProcesso('higienizacao', id, false, quantidade, extrativistas, locais, 'buriti');

        let container = document.querySelector('[data-container]');
        container.innerHTML = ''
        //deve ser inicializado com a materia prima em questão//
        process.listarProcessosPendentes('buriti');

        let containerLotes = document.querySelector('[data-containerLotes]');
        containerLotes.innerHTML = '';
    });
})

const continuarProcesso = document.querySelector('[data-ContinuarProcesso]');
continuarProcesso.addEventListener('click', ()=>{
    container.innerHTML = '';
    //deve ser inicializado com a materia prima em questão//
    process.listarProcessosPendentes('buriti');
});





