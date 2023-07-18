import api from './linkAPI.js';

async function insereGastosProdutivos(idProcesso, nomeProcesso){
    const energia = await gastoEnergia();
    const mao_de_obra = await gastoMaoDeObra();
    const valor_materia_prima = await pegaValorMateriaPrima(idProcesso);
    const depreciacao = await adicionaDepreciacaoDaMaquina(idProcesso);
    const insumos = 0;
    const processo = nomeProcesso;
    const horas_duracao = 0;
    criaValorProcessos(idProcesso, energia, mao_de_obra, valor_materia_prima, depreciacao, insumos, processo, horas_duracao);
}

//----------------------------------------- Cria Tabela  Gastos por processo produtivo   ------------------------------------------------//

async function criaValorProcessos(id, energia, mao_de_obra, valor_materia_prima, depreciacao, insumos, processo, horas_duracao){
    const conexao = await fetch(`${api}/gastosProdutivos`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                processo_id: id,
                energia: energia,
                mao_de_obra: mao_de_obra,
                valor_materia_prima: valor_materia_prima,
                depreciacao: depreciacao,
                insumos: insumos,
                processo: processo,
                horas_duracao: horas_duracao
            })
        });
        if (!conexao.ok) {
            throw new Error("Não foi possível enviar")
        }
        const conexaoConvertida = await conexao.json();
        return conexaoConvertida;
}

//------------------------------------------------  Materia-prima   -------------------------------------------------------------------//

async function pegaValorMateriaPrima(idProcesso){
    const conexaoProcessos = await fetch(`${api}/processos/${idProcesso}`);
    const processos = await conexaoProcessos.json();
    let idLote = processos.Lote_de_entrada;
    
    const conexaoLoteDeEntrada = await fetch(`${api}/loteEntradas/${idLote}`);
    const loteDeEntrada = await conexaoLoteDeEntrada.json();
    let valorMateriaPrima = loteDeEntrada.valor_pago;
    return valorMateriaPrima;
}

//--------------------------------------------------- Maquina -------------------------------------------------------------------------//

function calcularDepreciacaoPorDia(custoAtivo, valorResidual, vidaUtilAnos) {
    let vidaUtilDias = vidaUtilAnos * 365; // Conversão de anos para dias
    let depreciacaoPorDia = (custoAtivo - valorResidual) / vidaUtilDias;
    return depreciacaoPorDia;
}

async function adicionaDepreciacaoDaMaquina(idProcesso){
    let maquina = document.querySelector('[data-tipoMaquina]').value;
    let idMaquina = await selecionaMaquina(maquina);
    const valorDepreciacao = await pegaDadosDepreciacao(idMaquina);
    return valorDepreciacao;
    //adicionaGastosDeDepreciacao(idProcesso,valorDepreciacao);
}

async function selecionaMaquina(maquina){
    const dados = await fetch(`${api}/maquinas`)
    const dadosJ = await dados.json();
    let idMaquina = undefined;
    dadosJ.forEach(element => {
        if(element.tipo_processo == maquina){
            idMaquina = element.id;
        }
    });
    return idMaquina;
}

async function pegaDadosDepreciacao(idMaquina){
    const dados = await fetch(`${api}/maquinas/${idMaquina}`);
    const dadosJson = await dados.json();
    let custoMaquina = Number(dadosJson.valor);
    let valorResidual = 0;
    let vidaUtilAnos = Number(dadosJson.vida_util);
    let valorDepreciacao = calcularDepreciacaoPorDia(custoMaquina, valorResidual, vidaUtilAnos);
    return valorDepreciacao;
}

/* async function adicionaGastosDeDepreciacao(idProcesso, valorDepreciacao){
    const dados = await fetch(`${api}/processos/${idProcesso}`)
    const dadosJ = await dados.json();
    let somaDespesas = Number(dadosJ.despesas) + Number(valorDepreciacao); 

    const conexao = await fetch(`${api}/processos/${idProcesso}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            despesas: somaDespesas
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar")
    }
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
} */

//------------------------------------------------------ energia ----------------------------------------------------------------------//

async function gastoEnergia(){
    let maquina = document.querySelector('[data-tipoMaquina]').value;
    let tipoDeEnergia = document.querySelector('[data-fonteEnergia]').value;
    const id_maquina = await selecionaMaquina(maquina);
    const potencia = await retornaPotenciaMaquina(id_maquina);
    let horasTrabalhadas = document.querySelector('[data-horasConsumoEnergia]').value;
    let totalGastoEmEnergia = 0;
    if(tipoDeEnergia == 'Rede Elétrica'){
        totalGastoEmEnergia = calculaValorGastoEnergia(potencia, horasTrabalhadas);
    } else{
        totalGastoEmEnergia = calculaValorDiesel(horasTrabalhadas);
    }
    
    return totalGastoEmEnergia;
}

async function retornaPotenciaMaquina(id){
    const dados = await fetch(`${api}/maquinas/${id}`);
    const dadosJson = await dados.json();
    const potencia = dadosJson.potencia;
    return potencia;
}

function calculaValorGastoEnergia(potencia, horasTrabalhadas){
    var custoEnergia = 0.834850; // Custo da energia por kWh
    // Cálculo do gasto de energia por hora trabalhada
    var gastoEnergiaPorHora = (potencia / 1000) * custoEnergia;
    // calcular gasto de energia para "n" horas trabalhadas
    var gastoTotal = gastoEnergiaPorHora * horasTrabalhadas;
    return gastoTotal;
}

function calculaValorDiesel(horasTrabalhadas){
    let gastoLitroPorHora = 1.875;
    let precoLitro = 8.60;
    let valorPorHora = gastoLitroPorHora * precoLitro;
    let gastoTotal = horasTrabalhadas * valorPorHora;
    return gastoTotal
}

//----------------------------------------------------  Mão de Obra -------------------------------------------------------------------//

async function gastoMaoDeObra(){
    let funcionario = document.querySelector('[data-funcionario]').value;
    let idFuncionario = await selecionaFuncionario(funcionario);
    let valor_diaria = await pegaValorDiaria(idFuncionario);
    valor_diaria = Number(valor_diaria);
    let horasTrabalhadas  = document.querySelector('[data-horasTrabalhadasFuncionario]').value;
    horasTrabalhadas = Number(horasTrabalhadas);
    let valorHora = Number(valor_diaria) / 8 
    let valorMaoDeObra = valorHora * horasTrabalhadas;
    return valorMaoDeObra;
}

async function selecionaFuncionario(funcionario){
    const dados = await fetch(`${api}/funcionarios`)
    const dadosJ = await dados.json();
    let idFuncionario = undefined;
    dadosJ.forEach(element => {
        if(element.nome == funcionario){
            idFuncionario = element.id;
        }
    });
    return idFuncionario;
}

async function pegaValorDiaria(idFuncionario){
    const conexao = await fetch(`${api}/funcionarios/${idFuncionario}`)
    const funcionario = await conexao.json();
    let diaria = funcionario.valor_diaria
    return diaria;
}

//------------------------------------------------------ exports ----------------------------------------------------------------------//

export const gastos = {
    calcularDepreciacaoPorDia,
    adicionaDepreciacaoDaMaquina,
    gastoEnergia,
    criaValorProcessos,
    insereGastosProdutivos,
}