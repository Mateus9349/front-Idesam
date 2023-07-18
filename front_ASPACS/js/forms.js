import {
    atualizar
} from "./atualizaProcessos.js";
import {
    process
} from './controleProcessos.js';
import {
    maquinas
} from './controleMaquinas.js';
import {
    gastos
} from "./gastosProcessoController.js";
import {
    lista
} from "./preencheSelectInputs.js";
import {
    resultados
} from "./resultadosController.js";
import api from './linkAPI.js'

function FormHigienizacao() {
    const container = document.querySelector('[data-container]');
    const form_higienizacao = document.createElement('div');
    form_higienizacao.className = 'div-higienizacao';
    form_higienizacao.innerHTML = `
            <form action="" class="higenizacao ativo" data-higenizacao>
            <fieldset>
                <legend>Higenização e seleção</legend>
                <input style="display: none;" data-id data-higenizacaoId type="number">
                <fieldset>
                    <legend>Materia-prima</legend>
                    <label>Quantidade de entrada</label>
                    <input data-quantidadeDeEntrada data-higenizacaoEntrada type="number">
                </fieldset>
                <fieldset>
                    <legend>Maquina utilizada</legend>
                    <label>Escolha a maquina</label>
                    <select data-tipoMaquina>
                        
                    </select>
                    <label>Dias Trabalhados</label>
                    <input data-diasTrabalhados type="number">
                </fieldset>
                <fieldset>
                    <legend>Consumo de Energia</legend>
                    <label for="">Fonte de energia</label>
                    <select data-fonteEnergia>
                        <option value="Rede Elétrica">Rede Elétrica</option>
                        <option value="Motor Estacionário">Motor Estacionário</option>
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasConsumoEnergia type="number">
                    <label for="">Consumo de energia</label>
                    <select data-consumoEnergia>
                        <option value="kW">kW</option>    
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="energia solar">Energia Solar</option>
                        
                        <option value="não se aplica">Não se aplica</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Mão de obra</legend>
                    <label>Selecione o colaborador</label>
                    <select data-funcionario>
                        
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasTrabalhadasFuncionario type="number">
                </fieldset>
                <fieldset>
                    <legend>Resultado</legend>
                    <label>Quantidade higenizada</label>
                    <input data-rendimento data-HigenizacaoQuantidadeHigenizada type="number">
                    <label>Perda higenização</label>
                    <input data-perda data-HigenizacaoPerdaHigenizacao type="number">
                    <label>Rendimento</label>
                    <input data-rende data-HigenizacaoRendimento type="number">
                </fieldset>
            </fieldset>
            <button data-btnFinalizar class="btn" id="btn-higienizacao">Finalizar processo</button>
        </form>
    `
    container.appendChild(form_higienizacao);

    lista.inputMaquinas()
    lista.inputFuncionario()
    const processada = document.querySelector('[data-rendimento]');
    processada.addEventListener('change', ()=>{
        resultados.resultController();
    })

    const btn = document.querySelector('[data-btnFinalizar]');
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let etapa = e.target.id
        let quantidade_de_entrada = document.querySelector('[data-rendimento]').value;
        //Atualiza dias trabalhados maquina//
        let tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
        let diasTrabalhados = document.querySelector('[data-diasTrabalhados]').value;
        maquinas.verificaMaquinas(tipoMaquina, diasTrabalhados)
        //consumo de energia
        await gastos.insereGastosProdutivos(id, etapa);
        let nomeMaquina = document.querySelector('[data-tipoMaquina]').value
        gastos.adicionaDepreciacaoDaMaquina(id, nomeMaquina)
        //fim atribuindo gastos ao processo//
        verificaProcesso(id, etapa, quantidade_de_entrada)
    })
}

function FormSecagem() {
    const container = document.querySelector('[data-container]');
    const form_secagem = document.createElement('div');
    form_secagem.className = 'div-secagem';
    form_secagem.innerHTML = `
        <form action="" class="secagem inativo">
            <fieldset>
                <legend>Secagem</legend>
                <input style="display: none;" data-id data-SecagemId type="number" >
                <fieldset>
                    <legend>Materia-prima</legend>
                    <label>Entrada</label>
                    <input data-quantidadeDeEntrada data-secagemEntrada type="number">
                </fieldset>
                <fieldset>
                    <legend>Maquina utilizada</legend>
                    <label>Escolha a maquina</label>
                    <select data-tipoMaquina>
                        
                    </select>
                    <label>Dias Trabalhados</label>
                    <input data-diasTrabalhados type="number">
                </fieldset>
                <fieldset>
                    <legend>Consumo de Energia</legend>
                    <label for="">Fonte de energia</label>
                    <select data-fonteEnergia>
                        <option value="Rede Elétrica">Rede Elétrica</option>
                        <option value="Motor Estacionário">Motor Estacionário</option>
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasConsumoEnergia type="number">
                    <label for="">Consumo de energia</label>
                    <select data-consumoEnergia>
                        <option value="kW">kW</option>    
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="energia solar">Energia Solar</option>
                        <option value="não se aplica">Não se aplica</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Mão de obra</legend>
                    <label>Selecione o colaborador</label>
                    <select data-funcionario>
                        
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasTrabalhadasFuncionario type="number">
                </fieldset>
                <fieldset>
                    <legend>Resultado</legend>
                    <label>Quantidade da secagem</label>
                    <input data-rendimento data-secagemQuantidadeSeca  type="number">
                    <label>Perda secagem</label>
                    <input data-perda data-secagemPerda type="number">
                    <label>Rendimento</label>
                    <input data-rende data-secagemRendimento type="number">
                </fieldset>
            </fieldset>
            <button data-btnFinalizar class="btn" id="btn-secagem">Finalizar processo</button>
        </form>
    `
    container.appendChild(form_secagem);

    lista.inputMaquinas()
    lista.inputFuncionario()
    const processada = document.querySelector('[data-rendimento]');
    processada.addEventListener('change', ()=>{
        resultados.resultController();
    })

    const btn = document.querySelector('[data-btnFinalizar]');
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let etapa = e.target.id
        let quantidade_de_entrada = document.querySelector('[data-rendimento]').value;
        //Atualiza dias trabalhados maquina//
        let tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
        let diasTrabalhados = document.querySelector('[data-diasTrabalhados]').value;
        maquinas.verificaMaquinas(tipoMaquina, diasTrabalhados)
        //fim atualiza maquina//
        await gastos.insereGastosProdutivos(id, etapa);
        //fim atualiza maquina//
        let nomeMaquina = document.querySelector('[data-tipoMaquina]').value
        gastos.adicionaDepreciacaoDaMaquina(id, nomeMaquina)
        //fim atribuindo gastos ao processo//
        verificaProcesso(id, etapa, quantidade_de_entrada)
    })
}

