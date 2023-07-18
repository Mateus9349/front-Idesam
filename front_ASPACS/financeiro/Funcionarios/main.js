import { contas } from "../../js/contasController.js";
import api from '../../js/linkAPI.js';

const container = document.querySelector('[data-container]');

async function listarFuncionarios(){
    const funcionarios = await getFuncionarios();
    funcionarios.forEach((element) => {
        container.appendChild(constroiCard(element.id,element.nome,element.idade,element.funcao,element.valor_hora));
    });
    pagarFuncionario();
    atualizarFuncionario();
    apagarFuncionario();
}

async function getFuncionarios(){
    const conexao = await fetch(`${api}/funcionarios`);
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

function constroiCard(id, nome, idade, funcao, valor_hora){
    const funcionario = document.createElement('div');
        funcionario.className = 'funcionario';
        funcionario.innerHTML = `
                <img class="" src="../../assets/img/icon-funcionarios.svg" alt="icon-funcionario">
                <div class="itens-funcionario">
                    <p class="text">Nome: <span>${nome}</span></p>
                    <p class="text">Idade: <span>${idade}</span></p>
                    <p class="text">Função: <span>${funcao}</span></p>
                    <p class="text">Valor Hora: <span>${valor_hora} R$</span></p>
                </div>
                <div class="btns-icon">
                    <button class="btns">
                        <img id="${id}" data-pagar src="../../assets/img/icon-pagar.svg" alt="icon-pagar" title="pagar">
                    </button>
                    <button class="btns">
                        <img id="${id}" data-editar src="../../assets/img/icon-editar.svg" alt="icon-editar" title="editar">
                    </button>
                    <button class="btns">
                        <img id="${id}" data-deletar src="../../assets/img/icon-deletar.svg" alt="icon-deletar" title="deletar">
                    </button>
                </div>
        `
        return funcionario;
}

listarFuncionarios()

//-----------------------------------------------   Pagar Funcionario   -----------------------------------------------//

async function pagarFuncionario(){
    const pagar = document.querySelectorAll('[data-pagar]');
    for(let i = 0; i < pagar.length ; i++){
        pagar[i].addEventListener('click', (e)=>{
            formPagarFuncionario(e.target.id)
        })
    }
}

async function formPagarFuncionario(id){
    const conexao = await fetch(`${api}/funcionarios/${id}`);
    const conexaoConvertida = await conexao.json();
    let nome = conexaoConvertida.nome
    container.innerHTML = `
    <form action="">
        <fieldset>
            <legend class="text">${nome}</legend>

            <label for="">Horas trabalhadas</label>
            <input data-horasTrabalhadas type="number">

            <label for="">Valor Hora</label>
            <input data-valorHora type="number">

            <label for="">Total a pagar</label>
            <input data-totalPagar type="number">

            <button data-pagarFinal>Pagar</button>
        </fieldset>
    </form>
    `
    const horas_trabalhadas = document.querySelector('[data-horasTrabalhadas]');
    const valor_hora = document.querySelector('[data-valorHora]')
    valor_hora.value = conexaoConvertida.valor_hora;
    valor_hora.addEventListener('change', change);
    horas_trabalhadas.addEventListener("change", change);
    
    function change(){
        let valor_hora = document.querySelector('[data-valorHora]').value;
        let valorHorasTrabalhadas = document.querySelector('[data-horasTrabalhadas]').value
        let totalPagar = valorHorasTrabalhadas * valor_hora
        document.querySelector('[data-totalPagar]').value = totalPagar
    }

    const pagar = document.querySelector('[data-pagarFinal]');
    pagar.addEventListener('click',()=>{
        let valor = document.querySelector('[data-totalPagar]').value
        contas.pagarConta('pagamento funcionario', `pago à ${nome}`, valor, true);
        alert(`Você pagou ${valor} R$ à ${nome}`)
    })
}

//--------------------------------------------------------  editar funcionário  -------------------------------------------------------------//
async function atualizarFuncionario(){
    const atualizar = document.querySelectorAll('[data-editar]');
    for(let i = 0; i < atualizar.length ; i++){
        atualizar[i].addEventListener('click', (e)=>{
            formAtualizarFuncionario(e.target.id)
        })
    }
}

async function formAtualizarFuncionario(id){
    const conexao = await fetch(`${api}/funcionarios/${id}`);
    const conexaoConvertida = await conexao.json();
    container.innerHTML = `
    <form action="" class="extra">
        <label for="">Nome:</label>
        <input data-nome type="text" placeholder="Insira seu nome">

        <label for="">Idade:</label>
        <input data-idade type="number">

        <label>Sexo</label>
        <select data-sexo name="sexo">
            <option value="M">M</option>
            <option value="F">F</option>
        </select>

        <label for="">Comunidade:</label>
        <input data-comunidade type="text" placeholder="comunidade/distrito/rio/igarapé">

        <label for="">Função:</label>
        <input data-funcao type="text" placeholder="Ex.Operador de máquina">

        <label for="">Valor Hora:</label>
        <input data-valorHora type="number" placeholder=" Valor/hora R$">

        <button data-atualizar type="submit">Atualizar</button>
    </form>
    `
    let nome = document.querySelector('[data-nome]');
    let idade = document.querySelector('[data-idade]');
    let sexo = document.querySelector('[data-sexo]');
    let comunidade = document.querySelector('[data-comunidade]');
    let funcao = document.querySelector('[data-funcao]');
    let valorHora = document.querySelector('[data-valorHora]');
    nome.value = conexaoConvertida.nome;
    idade.value = conexaoConvertida.idade;
    sexo.value = conexaoConvertida.sexo;
    comunidade.value = conexaoConvertida.comunidade;
    funcao.value = conexaoConvertida.funcao;
    valorHora.value = conexaoConvertida.valor_hora;
    const atualizar = document.querySelector('[data-atualizar]');
    atualizar.addEventListener('click', ()=>{
        const nome = document.querySelector('[data-nome]').value;
        const idade = document.querySelector('[data-idade]').value;
        const sexo = document.querySelector('[data-sexo]').value;
        const comunidade = document.querySelector('[data-comunidade]').value;
        const funcao = document.querySelector('[data-funcao]').value;
        const valorHora = document.querySelector('[data-valorHora]').value;
        putFuncionario(id,nome,idade,sexo,comunidade,funcao,valorHora);
    })
}

async function putFuncionario(id,nome,idade,sexo,comunidade,funcao,valorHora){
    const conexao = await fetch(`${api}/funcionarios/${id}`,{
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            idade: idade,
            sexo: sexo,
            comunidade: comunidade,
            funcao: funcao,
            valor_hora: valorHora
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

async function apagarFuncionario(){
    const apagar = document.querySelectorAll('[data-deletar]');
    for(let i = 0; i < apagar.length ; i++){
        apagar[i].addEventListener('click', (e)=>{
            deleteFuncionario(e.target.id)
        })
    }
}

async function deleteFuncionario(id){
    const conexao = await fetch(`${api}/funcionarios/${id}`,{
        method: "DELETE",
    });
    window.location.reload()
    return alert('Funcionario deletado!');
}