function FormDespolpa() {
    const container = document.querySelector('[data-container]');
    const form_despolpa = document.createElement('div');
    form_despolpa.className = 'div-despolpa';
    form_despolpa.innerHTML = `
    <form action="" class="despolpa inativo">
        <fieldset>
            <legend>Despolpa</legend>
            <input style="display: none;" data-id data-despolpaId type="number">
            <fieldset>
                <legend>Materia-prima</legend>
                <label>Entrada</label>
                <input data-quantidadeDeEntrada data-despolpaEntrada type="number">
            </fieldset>
            <fieldset>
                    <legend>Maquina utilizada</legend>
                    <label>Escolha a maquina</label>
                    <select data-tipoMaquina>
                        
                    </select>
                    <label>Dias Trabalhados</label>
                    <input data-diasTrabalhados type="number">
                </fieldset>
                <fieldset>
                    <legend>Consumo de Energia</legend>
                    <label for="">Fonte de energia</label>
                    <select data-fonteEnergia>
                        <option value="Rede Elétrica">Rede Elétrica</option>
                        <option value="Motor Estacionário">Motor Estacionário</option>
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasConsumoEnergia type="number">
                    <label for="">Consumo de energia</label>
                    <select data-consumoEnergia>
                        <option value="kW">kW</option>    
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="energia solar">Energia Solar</option>
                        <option value="não se aplica">Não se aplica</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Mão de obra</legend>
                    <label>Selecione o colaborador</label>
                    <select data-funcionario>
                        
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasTrabalhadasFuncionario type="number">
                </fieldset>
            <fieldset>
                <legend>Resultado</legend>
                <label>Quantidade da Despolpa</label>
                <input data-rendimento data-despolpaQuantidadeDespolpa type="number">
                <label>Perda Despolpa</label>
                <input data-perda data-despolpaPerda type="number">
                <label>Rendimento</label>
                <input data-rende data-despolpaRendimento type="number">
            </fieldset>
        </fieldset>
    <button data-btnFinalizar class="btn" id="btn-despolpa">Finalizar processo</button>
    </form>
    `
    container.appendChild(form_despolpa);

    lista.inputMaquinas()
    lista.inputFuncionario()
    const processada = document.querySelector('[data-rendimento]');
    processada.addEventListener('change', ()=>{
        resultados.resultController();
    })

    const btn = document.querySelector('[data-btnFinalizar]');
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let etapa = e.target.id
        let quantidade_de_entrada = document.querySelector('[data-rendimento]').value;
        //Atualiza dias trabalhados maquina//
        let tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
        let diasTrabalhados = document.querySelector('[data-diasTrabalhados]').value;
        maquinas.verificaMaquinas(tipoMaquina, diasTrabalhados)
        //fim atualiza maquina//
        await gastos.insereGastosProdutivos(id, etapa);
        //fim atualiza maquina//
        let nomeMaquina = document.querySelector('[data-tipoMaquina]').value
        gastos.adicionaDepreciacaoDaMaquina(id, nomeMaquina)
        //fim atribuindo gastos ao processo//
        verificaProcesso(id, etapa, quantidade_de_entrada)
    })
}

function FormDestilacao() {
    const container = document.querySelector('[data-container]');
    const form_destilacao = document.createElement('div');
    form_destilacao.className = 'div-destilacao';
    form_destilacao.innerHTML = `
        <form action="" class="destilacao inativo">
            <fieldset>
                <legend>Destilação</legend>
                <input style="display: none;" data-id data-destilacaoId type="number" >
                <fieldset>
                    <legend>Materia-prima</legend>
                    <label>Entrada</label>
                    <input data-quantidadeDeEntrada data-destilacaoEntrada type="number">
                </fieldset>
                <fieldset>
                    <legend>Maquina utilizada</legend>
                    <label>Escolha a maquina</label>
                    <select data-tipoMaquina>
                        
                    </select>
                    <label>Dias Trabalhados</label>
                    <input data-diasTrabalhados type="number">
                </fieldset>
                <fieldset>
                    <legend>Consumo de Energia</legend>
                    <label for="">Fonte de energia</label>
                    <select data-fonteEnergia>
                        <option value="Rede Elétrica">Rede Elétrica</option>
                        <option value="Motor Estacionário">Motor Estacionário</option>
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasConsumoEnergia type="number">
                    <label for="">Consumo de energia</label>
                    <select data-consumoEnergia>
                        <option value="kW">kW</option>    
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="energia solar">Energia Solar</option>
                        <option value="não se aplica">Não se aplica</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Mão de obra</legend>
                    <label>Selecione o colaborador</label>
                    <select data-funcionario>
                        
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasTrabalhadasFuncionario type="number">
                </fieldset>
                <fieldset>
                    <legend>Resultado</legend>
                    <label>Quantidade da Destilação</label>
                    <input data-rendimento data-destilacaoQuantidadeDestilada  type="number">
                    <label>Perda Destilação</label>
                    <input data-perda data-destilacaoPerda type="number">
                    <label>Rendimento</label>
                    <input data-rende data-destilacaoRendimento type="number">
                </fieldset>
            </fieldset>
            <button data-btnFinalizar class="btn" id="btn-destilacao">Finalizar processo</button>
        </form>
    `
    container.appendChild(form_destilacao);

    lista.inputMaquinas()
    lista.inputFuncionario()
    const processada = document.querySelector('[data-rendimento]');
    processada.addEventListener('change', ()=>{
        resultados.resultController();
    })

    const btn = document.querySelector('[data-btnFinalizar]');
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let etapa = e.target.id
        let quantidade_de_entrada = document.querySelector('[data-rendimento]').value;
        //Atualiza dias trabalhados maquina//
        let tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
        let diasTrabalhados = document.querySelector('[data-diasTrabalhados]').value;
        maquinas.verificaMaquinas(tipoMaquina, diasTrabalhados)
        //fim atualiza maquina//
        await gastos.insereGastosProdutivos(id, etapa);
        //fim atualiza maquina//
        let nomeMaquina = document.querySelector('[data-tipoMaquina]').value
        gastos.adicionaDepreciacaoDaMaquina(id, nomeMaquina)
        //fim atribuindo gastos ao processo//
        verificaProcesso(id, etapa, quantidade_de_entrada)
    })
}

function FormCozimento() {
    const container = document.querySelector('[data-container]');
    const form_cozimento = document.createElement('div');
    form_cozimento.className = 'div-cozimento';
    form_cozimento.innerHTML = `
        <form action="" class="cozimento inativo">
            <fieldset>
                <legend>Cozimento</legend>
                <input style="display: none;" data-id data-cozimentoId type="number" >
                <fieldset>
                    <legend>Materia-prima</legend>
                    <label>Entrada</label>
                    <input data-quantidadeDeEntrada data-cozimentoEntrada type="number">
                </fieldset>
                <fieldset>
                    <legend>Maquina utilizada</legend>
                    <label>Escolha a maquina</label>
                    <select data-tipoMaquina>
                        
                    </select>
                    <label>Dias Trabalhados</label>
                    <input data-diasTrabalhados type="number">
                </fieldset>
                <fieldset>
                    <legend>Consumo de Energia</legend>
                    <label for="">Fonte de energia</label>
                    <select data-fonteEnergia>
                        <option value="Rede Elétrica">Rede Elétrica</option>
                        <option value="Motor Estacionário">Motor Estacionário</option>
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasConsumoEnergia type="number">
                    <label for="">Consumo de energia</label>
                    <select data-consumoEnergia>
                        <option value="kW">kW</option>    
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="energia solar">Energia Solar</option>
                        <option value="não se aplica">Não se aplica</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Mão de obra</legend>
                    <label>Selecione o colaborador</label>
                    <select data-funcionario>
                        
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasTrabalhadasFuncionario type="number">
                </fieldset>
                <fieldset>
                    <legend>Resultado</legend>
                    <label>Quantidade da Destilação</label>
                    <input data-rendimento data-cozimentoQuantidadeDestilada  type="number">
                    <label>Perda Destilação</label>
                    <input data-perda data-cozimentoPerda type="number">
                    <label>Rendimento</label>
                    <input data-rende data-cozimentoRendimento type="number">
                </fieldset>
            </fieldset>
            <button data-btnFinalizar class="btn" id="btn-cozimento">Finalizar processo</button>
        </form>
    `
    container.appendChild(form_cozimento);

    lista.inputMaquinas()
    lista.inputFuncionario()
    const processada = document.querySelector('[data-rendimento]');
    processada.addEventListener('change', ()=>{
        resultados.resultController();
    })

    const btn = document.querySelector('[data-btnFinalizar]');
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let etapa = e.target.id
        let quantidade_de_entrada = document.querySelector('[data-rendimento]').value;
        //Atualiza dias trabalhados maquina//
        let tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
        let diasTrabalhados = document.querySelector('[data-diasTrabalhados]').value;
        maquinas.verificaMaquinas(tipoMaquina, diasTrabalhados)
        //fim atualiza maquina//
        await gastos.insereGastosProdutivos(id, etapa);
        //fim atualiza maquina//
        let nomeMaquina = document.querySelector('[data-tipoMaquina]').value
        gastos.adicionaDepreciacaoDaMaquina(id, nomeMaquina)
        //fim atribuindo gastos ao processo//
        verificaProcesso(id, etapa, quantidade_de_entrada)
    })
}

function FormEstufagem() {
    const container = document.querySelector('[data-container]');
    const form_estufagem = document.createElement('div');
    form_estufagem.className = 'div-estufagem';
    form_estufagem.innerHTML = `
        <form action="" class="estufagem inativo">
            <fieldset>
                <legend>Estufagem</legend>
                <input style="display: none;" data-id data-estufagemId type="number" >
                <fieldset>
                    <legend>Materia-prima</legend>
                    <label>Entrada</label>
                    <input data-quantidadeDeEntrada data-estufagemEntrada type="number">
                </fieldset>
                <fieldset>
                    <legend>Maquina utilizada</legend>
                    <label>Escolha a maquina</label>
                    <select data-tipoMaquina>
                        
                    </select>
                    <label>Dias Trabalhados</label>
                    <input data-diasTrabalhados type="number">
                </fieldset>
                <fieldset>
                    <legend>Consumo de Energia</legend>
                    <label for="">Fonte de energia</label>
                    <select data-fonteEnergia>
                        <option value="Rede Elétrica">Rede Elétrica</option>
                        <option value="Motor Estacionário">Motor Estacionário</option>
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasConsumoEnergia type="number">
                    <label for="">Consumo de energia</label>
                    <select data-consumoEnergia>
                        <option value="kW">kW</option>    
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="energia solar">Energia Solar</option>
                        <option value="não se aplica">Não se aplica</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Mão de obra</legend>
                    <label>Selecione o colaborador</label>
                    <select data-funcionario>
                        
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasTrabalhadasFuncionario type="number">
                </fieldset>
                <fieldset>
                    <legend>Resultado</legend>
                    <label>Quantidade da Destilação</label>
                    <input data-rendimento data-estufagemQuantidadeDestilada  type="number">
                    <label>Perda Destilação</label>
                    <input data-perda data-estufagemPerda type="number">
                    <label>Rendimento</label>
                    <input data-rende data-estufagemRendimento type="number">
                </fieldset>
            </fieldset>
            <button data-btnFinalizar class="btn" id="btn-estufagem">Finalizar processo</button>
        </form>
    `
    container.appendChild(form_estufagem);

    lista.inputMaquinas()
    lista.inputFuncionario()
    const processada = document.querySelector('[data-rendimento]');
    processada.addEventListener('change', ()=>{
        resultados.resultController();
    })

    const btn = document.querySelector('[data-btnFinalizar]');
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let etapa = e.target.id
        let quantidade_de_entrada = document.querySelector('[data-rendimento]').value;
        //Atualiza dias trabalhados maquina//
        let tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
        let diasTrabalhados = document.querySelector('[data-diasTrabalhados]').value;
        maquinas.verificaMaquinas(tipoMaquina, diasTrabalhados)
        //fim atualiza maquina//
        await gastos.insereGastosProdutivos(id, etapa);
        //fim atualiza maquina//
        let nomeMaquina = document.querySelector('[data-tipoMaquina]').value
        gastos.adicionaDepreciacaoDaMaquina(id, nomeMaquina)
        //fim atribuindo gastos ao processo//
        verificaProcesso(id, etapa, quantidade_de_entrada)
    })
}

function FormSeparacao() {
    const container = document.querySelector('[data-container]');
    const form_separacao = document.createElement('div');
    form_separacao.className = 'div-separacao';
    form_separacao.innerHTML = `
        <form action="" class="separacao inativo">
            <fieldset>
                <legend>Separação</legend>
                <input style="display: none;" data-id data-separacaoId type="number" >
                <fieldset>
                    <legend>Materia-prima</legend>
                    <label>Entrada</label>
                    <input data-quantidadeDeEntrada data-separacaoEntrada type="number">
                </fieldset>
                <fieldset>
                    <legend>Maquina utilizada</legend>
                    <label>Escolha a maquina</label>
                    <select data-tipoMaquina>
                        
                    </select>
                    <label>Dias Trabalhados</label>
                    <input data-diasTrabalhados type="number">
                </fieldset>
                <fieldset>
                    <legend>Consumo de Energia</legend>
                    <label for="">Fonte de energia</label>
                    <select data-fonteEnergia>
                        <option value="Rede Elétrica">Rede Elétrica</option>
                        <option value="Motor Estacionário">Motor Estacionário</option>
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasConsumoEnergia type="number">
                    <label for="">Consumo de energia</label>
                    <select data-consumoEnergia>
                        <option value="kW">kW</option>    
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="energia solar">Energia Solar</option>
                        <option value="não se aplica">Não se aplica</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Mão de obra</legend>
                    <label>Selecione o colaborador</label>
                    <select data-funcionario>
                        
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasTrabalhadasFuncionario type="number">
                </fieldset>
                <fieldset>
                    <legend>Resultado</legend>
                    <label>Quantidade da Destilação</label>
                    <input data-rendimento data-separacaoQuantidadeDestilada  type="number">
                    <label>Perda Destilação</label>
                    <input data-perda data-separacaoPerda type="number">
                    <label>Rendimento</label>
                    <input data-rende data-separacaoRendimento type="number">
                </fieldset>
            </fieldset>
            <button data-btnFinalizar class="btn" id="btn-separacao">Finalizar processo</button>
        </form>
    `
    container.appendChild(form_separacao);

    lista.inputMaquinas()
    lista.inputFuncionario()
    const processada = document.querySelector('[data-rendimento]');
    processada.addEventListener('change', ()=>{
        resultados.resultController();
    })

    const btn = document.querySelector('[data-btnFinalizar]');
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let etapa = e.target.id
        let quantidade_de_entrada = document.querySelector('[data-rendimento]').value;
        //Atualiza dias trabalhados maquina//
        let tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
        let diasTrabalhados = document.querySelector('[data-diasTrabalhados]').value;
        maquinas.verificaMaquinas(tipoMaquina, diasTrabalhados)
        //fim atualiza maquina//
        await gastos.insereGastosProdutivos(id, etapa);
        //fim atualiza maquina//
        let nomeMaquina = document.querySelector('[data-tipoMaquina]').value
        gastos.adicionaDepreciacaoDaMaquina(id, nomeMaquina)
        //fim atribuindo gastos ao processo//
        verificaProcesso(id, etapa, quantidade_de_entrada)
    })
}

function FormQuebraDeSementes() {
    const container = document.querySelector('[data-container]');
    const form_quebra_de_sementes = document.createElement('div');
    form_quebra_de_sementes.className = 'div-quebra_de_sementes';
    form_quebra_de_sementes.innerHTML = `
    <form action="" class="quebra-de-sementes inativo">
        <fieldset>
            <legend>Quebra de Sementes</legend>
            <input style="display: none;" data-id data-quebraDeSementesId type="number" >
            <fieldset>
                <legend>Materia-prima</legend>
                <label>Entrada</label>
                <input data-quantidadeDeEntrada data-quebraDeSementesEntrada type="number">
            </fieldset>
            <fieldset>
                    <legend>Maquina utilizada</legend>
                    <label>Escolha a maquina</label>
                    <select data-tipoMaquina>
                        
                    </select>
                    <label>Dias Trabalhados</label>
                    <input data-diasTrabalhados type="number">
                </fieldset>
                <fieldset>
                    <legend>Consumo de Energia</legend>
                    <label for="">Fonte de energia</label>
                    <select data-fonteEnergia>
                        <option value="Rede Elétrica">Rede Elétrica</option>
                        <option value="Motor Estacionário">Motor Estacionário</option>
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasConsumoEnergia type="number">
                    <label for="">Consumo de energia</label>
                    <select data-consumoEnergia>
                        <option value="kW">kW</option>    
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="energia solar">Energia Solar</option>
                        <option value="não se aplica">Não se aplica</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Mão de obra</legend>
                    <label>Selecione o colaborador</label>
                    <select data-funcionario>
                        
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasTrabalhadasFuncionario type="number">
                </fieldset>
            <fieldset>
                <legend>Resultado</legend>
                <label>Quantidade da quebra de sementes</label>
                <input data-rendimento data-quebraDeSementesQuantidadeQuebrada  type="number">
                <label>Perda quebra de sementes</label>
                <input data-perda data-quebraDeSementesPerda type="number">
                <label>Rendimento</label>
                <input data-rende data-quebraDeSementesRendimento type="number">
            </fieldset>
        </fieldset>
        <button data-btnFinalizar class="btn" id="btn-quebra-de-sementes">Finalizar processo</button>
    </form>
    `
    container.appendChild(form_quebra_de_sementes);

    lista.inputMaquinas()
    lista.inputFuncionario()
    const processada = document.querySelector('[data-rendimento]');
    processada.addEventListener('change', ()=>{
        resultados.resultController();
    })

    const btn = document.querySelector('[data-btnFinalizar]');
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let etapa = e.target.id
        let quantidade_de_entrada = document.querySelector('[data-rendimento]').value;
        //Atualiza dias trabalhados maquina//
        let tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
        let diasTrabalhados = document.querySelector('[data-diasTrabalhados]').value;
        maquinas.verificaMaquinas(tipoMaquina, diasTrabalhados)
        //fim atualiza maquina//
        await gastos.insereGastosProdutivos(id, etapa);
        //fim atualiza maquina//
        let nomeMaquina = document.querySelector('[data-tipoMaquina]').value
        gastos.adicionaDepreciacaoDaMaquina(id, nomeMaquina)
        //fim atribuindo gastos ao processo//
        verificaProcesso(id, etapa, quantidade_de_entrada)
    })
}

function FormSelecaoDasSementes() {
    const container = document.querySelector('[data-container]');
    const form_selecao_das_amendoas = document.createElement('div');
    form_selecao_das_amendoas.className = 'div-selecao_das_amendoas';
    form_selecao_das_amendoas.innerHTML = `
        <form action="" class="selecao-das-amendoas inativo">
            <fieldset>
                <legend>Selecao das amendoas</legend>
                <input style="display: none;" data-id data-selecaoDasAmendoasId type="number" >
                <fieldset>
                    <legend>Materia-prima</legend>
                    <label>Entrada</label>
                    <input data-quantidadeDeEntrada data-selecaoDasAmendoasEntrada type="number">
                </fieldset>
                <fieldset>
                    <legend>Maquina utilizada</legend>
                    <label>Escolha a maquina</label>
                    <select data-tipoMaquina>
                        
                    </select>
                    <label>Dias Trabalhados</label>
                    <input data-diasTrabalhados type="number">
                </fieldset>
                <fieldset>
                    <legend>Consumo de Energia</legend>
                    <label for="">Fonte de energia</label>
                    <select data-fonteEnergia>
                        <option value="Rede Elétrica">Rede Elétrica</option>
                        <option value="Motor Estacionário">Motor Estacionário</option>
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasConsumoEnergia type="number">
                    <label for="">Consumo de energia</label>
                    <select data-consumoEnergia>
                        <option value="kW">kW</option>    
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="energia solar">Energia Solar</option>
                        <option value="não se aplica">Não se aplica</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Mão de obra</legend>
                    <label>Selecione o colaborador</label>
                    <select data-funcionario>
                        
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasTrabalhadasFuncionario type="number">
                </fieldset>
                <fieldset>
                    <legend>Resultado</legend>
                    <label>Quantidade da selecao das amendoas</label>
                    <input data-rendimento data-selecaoDasAmendoasQuantidadeSeleta  type="number">
                    <label>Perda selecao</label>
                    <input data-perda data-selecaoDasAmendoasPerda type="number">
                    <label>Rendimento</label>
                    <input data-rende data-selecaoDasAmendoasRendimento type="number">
                </fieldset>
            </fieldset>
            <button data-btnFinalizar class="btn" id="btn-selecao-das-amendoas">Finalizar processo</button>
        </form>
    `
    container.appendChild(form_selecao_das_amendoas);

    lista.inputMaquinas()
    lista.inputFuncionario()
    const processada = document.querySelector('[data-rendimento]');
    processada.addEventListener('change', ()=>{
        resultados.resultController();
    })

    const btn = document.querySelector('[data-btnFinalizar]');
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let etapa = e.target.id
        let quantidade_de_entrada = document.querySelector('[data-rendimento]').value;
        //Atualiza dias trabalhados maquina//
        let tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
        let diasTrabalhados = document.querySelector('[data-diasTrabalhados]').value;
        maquinas.verificaMaquinas(tipoMaquina, diasTrabalhados)
        //fim atualiza maquina//
        await gastos.insereGastosProdutivos(id, etapa);
        //fim atualiza maquina//
        let nomeMaquina = document.querySelector('[data-tipoMaquina]').value
        gastos.adicionaDepreciacaoDaMaquina(id, nomeMaquina)
        //fim atribuindo gastos ao processo//
        verificaProcesso(id, etapa, quantidade_de_entrada)
    })
}

function FormTrituracao() {
    const container = document.querySelector('[data-container]');
    const form_trituracao = document.createElement('div');
    form_trituracao.className = 'div-trituracao';
    form_trituracao.innerHTML = `
    <form action="" class="trituracao inativo">
        <fieldset>
            <legend>Trituração</legend>
            <input style="display: none;" data-id data-trituracaoId type="number">
            <fieldset>
                <legend>Materia-prima</legend>
                <label>Entrada</label>
                <input data-quantidadeDeEntrada data-trituracaoEntrada type="number">
            </fieldset>
            <fieldset>
                    <legend>Maquina utilizada</legend>
                    <label>Escolha a maquina</label>
                    <select data-tipoMaquina>
                        
                    </select>
                    <label>Dias Trabalhados</label>
                    <input data-diasTrabalhados type="number">
                </fieldset>
                <fieldset>
                    <legend>Consumo de Energia</legend>
                    <label for="">Fonte de energia</label>
                    <select data-fonteEnergia>
                        <option value="Rede Elétrica">Rede Elétrica</option>
                        <option value="Motor Estacionário">Motor Estacionário</option>
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasConsumoEnergia type="number">
                    <label for="">Consumo de energia</label>
                    <select data-consumoEnergia>
                        <option value="kW">kW</option>    
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="energia solar">Energia Solar</option>
                        <option value="não se aplica">Não se aplica</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Mão de obra</legend>
                    <label>Selecione o colaborador</label>
                    <select data-funcionario>
                        
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasTrabalhadasFuncionario type="number">
                </fieldset>
            <fieldset>
                <legend>Resultado</legend>
                <label>Quantidade da Trituração</label>
                <input data-rendimento data-trituracaoQuantidadeTriturada type="number">
                <label>Perda Trituração</label>
                <input data-perda data-trituracaoPerda type="number">
                <label>Rendimento</label>
                <input data-rende data-trituracaoRendimento type="number">
            </fieldset>
        </fieldset>
        <button data-btnFinalizar class="btn" id="btn-trituracao">Finalizar processo</button>
    </form>
    `
    container.appendChild(form_trituracao);

    lista.inputMaquinas()
    lista.inputFuncionario()
    const processada = document.querySelector('[data-rendimento]');
    processada.addEventListener('change', ()=>{
        resultados.resultController();
    })

    const btn = document.querySelector('[data-btnFinalizar]');
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let etapa = e.target.id
        let quantidade_de_entrada = document.querySelector('[data-rendimento]').value;
        //Atualiza dias trabalhados maquina//
        let tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
        let diasTrabalhados = document.querySelector('[data-diasTrabalhados]').value;
        maquinas.verificaMaquinas(tipoMaquina, diasTrabalhados)
        //fim atualiza maquina//
        await gastos.insereGastosProdutivos(id, etapa);
        //fim atualiza maquina//
        let nomeMaquina = document.querySelector('[data-tipoMaquina]').value
        gastos.adicionaDepreciacaoDaMaquina(id, nomeMaquina)
        //fim atribuindo gastos ao processo//
        verificaProcesso(id, etapa, quantidade_de_entrada)
    })
}

function FormPrensagem() {
    const container = document.querySelector('[data-container]');
    const form_prensagem = document.createElement('div');
    form_prensagem.className = 'div-prensagem';
    form_prensagem.innerHTML = `
        <form action="" class="prensagem inativo">
            <fieldset>
                <legend>Prensagem</legend>
                <input style="display: none;" data-id data-prensagemId type="number" style="display: none;">
                <fieldset>
                    <legend>Materia-prima</legend>
                    <label>Entrada</label>
                    <input data-quantidadeDeEntrada data-prensagemEntrada type="number">
                </fieldset>
                <fieldset>
                    <legend>Maquina utilizada</legend>
                    <label>Escolha a maquina</label>
                    <select data-tipoMaquina>
                        
                    </select>
                    <label>Dias Trabalhados</label>
                    <input data-diasTrabalhados type="number">
                </fieldset>
                <fieldset>
                    <legend>Consumo de Energia</legend>
                    <label for="">Fonte de energia</label>
                    <select data-fonteEnergia>
                        <option value="Rede Elétrica">Rede Elétrica</option>
                        <option value="Motor Estacionário">Motor Estacionário</option>
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasConsumoEnergia type="number">
                    <label for="">Consumo de energia</label>
                    <select data-consumoEnergia>
                        <option value="kW">kW</option>    
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="energia solar">Energia Solar</option>
                        <option value="não se aplica">Não se aplica</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Mão de obra</legend>
                    <label>Selecione o colaborador</label>
                    <select data-funcionario>
                        
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasTrabalhadasFuncionario type="number">
                </fieldset>
                <fieldset>
                    <legend>Resultado</legend>
                    <label>Quantidade da Prensagem</label>
                    <input data-rendimento data-prensagemQuantidadePrensada type="number">
                    <label>Perda Prensagem</label>
                    <input data-perda data-prensagemPerda type="number">
                    <label>Rendimento</label>
                    <input data-rende data-prensagemRendimento type="number">
                </fieldset>
            </fieldset>
            <button data-btnFinalizar class="btn" id="btn-prensagem">Finalizar processo</button>
        </form>
    `
    container.appendChild(form_prensagem);

    lista.inputMaquinas()
    lista.inputFuncionario()
    const processada = document.querySelector('[data-rendimento]');
    processada.addEventListener('change', ()=>{
        resultados.resultController();
    })

    const btn = document.querySelector('[data-btnFinalizar]');
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let etapa = e.target.id
        let quantidade_de_entrada = document.querySelector('[data-rendimento]').value;
        //Atualiza dias trabalhados maquina//
        let tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
        let diasTrabalhados = document.querySelector('[data-diasTrabalhados]').value;
        maquinas.verificaMaquinas(tipoMaquina, diasTrabalhados)
        //fim atualiza maquina//
        await gastos.insereGastosProdutivos(id, etapa);
        //fim atualiza maquina//
        let nomeMaquina = document.querySelector('[data-tipoMaquina]').value
        gastos.adicionaDepreciacaoDaMaquina(id, nomeMaquina)
        //fim atribuindo gastos ao processo//
        verificaProcesso(id, etapa, quantidade_de_entrada)
    })
}

function FormFiltragem() {
    const container = document.querySelector('[data-container]');
    const form_filtragem = document.createElement('div');
    form_filtragem.className = 'div-filtragem';
    form_filtragem.innerHTML = `
    <form action="" class="filtragem inativo">
        <fieldset>
            <legend>Filtragem</legend>
            <input style="display: none;" data-id data-filtragemId type="number" style="display: none;">
            <fieldset>
                <legend>Materia-prima</legend>
                <label>Entrada</label>
                <input data-quantidadeDeEntrada data-filtragemEntrada type="number">
            </fieldset>
            <fieldset>
                    <legend>Maquina utilizada</legend>
                    <label>Escolha a maquina</label>
                    <select data-tipoMaquina>
                        
                    </select>
                    <label>Dias Trabalhados</label>
                    <input data-diasTrabalhados type="number">
                </fieldset>
                <fieldset>
                    <legend>Consumo de Energia</legend>
                    <label for="">Fonte de energia</label>
                    <select data-fonteEnergia>
                        <option value="Rede Elétrica">Rede Elétrica</option>
                        <option value="Motor Estacionário">Motor Estacionário</option>
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasConsumoEnergia type="number">
                    <label for="">Consumo de energia</label>
                    <select data-consumoEnergia>
                        <option value="kW">kW</option>    
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="energia solar">Energia Solar</option>
                        <option value="não se aplica">Não se aplica</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Mão de obra</legend>
                    <label>Selecione o colaborador</label>
                    <select data-funcionario>
                        
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasTrabalhadasFuncionario type="number">
                </fieldset>
            <fieldset>
                <legend>Resultado</legend>
                <label>Quantidade da Filtragem</label>
                <input data-rendimento data-filtragemQuantidadeFiltrada type="number">
                <label>Perda Filtragem</label>
                <input data-perda data-filtragemPerda type="number">
                <label>Rendimento</label>
                <input data-rende data-filtragemRendimento type="number">
            </fieldset>
        </fieldset>
        <button data-btnFinalizar class="btn" id="btn-filtragem">Finalizar processo</button>
    </form>
    `
    container.appendChild(form_filtragem);

    lista.inputMaquinas()
    lista.inputFuncionario()
    const processada = document.querySelector('[data-rendimento]');
    processada.addEventListener('change', ()=>{
        resultados.resultController();
    })

    const btn = document.querySelector('[data-btnFinalizar]');
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let etapa = e.target.id
        let quantidade_de_entrada = document.querySelector('[data-rendimento]').value;
        //Atualiza dias trabalhados maquina//
        let tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
        let diasTrabalhados = document.querySelector('[data-diasTrabalhados]').value;
        maquinas.verificaMaquinas(tipoMaquina, diasTrabalhados)
        //fim atualiza maquina//
        await gastos.insereGastosProdutivos(id, etapa);
        //fim atualiza maquina//
        let nomeMaquina = document.querySelector('[data-tipoMaquina]').value
        gastos.adicionaDepreciacaoDaMaquina(id, nomeMaquina)
        //fim atribuindo gastos ao processo//
        verificaProcesso(id, etapa, quantidade_de_entrada)
        process.FormEmbalagem(id)
    })
}

function FormSelecaoPrimaria() {
    const container = document.querySelector('[data-container]');
    const form_selecao_primaria = document.createElement('div');
    form_selecao_primaria.className = 'div-selecao_primaria';
    form_selecao_primaria.innerHTML = `
    <form action="" class="selecao-primaria ativo" data-selecaoPrimaria>
        <fieldset>
            <legend>Seleção primaria</legend>
            <input style="display: none;" data-id data-selecaoPrimariaId type="number">
            <fieldset>
                <legend>Materia-prima</legend>
                <label>Quantidade de entrada</label>
                <input data-quantidadeDeEntrada data-selecaoPrimariaEntrada type="number">
            </fieldset>
            <fieldset>
                    <legend>Maquina utilizada</legend>
                    <label>Escolha a maquina</label>
                    <select data-tipoMaquina>
                        
                    </select>
                    <label>Dias Trabalhados</label>
                    <input data-diasTrabalhados type="number">
                </fieldset>
                <fieldset>
                    <legend>Consumo de Energia</legend>
                    <label for="">Fonte de energia</label>
                    <select data-fonteEnergia>
                        <option value="Rede Elétrica">Rede Elétrica</option>
                        <option value="Motor Estacionário">Motor Estacionário</option>
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasConsumoEnergia type="number">
                    <label for="">Consumo de energia</label>
                    <select data-consumoEnergia>
                        <option value="kW">kW</option>    
                        <option value="diesel">Diesel</option>
                        <option value="gasolina">Gasolina</option>
                        <option value="energia solar">Energia Solar</option>
                        <option value="não se aplica">Não se aplica</option>
                    </select>
                </fieldset>
                <fieldset>
                    <legend>Mão de obra</legend>
                    <label>Selecione o colaborador</label>
                    <select data-funcionario>
                        
                    </select>
                    <label for="">Horas trabalhadas</label>
                    <input data-horasTrabalhadasFuncionario type="number">
                </fieldset>
            <fieldset>
                <legend>Resultado</legend>
                <label>Quantidade Selecionada</label>
                <input data-rendimento data-selecaoPrimariaQuantidadeSelecionada type="number">
                <label>Perda seleção</label>
                <input data-perda data-selecaoPrimariaPerdaselecaoPrimaria type="number">
                <label>Rendimento</label>
                <input data-rende data-selecaoPrimariaRendimento type="number">
            </fieldset>
        </fieldset>
        <button data-btnFinalizar class="btn" id="btn-selecao-primaria">Finalizar processo</button>
    </form>
    `
    container.appendChild(form_selecao_primaria);

    lista.inputMaquinas()
    lista.inputFuncionario()
    const processada = document.querySelector('[data-rendimento]');
    processada.addEventListener('change', ()=>{
        resultados.resultController();
    })

    const btn = document.querySelector('[data-btnFinalizar]');
    btn.addEventListener('click', async (e) => {
        e.preventDefault()
        let id = document.querySelector('[data-id]').value;
        let etapa = e.target.id
        let quantidade_de_entrada = document.querySelector('[data-rendimento]').value;
        //Atualiza dias trabalhados maquina//
        let tipoMaquina = document.querySelector('[data-tipoMaquina]').value;
        let diasTrabalhados = document.querySelector('[data-diasTrabalhados]').value;
        maquinas.verificaMaquinas(tipoMaquina, diasTrabalhados)
        //fim atualiza maquina//
        await gastos.insereGastosProdutivos(id, etapa);
        //fim atualiza maquina//
        let nomeMaquina = document.querySelector('[data-tipoMaquina]').value
        gastos.adicionaDepreciacaoDaMaquina(id, nomeMaquina)
        //fim atribuindo gastos ao processo//
        verificaProcesso(id, etapa, quantidade_de_entrada)
    })
}

async function verificaProcesso(id, etapa, quantidade_de_entrada) {
    let dadosApi = await fetch(`${api}/processos/${id}`);
    let dadosConvertidos = await dadosApi.json();
    const tipoProcesso = dadosConvertidos.processo;
    atualizar.atualizaProcessos(id, tipoProcesso, etapa, quantidade_de_entrada)
}

function FormIniciaProcesso() {
    const container = document.querySelector('[data-container]');
    const form_inicia_processo = document.createElement('div');
    form_inicia_processo.className = 'div-inicia_processo';
    form_inicia_processo.innerHTML = `
    <form action="" class="selecao-primaria ativo" data-selecaoPrimaria>
        <fieldset>
            <legend>Inicia processo</legend>
            <input style="display: none;" data-id type="number">
            <fieldset>
                <legend>Materia-prima</legend>
                <label>Quantidade de entrada</label>
                <input data-quantidadeDeEntrada type="number">
            </fieldset>
        </fieldset>
        <button data-btnIniciar class="btn" >Iniciar processo</button>
    </form>
    `
    container.appendChild(form_inicia_processo);
}


export const forms = {
    FormIniciaProcesso,
    FormHigienizacao,
    FormSecagem,
    FormDespolpa,
    FormDestilacao,
    FormQuebraDeSementes,
    FormSelecaoDasSementes,
    FormTrituracao,
    FormPrensagem,
    FormFiltragem,
    FormSelecaoPrimaria,
    FormCozimento,
    FormEstufagem,
    FormSeparacao
}